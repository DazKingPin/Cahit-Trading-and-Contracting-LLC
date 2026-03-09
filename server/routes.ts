import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import session from "express-session";
import bcrypt from "bcrypt";
import { insertAdminUserSchema, insertLeadSchema, insertChatMessageSchema } from "@shared/schema";
import MemoryStore from "memorystore";

const MemoryStoreSession = MemoryStore(session);

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  const isProduction = process.env.NODE_ENV === "production";
  app.use(
    session({
      secret: process.env.SESSION_SECRET!,
      resave: false,
      saveUninitialized: false,
      store: new MemoryStoreSession({ checkPeriod: 86400000 }),
      cookie: {
        secure: isProduction,
        httpOnly: true,
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
      },
    })
  );

  app.post("/api/admin/register", async (req, res) => {
    try {
      const parsed = insertAdminUserSchema.parse(req.body);
      const existing = await storage.getAdminByEmail(parsed.email);
      if (existing) {
        return res.status(400).json({ message: "Email already registered" });
      }
      const hashedPassword = await bcrypt.hash(parsed.password, 10);
      const admin = await storage.createAdmin({ ...parsed, password: hashedPassword });
      if (admin.isApproved) {
        (req.session as any).adminId = admin.id;
        return res.json({ message: "Admin account created and approved (first admin)", admin: { id: admin.id, email: admin.email, username: admin.username, isApproved: true } });
      }
      res.json({ message: "Registration submitted. Awaiting approval from an existing admin.", admin: { id: admin.id, email: admin.email, username: admin.username, isApproved: false } });
    } catch (e: any) {
      res.status(400).json({ message: e.message || "Invalid registration data" });
    }
  });

  app.post("/api/admin/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password required" });
      }
      const admin = await storage.getAdminByEmail(email);
      if (!admin) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const valid = await bcrypt.compare(password, admin.password);
      if (!valid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      if (!admin.isApproved) {
        return res.status(403).json({ message: "Account pending approval" });
      }
      (req.session as any).adminId = admin.id;
      res.json({ admin: { id: admin.id, email: admin.email, username: admin.username } });
    } catch (e: any) {
      res.status(500).json({ message: "Login failed" });
    }
  });

  app.get("/api/admin/me", async (req, res) => {
    const adminId = (req.session as any)?.adminId;
    if (!adminId) return res.status(401).json({ message: "Not authenticated" });
    const admin = await storage.getAdminById(adminId);
    if (!admin) return res.status(401).json({ message: "Not authenticated" });
    res.json({ id: admin.id, email: admin.email, username: admin.username });
  });

  app.post("/api/admin/logout", (req, res) => {
    req.session.destroy(() => {
      res.json({ message: "Logged out" });
    });
  });

  app.get("/api/admin/users", async (req, res) => {
    const adminId = (req.session as any)?.adminId;
    if (!adminId) return res.status(401).json({ message: "Not authenticated" });
    const admins = await storage.getAllAdmins();
    res.json(admins.map(a => ({ id: a.id, email: a.email, username: a.username, isApproved: a.isApproved, isFirstAdmin: a.isFirstAdmin })));
  });

  app.post("/api/admin/approve/:id", async (req, res) => {
    const adminId = (req.session as any)?.adminId;
    if (!adminId) return res.status(401).json({ message: "Not authenticated" });
    const currentAdmin = await storage.getAdminById(adminId);
    if (!currentAdmin?.isApproved) return res.status(403).json({ message: "Not authorized" });
    await storage.approveAdmin(parseInt(req.params.id));
    res.json({ message: "Admin approved" });
  });

  app.post("/api/leads", async (req, res) => {
    try {
      const parsed = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(parsed);
      res.json(lead);
    } catch (e: any) {
      res.status(400).json({ message: e.message || "Invalid data" });
    }
  });

  app.get("/api/admin/leads", async (req, res) => {
    const adminId = (req.session as any)?.adminId;
    if (!adminId) return res.status(401).json({ message: "Not authenticated" });
    const allLeads = await storage.getAllLeads();
    res.json(allLeads);
  });

  app.post("/api/admin/leads/:id/read", async (req, res) => {
    const adminId = (req.session as any)?.adminId;
    if (!adminId) return res.status(401).json({ message: "Not authenticated" });
    await storage.markLeadRead(parseInt(req.params.id));
    res.json({ message: "Marked as read" });
  });

  app.post("/api/chat", async (req, res) => {
    try {
      const { sessionId, message } = req.body;
      if (!sessionId || !message) {
        return res.status(400).json({ message: "sessionId and message required" });
      }
      await storage.createChatMessage({ sessionId, role: "user", content: message });
      const reply = generateChatReply(message);
      const botMsg = await storage.createChatMessage({ sessionId, role: "assistant", content: reply });
      res.json({ reply: botMsg.content });
    } catch (e: any) {
      res.status(500).json({ message: "Chat failed" });
    }
  });

  app.get("/api/admin/chats", async (req, res) => {
    const adminId = (req.session as any)?.adminId;
    if (!adminId) return res.status(401).json({ message: "Not authenticated" });
    const sessions = await storage.getAllChatSessions();
    res.json(sessions);
  });

  app.get("/api/admin/chats/:sessionId", async (req, res) => {
    const adminId = (req.session as any)?.adminId;
    if (!adminId) return res.status(401).json({ message: "Not authenticated" });
    const messages = await storage.getChatsBySession(req.params.sessionId);
    res.json(messages);
  });

  return httpServer;
}

