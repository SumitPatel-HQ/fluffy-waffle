import React, { useEffect, useMemo, useState } from "react";
import { Download, AlertTriangle, Zap, Printer } from "lucide-react";
import {
  MangaPage,
  MangaPanel,
  MangaHeader,
  SpeechBubble,
  ActionText,
} from "@/components/MangaComponents";

type RuleItem = {
  id: string;
  code: string;
  title: string;
  content: string;
  fallbackPage: number;
};

type DomainRuleItem = {
  id: string;
  slug: string;
  title: string;
  content: string;
  fallbackPage: number;
};

type TocEntry = {
  anchorId: string;
  label: string;
  fallbackPage: number;
};

declare global {
  interface Window {
    __HANDBOOK_READY?: boolean;
  }
}

const generalRules: RuleItem[] = [
  {
    id: "general-01",
    code: "01",
    title: "REGISTRATION & ELIGIBILITY",
    fallbackPage: 3,
    content:
      "All hackers must be officially registered before the deadline — late registrations will NOT be accepted. Teams can have up to 4 members. Each participant can join only one team and one domain. Team composition is locked once the event starts.",
  },
  {
    id: "general-02",
    code: "02",
    title: "DEVICES & SETUP",
    fallbackPage: 3,
    content:
      "Bring your own laptop and accessories. Organizers do not provide personal hardware. Install required software and dependencies before the event begins.",
  },
  {
    id: "general-03",
    code: "03",
    title: "PROJECT DEVELOPMENT",
    fallbackPage: 3,
    content:
      "All projects must be developed during the hackathon event period. Pre-existing projects or previously developed codebases are NOT allowed — only publicly available libraries and frameworks. Projects must be demo-ready for judging. Where required by the problem statement, solutions must run on both laptop and mobile devices.",
  },
  {
    id: "general-04",
    code: "04",
    title: "SUBMISSION REQUIREMENTS",
    fallbackPage: 3,
    content:
      "Final project code and documentation must be submitted via a GitHub repository or other specified platform depending on the domain. The repo must include source code, setup instructions, a project description, and a demo link. Submissions must be made before the official deadline — late submissions will not be evaluated.",
  },
  {
    id: "general-05",
    code: "05",
    title: "AI TOOLS & LOGGING",
    fallbackPage: 3,
    content:
      "AI tools are allowed for development, design, or research. All significant prompts used with AI tools must be logged during the event. Failure to log prompts may negatively impact evaluation in AI-related criteria. Teams must understand and be able to explain any AI-generated output.",
  },
  {
    id: "general-06",
    code: "06",
    title: "EVENT ROUNDS",
    fallbackPage: 4,
    content:
      "The hackathon consists of two main evaluation rounds. Round 1 – Lab Round: teams develop their solution, submit their project, and are evaluated based on the domain rubric. Round 2 – Finals: top teams from each domain advance to present their project to a new judging panel for final evaluation.",
  },
  {
    id: "general-07",
    code: "07",
    title: "ATTENDANCE & CONDUCT",
    fallbackPage: 4,
    content:
      "Participants must remain within the event venue once the event has started unless authorized by the organizers. Teams must be available for judging and demonstrations when requested. Maintain professional conduct and respect toward all teams, judges, and organizers at all times.",
  },
  {
    id: "general-08",
    code: "08",
    title: "FAIR PLAY & INTEGRITY",
    fallbackPage: 4,
    content:
      "All work submitted must be original and created during the event. Any form of plagiarism, copying, or unauthorized collaboration between teams is strictly prohibited. If plagiarism or misconduct is detected, the team will be immediately disqualified — no exceptions.",
  },
  {
    id: "general-09",
    code: "09",
    title: "JUDGING & ORGANIZER AUTHORITY",
    fallbackPage: 4,
    content:
      "Judges' decisions are final and binding. Projects are evaluated on impact, technical depth, innovation, and presentation. Organizers reserve the right to modify schedules, rules, or judging procedures if necessary. Any disputes must be addressed through the official organizer communication channel — no direct confrontations.",
  },
  {
    id: "general-10",
    code: "10",
    title: "SAFETY & RESPONSIBILITY",
    fallbackPage: 5,
    content:
      "Participants are responsible for the safety and security of their personal devices and belongings. Organizers will not be liable for loss or damage of personal property during the event. Follow all venue emergency protocols. If you smell smoke, it's not a compile error — evacuate immediately!",
  },
  {
    id: "general-11",
    code: "11",
    title: "DISQUALIFICATION CONDITIONS",
    fallbackPage: 5,
    content:
      "A team may be disqualified if they violate event rules, submit plagiarized or pre-built projects, fail to submit before the deadline, harass or sabotage other participants, or attempt to manipulate judging or leaderboards. There are no respawns — play hard, play fair.",
  },
];

