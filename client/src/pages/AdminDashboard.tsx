import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, MessageSquare, FileText, LogOut, Check, Eye, ChevronDown, ChevronUp, ArrowLeft } from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "leads" | "chats" | "admins">("dashboard");
  const [, navigate] = useLocation();

  const adminQuery = useQuery({
    queryKey: ["/api/admin/me"],
    queryFn: async () => {
      const res = await fetch("/api/admin/me", { credentials: "include" });
      if (!res.ok) throw new Error("Not authenticated");
      return res.json();
    },
    retry: false,
  });

  useEffect(() => {
    if (adminQuery.isError) navigate("/");
  }, [adminQuery.isError, navigate]);

  const logoutMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/admin/logout"),
    onSuccess: () => navigate("/"),
  });

  if (adminQuery.isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-100"><div className="text-slate-500">Loading...</div></div>;
  }

  if (!adminQuery.data) return null;

  return (
    <div className="min-h-screen bg-slate-100">
      <nav className="bg-[#0A3D6B] text-white px-6 py-4 flex items-center justify-between shadow-lg" data-testid="admin-nav">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/")} className="hover:bg-white/10 p-2 rounded-lg transition" data-testid="button-back-home">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold">Cahit Admin Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-white/70">{adminQuery.data.email}</span>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10" onClick={() => logoutMutation.mutate()} data-testid="button-admin-logout">
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
      </nav>

      <div className="flex">
        <aside className="w-64 bg-white shadow-sm min-h-[calc(100vh-64px)] p-4 space-y-1">
          {[
            { key: "dashboard" as const, icon: FileText, label: "Dashboard" },
            { key: "leads" as const, icon: FileText, label: "Leads" },
            { key: "chats" as const, icon: MessageSquare, label: "Chat Logs" },
            { key: "admins" as const, icon: Users, label: "Admin Users" },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${activeTab === item.key ? "bg-sky-50 text-sky-700" : "text-slate-600 hover:bg-slate-50"}`}
              data-testid={`tab-${item.key}`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </aside>

        <main className="flex-1 p-8">
          {activeTab === "dashboard" && <DashboardOverview />}
          {activeTab === "leads" && <LeadsPanel />}
          {activeTab === "chats" && <ChatsPanel />}
          {activeTab === "admins" && <AdminsPanel />}
        </main>
      </div>
    </div>
  );
}

function DashboardOverview() {
  const leadsQuery = useQuery({ queryKey: ["/api/admin/leads"], queryFn: async () => { const r = await fetch("/api/admin/leads", { credentials: "include" }); if (!r.ok) throw new Error("Failed to fetch leads"); return r.json(); } });
  const chatsQuery = useQuery({ queryKey: ["/api/admin/chats"], queryFn: async () => { const r = await fetch("/api/admin/chats", { credentials: "include" }); if (!r.ok) throw new Error("Failed to fetch chats"); return r.json(); } });
  const adminsQuery = useQuery({ queryKey: ["/api/admin/users"], queryFn: async () => { const r = await fetch("/api/admin/users", { credentials: "include" }); if (!r.ok) throw new Error("Failed to fetch admins"); return r.json(); } });

  const unreadLeads = Array.isArray(leadsQuery.data) ? leadsQuery.data.filter((l: any) => !l.isRead).length : 0;
  const totalLeads = Array.isArray(leadsQuery.data) ? leadsQuery.data.length : 0;
  const totalChats = Array.isArray(chatsQuery.data) ? chatsQuery.data.length : 0;
  const totalAdmins = Array.isArray(adminsQuery.data) ? adminsQuery.data.length : 0;
  const pendingAdmins = Array.isArray(adminsQuery.data) ? adminsQuery.data.filter((a: any) => !a.isApproved).length : 0;

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-6" data-testid="text-dashboard-title">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6"><p className="text-sm text-slate-500 mb-1">Total Leads</p><p className="text-3xl font-bold text-slate-900">{totalLeads}</p>{unreadLeads > 0 && <p className="text-xs text-amber-600 mt-1">{unreadLeads} unread</p>}</Card>
        <Card className="p-6"><p className="text-sm text-slate-500 mb-1">Chat Sessions</p><p className="text-3xl font-bold text-slate-900">{totalChats}</p></Card>
        <Card className="p-6"><p className="text-sm text-slate-500 mb-1">Admin Users</p><p className="text-3xl font-bold text-slate-900">{totalAdmins}</p>{pendingAdmins > 0 && <p className="text-xs text-amber-600 mt-1">{pendingAdmins} pending</p>}</Card>
        <Card className="p-6"><p className="text-sm text-slate-500 mb-1">Status</p><p className="text-lg font-bold text-green-600">Online</p></Card>
      </div>
    </div>
  );
}

function LeadsPanel() {
  const query = useQuery({ queryKey: ["/api/admin/leads"], queryFn: async () => { const r = await fetch("/api/admin/leads", { credentials: "include" }); if (!r.ok) throw new Error("Failed"); return r.json(); } });
  const markRead = useMutation({
    mutationFn: (id: number) => apiRequest("POST", `/api/admin/leads/${id}/read`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/admin/leads"] }),
  });

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Leads</h2>
      {query.isLoading && <p className="text-slate-500">Loading...</p>}
      {Array.isArray(query.data) && query.data.length === 0 && <p className="text-slate-500">No leads yet</p>}
      <div className="space-y-4">
        {Array.isArray(query.data) && query.data.map((lead: any) => (
          <Card key={lead.id} className={`p-6 ${!lead.isRead ? "border-l-4 border-l-sky-500" : ""}`} data-testid={`lead-${lead.id}`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-slate-900">{lead.name || "Anonymous"}</p>
                <p className="text-sm text-slate-600">{lead.email}</p>
                {lead.phone && <p className="text-sm text-slate-500">{lead.phone}</p>}
                {lead.serviceType && <p className="text-xs text-sky-600 mt-1">Service: {lead.serviceType}</p>}
                {lead.projectScope && <p className="text-xs text-slate-500">Scope: {lead.projectScope}</p>}
                {lead.message && <p className="text-sm text-slate-700 mt-2">{lead.message}</p>}
                <p className="text-xs text-slate-400 mt-2">{new Date(lead.createdAt).toLocaleString()}</p>
              </div>
              {!lead.isRead && (
                <Button variant="outline" size="sm" onClick={() => markRead.mutate(lead.id)} data-testid={`button-mark-read-${lead.id}`}>
                  <Eye className="w-4 h-4 mr-1" /> Mark Read
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ChatsPanel() {
  const [openSession, setOpenSession] = useState<string | null>(null);
  const query = useQuery({ queryKey: ["/api/admin/chats"], queryFn: async () => { const r = await fetch("/api/admin/chats", { credentials: "include" }); if (!r.ok) throw new Error("Failed"); return r.json(); } });

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Chat Logs</h2>
      {query.isLoading && <p className="text-slate-500">Loading...</p>}
      {Array.isArray(query.data) && query.data.length === 0 && <p className="text-slate-500">No chat sessions yet</p>}
      <div className="space-y-3">
        {Array.isArray(query.data) && query.data.map((session: any) => (
          <div key={session.sessionId}>
            <Card className="p-4 cursor-pointer hover:bg-slate-50 transition" onClick={() => setOpenSession(openSession === session.sessionId ? null : session.sessionId)} data-testid={`chat-session-${session.sessionId}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900 text-sm">Session: {session.sessionId.slice(0, 20)}...</p>
                  <p className="text-xs text-slate-500">{session.messageCount} messages • {new Date(session.lastMessage).toLocaleString()}</p>
                </div>
                {openSession === session.sessionId ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </div>
            </Card>
            {openSession === session.sessionId && <ChatSessionDetail sessionId={session.sessionId} />}
          </div>
        ))}
      </div>
    </div>
  );
}

