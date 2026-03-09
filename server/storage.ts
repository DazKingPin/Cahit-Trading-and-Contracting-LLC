import { adminUsers, chatMessages, leads } from "@shared/schema";
import type { AdminUser, InsertAdminUser, ChatMessage, InsertChatMessage, Lead, InsertLead } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getAdminByEmail(email: string): Promise<AdminUser | undefined>;
  getAdminById(id: number): Promise<AdminUser | undefined>;
  createAdmin(admin: InsertAdminUser & { isFirstAdmin?: boolean }): Promise<AdminUser>;
  getAllAdmins(): Promise<AdminUser[]>;
  approveAdmin(id: number): Promise<void>;
  getAdminCount(): Promise<number>;

  createChatMessage(msg: InsertChatMessage): Promise<ChatMessage>;
  getChatsBySession(sessionId: string): Promise<ChatMessage[]>;
  getAllChatSessions(): Promise<{ sessionId: string; messageCount: number; lastMessage: Date }[]>;

  createLead(lead: InsertLead): Promise<Lead>;
  getAllLeads(): Promise<Lead[]>;
  markLeadRead(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getAdminByEmail(email: string): Promise<AdminUser | undefined> {
    const [admin] = await db.select().from(adminUsers).where(eq(adminUsers.email, email));
    return admin;
  }

  async getAdminById(id: number): Promise<AdminUser | undefined> {
    const [admin] = await db.select().from(adminUsers).where(eq(adminUsers.id, id));
    return admin;
  }

  async createAdmin(admin: InsertAdminUser & { isFirstAdmin?: boolean }): Promise<AdminUser> {
    const count = await this.getAdminCount();
    const isFirst = count === 0;
    const [created] = await db.insert(adminUsers).values({
      ...admin,
      isApproved: isFirst,
      isFirstAdmin: isFirst,
    }).returning();
    return created;
  }

  async getAllAdmins(): Promise<AdminUser[]> {
    return db.select().from(adminUsers);
  }

  async approveAdmin(id: number): Promise<void> {
    await db.update(adminUsers).set({ isApproved: true }).where(eq(adminUsers.id, id));
  }

  async getAdminCount(): Promise<number> {
    const all = await db.select().from(adminUsers);
    return all.length;
  }

  async createChatMessage(msg: InsertChatMessage): Promise<ChatMessage> {
    const [created] = await db.insert(chatMessages).values(msg).returning();
    return created;
  }

  async getChatsBySession(sessionId: string): Promise<ChatMessage[]> {
    return db.select().from(chatMessages).where(eq(chatMessages.sessionId, sessionId)).orderBy(chatMessages.createdAt);
  }

  async getAllChatSessions(): Promise<{ sessionId: string; messageCount: number; lastMessage: Date }[]> {
    const all = await db.select().from(chatMessages).orderBy(desc(chatMessages.createdAt));
    const sessions = new Map<string, { count: number; last: Date }>();
    for (const msg of all) {
      const existing = sessions.get(msg.sessionId);
      if (existing) {
        existing.count++;
        if (msg.createdAt > existing.last) existing.last = msg.createdAt;
      } else {
        sessions.set(msg.sessionId, { count: 1, last: msg.createdAt });
      }
    }
    return Array.from(sessions.entries()).map(([sessionId, data]) => ({
      sessionId,
      messageCount: data.count,
      lastMessage: data.last,
    }));
  }

  async createLead(lead: InsertLead): Promise<Lead> {
    const [created] = await db.insert(leads).values(lead).returning();
    return created;
  }

  async getAllLeads(): Promise<Lead[]> {
    return db.select().from(leads).orderBy(desc(leads.createdAt));
  }

  async markLeadRead(id: number): Promise<void> {
    await db.update(leads).set({ isRead: true }).where(eq(leads.id, id));
  }
}

export const storage = new DatabaseStorage();