const domainRules: DomainRuleItem[] = [
  {
    id: "domain-ai-ml",
    slug: "ai-ml",
    title: "AI/ML TRACK RULES",
    fallbackPage: 6,
    content:
      "Include model transparency in your README: dataset source, assumptions, and limitations. If using external models, document model name/version and safety considerations.",
  },
  {
    id: "domain-web-app",
    slug: "web-app",
    title: "WEB / APP TRACK RULES",
    fallbackPage: 6,
    content:
      "Your project must have an accessible UI and clear user flow. Share deployment URL and setup instructions. Broken authentication or non-functional primary flow can reduce score heavily.",
  },
  {
    id: "domain-cybersecurity",
    slug: "cybersecurity",
    title: "CYBERSECURITY TRACK RULES",
    fallbackPage: 6,
    content:
      "Testing must remain inside approved environments and challenge scope. No real-world target probing is allowed. Provide threat model, exploit path, and remediation details.",
  },
];

function getSearchParams(): URLSearchParams {
  if (typeof window === "undefined") {
    return new URLSearchParams();
  }

  return new URLSearchParams(window.location.search);
}

export default function Handbook() {
  const searchParams = useMemo(() => getSearchParams(), []);
  const isPrintMode = searchParams.get("print") === "1";
  const selectedDomain = searchParams.get("domain")?.trim().toLowerCase() || "";
  const [isExporting, setIsExporting] = useState(false);
  const [pageNumbers, setPageNumbers] = useState<Record<string, number>>({});

  const visibleDomainRules = useMemo(() => {
    if (!selectedDomain) {
      return domainRules;
    }

    return domainRules.filter((rule) => rule.slug === selectedDomain);
  }, [selectedDomain]);

  const tocEntries = useMemo<TocEntry[]>(() => {
    const generalEntries = generalRules.map((rule) => ({
      anchorId: rule.id,
      label: `${rule.code}. ${rule.title}`,
      fallbackPage: rule.fallbackPage,
    }));

    const domainEntries = visibleDomainRules.map((rule, index) => ({
      anchorId: rule.id,
      label: `${index + 1}. ${rule.title}`,
      fallbackPage: rule.fallbackPage,
    }));

    return [...generalEntries, ...domainEntries];
  }, [visibleDomainRules]);

  useEffect(() => {
    window.__HANDBOOK_READY = false;

    const computePageNumbers = () => {
      const wrappers = Array.from(document.querySelectorAll<HTMLElement>(".manga-page-wrapper"));
      const computed: Record<string, number> = {};

      tocEntries.forEach((entry) => {
        const target = document.getElementById(entry.anchorId);
        if (!target) {
          computed[entry.anchorId] = entry.fallbackPage;
          return;
        }

        const pageIndex = wrappers.findIndex((wrapper) => wrapper.contains(target));
        computed[entry.anchorId] = pageIndex >= 0 ? pageIndex + 1 : entry.fallbackPage;
      });

      setPageNumbers(computed);
      window.__HANDBOOK_READY = true;
    };

    const rafId = window.requestAnimationFrame(computePageNumbers);
    const resizeHandler = () => window.requestAnimationFrame(computePageNumbers);
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resizeHandler);
    };
  }, [tocEntries]);

  const handlePrint = () => {
    window.print();
  };

  const handleExportPdf = async () => {
    try {
      setIsExporting(true);

      const url = new URL("/api/handbook/export", window.location.origin);
      if (selectedDomain) {
        url.searchParams.set("domain", selectedDomain);
      }

      const response = await fetch(url.toString());
      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: "Unable to export PDF" }));
        throw new Error(error.message ?? "Unable to export PDF");
      }

      const blob = await response.blob();
      const objectUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = selectedDomain ? `manga-handbook-${selectedDomain}.pdf` : "manga-handbook.pdf";
      link.click();
      window.URL.revokeObjectURL(objectUrl);
    } catch (error: any) {
      window.alert(error.message ?? "Unable to export PDF");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f0f0] py-8 print:py-0 print:bg-white overflow-x-hidden font-body text-black">
      {!isPrintMode && (
        <div className="print-hide fixed bottom-6 right-6 z-50 flex flex-col gap-3">
          <button
            onClick={handleExportPdf}
            disabled={isExporting}
            className="bg-red-600 text-white font-display text-xl px-6 py-4 rounded-full manga-border manga-shadow-lg flex items-center gap-3 disabled:opacity-70"
          >
            <Download size={22} strokeWidth={3} />
            {isExporting ? "EXPORTING..." : "EXPORT LINKED PDF"}
          </button>
          <button
            onClick={handlePrint}
            className="bg-black text-white font-display text-xl px-6 py-4 rounded-full manga-border manga-shadow-lg flex items-center gap-3"
          >
            <Printer size={22} strokeWidth={3} />
            PRINT PREVIEW
          </button>
        </div>
      )}

      <MangaPage className="screentone-dots-light">
        <div className="flex-1 flex flex-col justify-between">
          <div className="pt-8 pb-4 z-10">
            <MangaHeader text="HACKATHON" subtitle="GLOBAL PARTICIPANT RULES" />
            <div className="text-center mt-2">
              <span className="font-display text-8xl text-red-600 text-shadow-solid text-stroke-black block transform rotate-2">
                2026
              </span>
            </div>
          </div>

          <MangaPanel className="flex-1 my-4 p-2 bg-black" angled>
            <div className="w-full h-full relative border-4 border-white bg-zinc-900 overflow-hidden">
              <img
                src="/TechblitzPoster.png"
                alt="Hackathon Hero"
                className="absolute inset-0 w-full h-full object-cover object-[center_33%]"
              />
              <div className="absolute inset-0 screentone-dots-light mix-blend-overlay"></div>
            </div>
            <SpeechBubble text="READ CAREFULLY!" position="bottom-right" className="-mr-8 -mb-8" />
          </MangaPanel>

          <div className="text-center z-10 pb-4">
            <p className="font-manga text-xl bg-yellow-400 inline-block px-4 py-2 border-2 border-black transform -rotate-1">
              VOL. 1: THE AWAKENING
            </p>
          </div>
        </div>
      </MangaPage>

      <MangaPage className="screentone-dots-light">
        <div className="mb-6" id="mission-log">
          <MangaHeader text="MISSION LOG" align="left" className="ml-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
          <MangaPanel screentone="light" className="p-6 md:col-span-2" id="toc">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="text-red-600" size={32} />
              <h2 className="font-display text-4xl">TABLE OF CONTENTS</h2>
            </div>

            <h3 className="font-display text-2xl text-red-600 mb-3">01. GENERAL RULES</h3>
            <ul className="space-y-2 font-bold text-base mb-6">
              {generalRules.map((rule) => (
                <li key={rule.id}>
                  <a
                    href={`#${rule.id}`}
                    className="flex justify-between border-b-2 border-dashed border-black/30 pb-1 hover:text-red-600"
                  >
                    <span>{`${rule.code}. ${rule.title}`}</span>
                    <span className="font-display text-red-600 text-xl">
                      PG.{pageNumbers[rule.id] ?? rule.fallbackPage}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <h3 className="font-display text-2xl text-red-600 mb-3">02. DOMAIN RULES</h3>
            <ul className="space-y-2 font-bold text-base">
              {visibleDomainRules.map((rule, index) => (
                <li key={rule.id}>
                  <a
                    href={`#${rule.id}`}
                    className="flex justify-between border-b-2 border-dashed border-black/30 pb-1 hover:text-red-600"
                  >
                    <span>{`${index + 1}. ${rule.title}`}</span>
                    <span className="font-display text-red-600 text-xl">
                      PG.{pageNumbers[rule.id] ?? rule.fallbackPage}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </MangaPanel>

          <MangaPanel className="bg-red-600 text-white flex items-center justify-center p-4 h-[150px] md:h-[170px]">
            <ActionText
              text="NO EXCUSES!"
              className="text-white text-stroke-black !text-5xl md:!text-6xl !-rotate-6 text-center"
            />
          </MangaPanel>

          <MangaPanel
            screentone="dense"
            className="flex items-center justify-center p-4 h-[150px] md:h-[170px]"
          >
            <h3 className="font-display text-4xl md:text-5xl bg-white px-4 py-3 border-4 border-black transform rotate-3 text-center leading-none">
              KNOWLEDGE IS POWER!
            </h3>
          </MangaPanel>
        </div>
      </MangaPage>

      <MangaPage className="screentone-dots-light">
        <a href="#mission-log" className="font-display text-xl text-red-600 underline">
          BACK TO MISSION LOG
        </a>

        <div className="grid grid-cols-1 md:grid-cols-2 md:[grid-auto-flow:dense] auto-rows-[minmax(140px,auto)] gap-6 content-start mt-2">
          {generalRules.slice(0, 5).map((rule, index) => (
            <MangaPanel
              key={rule.id}
              className={`${index === 0 ? "md:col-span-2" : ""} h-fit rounded-[10px] p-6`}
              id={rule.id}
            >
              <div className="absolute top-4 right-4 h-14 w-14 rounded-full screentone-dots-light opacity-70" />
              <div className="flex items-start gap-4 mb-3">
                <span className="font-display text-6xl leading-none text-stroke-black text-shadow-solid text-white">
                  {rule.code}
                </span>
                <h3 className="font-display text-3xl text-red-600">{rule.title}</h3>
              </div>
              <p className="font-bold text-lg leading-7 text-black">{rule.content}</p>
              {index === 0 && (
                <SpeechBubble
                  text="SQUAD UP!"
                  position="top-right"
                  className="!-top-2 !right-1 !left-auto !bottom-auto scale-[0.68] origin-top-right"
                />
              )}
              {index === 1 && (
                <div className="absolute bottom-4 right-4 text-yellow-500">
                  <Zap size={34} strokeWidth={2.8} />
                </div>
              )}
            </MangaPanel>
          ))}
        </div>
      </MangaPage>

      <MangaPage className="screentone-dots-light">
        <a href="#mission-log" className="font-display text-xl text-red-600 underline">
          BACK TO MISSION LOG
        </a>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 content-start auto-rows-min mt-2">
          {generalRules.slice(5, 9).map((rule) => (
            <div
              key={rule.id}
              id={rule.id}
              className="p-6 border-4 border-black rounded-xl bg-white shadow-[6px_6px_0_black] h-fit"
            >
              <div className="flex items-start gap-4 mb-3">
                <span className="font-display text-6xl leading-none text-stroke-black text-shadow-solid text-white">
                  {rule.code}
                </span>
                <h3 className="font-display text-3xl text-red-600">{rule.title}</h3>
              </div>
              <p className="font-bold text-lg leading-7 text-black">{rule.content}</p>
            </div>
          ))}
        </div>
      </MangaPage>

      {/* PAGE 5: RULES 10-11 */}
      <MangaPage className="screentone-dots-light">
        <a href="#mission-log" className="font-display text-xl text-red-600 underline">
          BACK TO MISSION LOG
        </a>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 content-start auto-rows-min mt-2">
          {generalRules.slice(9).map((rule) => (
            <div
              key={rule.id}
              id={rule.id}
              className="p-6 border-4 border-black rounded-xl bg-white shadow-[6px_6px_0_black] h-fit"
            >
              <div className="flex items-start gap-4 mb-3">
                <span className="font-display text-6xl leading-none text-stroke-black text-shadow-solid text-white">
                  {rule.code}
                </span>
                <h3 className="font-display text-3xl text-red-600">{rule.title}</h3>
              </div>
              <p className="font-bold text-lg leading-7 text-black">{rule.content}</p>
            </div>
          ))}
        </div>
      </MangaPage>

      {/* PAGE 6: DOMAIN RULES */}
      <MangaPage className="screentone-dots-light">
        <a href="#mission-log" className="font-display text-xl text-red-600 underline">
          BACK TO MISSION LOG
        </a>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 content-start auto-rows-min mt-3">
          {visibleDomainRules.map((rule, index) => (
            <div
              key={rule.id}
              id={rule.id}
              className="p-6 border-4 border-black rounded-xl bg-white shadow-[6px_6px_0_black] h-fit"
            >
              <div className="flex items-start gap-4 mb-3">
                <span className="font-display text-5xl leading-none text-stroke-black text-shadow-solid text-white">
                  D{index + 1}
                </span>
                <h3 className="font-display text-2xl text-red-600">{rule.title}</h3>
              </div>
              <p className="font-bold text-lg leading-7 text-black">{rule.content}</p>
            </div>
          ))}
        </div>
      </MangaPage>

      <MangaPage className="bg-black text-white print:bg-black">
        <div className="absolute inset-0 border-[16px] border-white m-4 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-8">
          <div className="mb-12">
            <ActionText text="THE CLOCK IS TICKING" className="text-yellow-400 !text-5xl" />
          </div>

          <h1 className="font-display text-7xl md:text-9xl text-white text-stroke-black text-shadow-solid mb-8 transform rotate-2">
            GOOD LUCK,<br />HACKERS!
          </h1>

          <div className="mt-12 border-t-4 border-white pt-8 w-full max-w-sm mx-auto">
            <p className="font-manga text-2xl tracking-widest">END OF VOLUME 1</p>
            <p className="font-body font-bold text-sm mt-4 text-gray-400 uppercase tracking-widest">
              Generated securely for Hackathon 2026
            </p>
          </div>
        </div>
      </MangaPage>
    </div>
  );
}