function ChatSessionDetail({ sessionId }: { sessionId: string }) {
  const query = useQuery({
    queryKey: ["/api/admin/chats", sessionId],
    queryFn: async () => { const r = await fetch(`/api/admin/chats/${sessionId}`, { credentials: "include" }); if (!r.ok) throw new Error("Failed"); return r.json(); },
  });

  if (query.isLoading) return <p className="text-slate-500 p-4">Loading messages...</p>;

  return (
    <div className="bg-gray-50 rounded-b-lg p-4 space-y-3 border border-t-0 border-slate-200">
      {Array.isArray(query.data) && query.data.map((msg: any, i: number) => (
        <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
          <div className={`max-w-[70%] px-3 py-2 rounded-lg text-sm ${msg.role === "user" ? "bg-sky-100 text-slate-800" : "bg-white border border-slate-200 text-slate-700"}`}>
            <p className="text-xs text-slate-400 mb-1">{msg.role === "user" ? "User" : "Bot"} • {new Date(msg.createdAt).toLocaleTimeString()}</p>
            <p style={{ whiteSpace: "pre-wrap" }}>{msg.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function AdminsPanel() {
  const query = useQuery({ queryKey: ["/api/admin/users"], queryFn: async () => { const r = await fetch("/api/admin/users", { credentials: "include" }); if (!r.ok) throw new Error("Failed"); return r.json(); } });
  const approveMutation = useMutation({
    mutationFn: (id: number) => apiRequest("POST", `/api/admin/approve/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] }),
  });

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Admin Users</h2>
      {query.isLoading && <p className="text-slate-500">Loading...</p>}
      <div className="space-y-3">
        {Array.isArray(query.data) && query.data.map((admin: any) => (
          <Card key={admin.id} className="p-4" data-testid={`admin-user-${admin.id}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-900">{admin.username}</p>
                <p className="text-sm text-slate-600">{admin.email}</p>
                <div className="flex items-center gap-2 mt-1">
                  {admin.isApproved ? (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Approved</span>
                  ) : (
                    <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Pending</span>
                  )}
                  {admin.isFirstAdmin && <span className="text-xs bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full">First Admin</span>}
                </div>
              </div>
              {!admin.isApproved && (
                <Button variant="outline" size="sm" onClick={() => approveMutation.mutate(admin.id)} data-testid={`button-approve-${admin.id}`}>
                  <Check className="w-4 h-4 mr-1" /> Approve
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
