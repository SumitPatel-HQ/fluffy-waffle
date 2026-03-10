import { rules, type Rule, type InsertRule } from "@shared/schema";

export interface IStorage {
  getRules(): Promise<Rule[]>;
  createRule(rule: InsertRule): Promise<Rule>;
}

export class MemStorage implements IStorage {
  private rules: Map<number, Rule>;
  private currentId: number;

  constructor() {
    this.rules = new Map();
    this.currentId = 1;
  }

  async getRules(): Promise<Rule[]> {
    return Array.from(this.rules.values());
  }

  async createRule(insertRule: InsertRule): Promise<Rule> {
    const id = this.currentId++;
    const rule: Rule = { ...insertRule, id };
    this.rules.set(id, rule);
    return rule;
  }
}

export const storage = new MemStorage();
