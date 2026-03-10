import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { URL } from "url";

function getDomainQueryValue(domain: unknown): string | null {
  if (typeof domain !== "string") {
    return null;
  }

  const normalized = domain.trim().toLowerCase();
  if (!normalized) {
    return null;
  }

  return normalized.replace(/[^a-z0-9-]/g, "");
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get(api.rules.list.path, async (req, res) => {
    const rulesList = await storage.getRules();
    res.json(rulesList);
  });

  app.get(api.handbook.exportPdf.path, async (req, res, next) => {
    let browser: any = null;

    try {
      const importPuppeteer = new Function('return import("puppeteer")') as () => Promise<any>;
      const puppeteerModule = await importPuppeteer();
      const puppeteer = puppeteerModule.default ?? puppeteerModule;
      const domain = getDomainQueryValue(req.query.domain);

      const browserHost = req.get("host");
      if (!browserHost) {
        return res.status(400).json({ message: "Unable to resolve request host" });
      }

      const protocol = req.protocol;
      const handbookUrl = new URL("/", `${protocol}://${browserHost}`);
      handbookUrl.searchParams.set("print", "1");
      handbookUrl.searchParams.set("export", "1");
      if (domain) {
        handbookUrl.searchParams.set("domain", domain);
      }

      browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });

      const page = await browser.newPage();
      await page.goto(handbookUrl.toString(), {
        waitUntil: "networkidle0",
      });

      await page.waitForFunction(
        () => (window as any).__HANDBOOK_READY === true,
        { timeout: 15_000 },
      );

      const pdf = await page.pdf({
        format: "A4",
        printBackground: true,
        preferCSSPageSize: true,
      });

      const fileName = domain ? `manga-handbook-${domain}.pdf` : "manga-handbook.pdf";
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
      res.send(pdf);
    } catch (error: any) {
      const message = String(error?.message ?? "");
      if (message.includes("Cannot find package 'puppeteer'")) {
        return res.status(500).json({
          message: "PDF export requires puppeteer. Install it with: npm i puppeteer",
        });
      }

      return next(error);
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  });

  return httpServer;
}