function generateChatReply(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("service") || lower.includes("what do you do")) {
    return "Cahit Trading & Contracting LLC offers marine & coastal construction, infrastructure development, earthworks & grading, dewatering & shoring, and MEP works. How can we help with your project?";
  }
  if (lower.includes("marine") || lower.includes("coastal") || lower.includes("breakwater") || lower.includes("port")) {
    return "We specialize in marine infrastructure including breakwaters, quay walls, coastal protection systems, dredging, and harbor construction. Would you like to discuss a specific marine project?";
  }
  if (lower.includes("contact") || lower.includes("phone") || lower.includes("email") || lower.includes("reach")) {
    return "You can reach us at:\n\nPhone: +968 2411 2406 Ext 101\nMobile: +968 9096 6562\nEmail: ctc@cahitcontracting.com\nWhatsApp: +968 9096 6562\n\nOffice: Khaleej Tower, 6th Floor, No. 603, Ghala, Muscat, Sultanate of Oman";
  }
  if (lower.includes("location") || lower.includes("address") || lower.includes("office") || lower.includes("where")) {
    return "Our office is located at Khaleej Tower, 6th Floor, No. 603, Ghala, Muscat, Sultanate of Oman. Feel free to visit us during business hours!";
  }
  if (lower.includes("project") || lower.includes("portfolio")) {
    return "We have completed 50+ major infrastructure projects across Oman, including seaport infrastructure, coastal protection systems, road construction, and industrial facilities. Would you like to learn more about any specific type of project?";
  }
  if (lower.includes("quote") || lower.includes("price") || lower.includes("cost") || lower.includes("estimate")) {
    return "We'd be happy to provide a quote for your project. Could you share some details about the type of work, location, and timeline? Or you can contact us directly at ctc@cahitcontracting.com.";
  }
  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey") || lower.includes("good")) {
    return "Hello! Welcome to Cahit Trading & Contracting. How can I assist you today? You can ask about our services, projects, or get in touch with our team.";
  }
  if (lower.includes("experience") || lower.includes("year") || lower.includes("history")) {
    return "Cahit Trading & Contracting has been operating in Oman since 2009, with over 15 years of experience in marine construction, infrastructure development, and industrial services. Our founder, Tahir Şenyurt, brings over 25 years of industry experience.";
  }
  return "Thank you for your message! Our team at Cahit Trading & Contracting is here to help. You can ask about our services (marine construction, infrastructure, earthworks, dewatering, MEP), our projects, or how to get in touch. How can we assist you?";
}
