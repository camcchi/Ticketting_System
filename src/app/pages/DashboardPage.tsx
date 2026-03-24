import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { Plus, Clock, Smile, Meh, Frown, ExternalLink, TrendingUp, Inbox, Timer, Target, ChevronDown, Ticket, Mail, MessageSquare, User, Building2, UserCheck } from "lucide-react";
import { CreateTicketModal } from "../components/tickets/CreateTicketModal";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

// --- Mock Data ---
const topStats = [
  { label: "Open", value: 55 },
  { label: "On Hold", value: 4 },
  { label: "Pending", value: 11 },
  { label: "Unresolved", value: 28 },
  { label: "Due Today", value: 3 },
  { label: "Overdue", value: 8 },
];

const hourlyData = Array.from({ length: 24 }, (_, i) => ({
  hour: i,
  today: Math.max(0, Math.round(Math.sin(i * 0.4) * 12 + Math.random() * 8 + (i > 10 && i < 18 ? 8 : 2))),
  yesterday: Math.max(0, Math.round(Math.cos(i * 0.3) * 8 + Math.random() * 6 + 3)),
}));

const unresolvedGroups = [
  { name: "Customer Support", open: 32 },
  { name: "Loyalty Programs", open: 8 },
  { name: "Vendor Management", open: 12 },
  { name: "Billing", open: 3 },
  { name: "Technical Issues", open: 9 },
];

const todos = [
  {
    id: 1,
    done: false,
    title: "Follow up with customer about Upgrade",
    tag: "Two-factor authentication by Google Authenticator",
    due: "IN A DAY",
    urgent: true,
  },
  {
    id: 2,
    done: false,
    title: "Billing reminder",
    tag: "Ticket sharing between groups",
    due: "IN 8 DAYS",
    urgent: false,
  },
  {
    id: 3,
    done: true,
    title: "Review SLA policy changes",
    tag: "Policy audit Q2",
    due: "DONE",
    urgent: false,
  },
];

// --- Custom Tooltip ---
function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-[#8ED1C9]/40 rounded-xl shadow-lg px-4 py-3 text-sm">
        <p className="font-semibold text-[#137A87] mb-1">{`Hour ${label}:00`}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color }} className="text-xs">
            {p.name === "today" ? "Today" : "Yesterday"}: <span className="font-bold">{p.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
}

export function DashboardPage() {
  const [todoList, setTodoList] = useState(todos);
  const [showCreateTicket, setShowCreateTicket] = useState(false);
  const now = new Date().toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const toggleTodo = (id: number) => {
    setTodoList((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  return (
    <div className="h-full overflow-y-auto bg-[#f7fafa]">
      {/* Create Ticket Modal */}
      <CreateTicketModal open={showCreateTicket} onOpenChange={setShowCreateTicket} />

      {/* ── PAGE HEADER ── */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-[#8ED1C9]/30">
        <div>
          <h1 className="text-lg font-semibold text-[#137A87]">Dashboard</h1>
          <p className="text-xs text-slate-400">Welcome back, Sarah · {now}</p>
        </div>
        {/* ── NEW DROPDOWN BUTTON ── */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#137A87] hover:bg-[#0f6370] text-white text-sm font-semibold shadow-sm transition-all hover:shadow-md active:scale-95 outline-none">
              <Plus className="w-4 h-4" />
              New
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              align="end"
              sideOffset={6}
              className="z-50 min-w-[180px] bg-white rounded-xl border border-slate-200 shadow-xl py-1.5 animate-in fade-in slide-in-from-top-1"
            >
              {[
                { label: "Ticket",  Icon: Ticket,        onClick: () => setShowCreateTicket(true) },
                { label: "Email",   Icon: Mail,           onClick: () => {} },
                { label: "Message", Icon: MessageSquare,  onClick: () => {} },
                { label: "Contact", Icon: User,           onClick: () => {} },
                { label: "Company", Icon: Building2,      onClick: () => {} },
                { label: "Agent",   Icon: UserCheck,      onClick: () => {} },
              ].map(({ label, Icon, onClick }) => (
                <DropdownMenu.Item
                  key={label}
                  onClick={onClick}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:text-[#137A87] hover:bg-[#f0fafa] cursor-pointer outline-none transition-colors select-none"
                >
                  <Icon className="w-4 h-4 text-slate-400" />
                  {label}
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>

      {/* ── TOP STAT STRIP ── */}
      <div className="grid grid-cols-6 divide-x divide-[#8ED1C9]/30 bg-white border-b border-[#8ED1C9]/30 shadow-sm">
        {topStats.map((s) => (
          <div
            key={s.label}
            className="flex flex-col items-center justify-center py-5 hover:bg-[#f0fafa] transition-colors cursor-pointer group"
          >
            <span className="text-3xl font-bold text-[#137A87] group-hover:text-[#4CC9B5] transition-colors">
              {s.value}
            </span>
            <span className="text-xs text-slate-400 mt-1 uppercase tracking-wide font-medium">
              {s.label}
            </span>
          </div>
        ))}
      </div>

      <div className="p-6 space-y-6">
        {/* ── TRENDS & METRICS ROW ── */}
        <div className="grid grid-cols-3 gap-6">
          {/* Line Chart */}
          <div className="col-span-2 bg-white rounded-2xl border border-[#8ED1C9]/30 shadow-sm p-5">
            <div className="flex items-center justify-between mb-1">
              <div>
                <h2 className="font-semibold text-[#137A87] text-base">Today's Trends</h2>
                <p className="text-xs text-slate-400 mt-0.5">{now}</p>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-5 h-0.5 bg-[#4CC9B5] inline-block rounded-full" />
                  Today
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-5 h-0.5 bg-slate-300 inline-block rounded-full" />
                  Yesterday
                </span>
              </div>
            </div>
            <div className="h-52 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={hourlyData} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                  <defs>
                    <linearGradient id="todayGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4CC9B5" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#4CC9B5" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="yesterdayGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#cbd5e1" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#cbd5e1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2f4f4" />
                  <XAxis
                    dataKey="hour"
                    tick={{ fontSize: 10, fill: "#94a3b8" }}
                    axisLine={false}
                    tickLine={false}
                    label={{ value: "Hours", position: "insideBottom", offset: -2, fontSize: 10, fill: "#94a3b8" }}
                  />
                  <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="yesterday"
                    stroke="#cbd5e1"
                    strokeWidth={1.5}
                    fill="url(#yesterdayGrad)"
                    dot={false}
                  />
                  <Area
                    type="monotone"
                    dataKey="today"
                    stroke="#4CC9B5"
                    strokeWidth={2}
                    fill="url(#todayGrad)"
                    dot={{ r: 3, fill: "#4CC9B5", strokeWidth: 0 }}
                    activeDot={{ r: 5, fill: "#137A87" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Metrics Panel */}
          <div className="bg-white rounded-2xl border border-[#8ED1C9]/30 shadow-sm p-5 flex flex-col justify-between">
            <h2 className="font-semibold text-[#137A87] text-base mb-4">Key Metrics</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: TrendingUp, label: "Resolved", value: "45", sub: "today" },
                { icon: Inbox, label: "Received", value: "100", sub: "today" },
                { icon: Timer, label: "Avg First Response", value: "12m", sub: "avg" },
                { icon: Timer, label: "Avg Resolution", value: "24m", sub: "avg" },
              ].map(({ icon: Icon, label, value, sub }) => (
                <div key={label} className="flex flex-col gap-1 p-3 rounded-xl bg-[#f7fafa] border border-[#8ED1C9]/20">
                  <Icon className="w-4 h-4 text-[#4CC9B5]" />
                  <span className="text-xs text-slate-400 mt-1">{label}</span>
                  <span className="text-2xl font-bold text-[#137A87]">{value}</span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wide">{sub}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 rounded-xl bg-gradient-to-br from-[#137A87]/10 to-[#4CC9B5]/10 border border-[#8ED1C9]/30 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400">Resolution within SLA</p>
                <p className="text-2xl font-bold text-[#137A87]">91%</p>
              </div>
              <Target className="w-8 h-8 text-[#4CC9B5] opacity-70" />
            </div>
          </div>
        </div>

        {/* ── BOTTOM THREE COLUMNS ── */}
        <div className="grid grid-cols-3 gap-6">
          {/* Unresolved Tickets */}
          <div className="bg-white rounded-2xl border border-[#8ED1C9]/30 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-semibold text-[#137A87] text-sm">Unresolved Tickets</h2>
                <p className="text-xs text-slate-400">Across helpdesk</p>
              </div>
              <button className="text-xs text-[#4CC9B5] hover:text-[#137A87] flex items-center gap-1 transition-colors font-medium">
                View details <ExternalLink className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-400 font-medium uppercase tracking-wide pb-1 border-b border-slate-100">
                <span>Group</span>
                <span>Open</span>
              </div>
              {unresolvedGroups.map((g) => (
                <div
                  key={g.name}
                  className="flex items-center justify-between py-2 border-b border-slate-50 hover:bg-[#f7fafa] px-1 rounded-lg transition-colors cursor-pointer group"
                >
                  <span className="text-sm text-slate-600 group-hover:text-[#137A87] transition-colors">
                    {g.name}
                  </span>
                  <span className="text-sm font-semibold text-[#137A87] bg-[#8ED1C9]/15 px-2 py-0.5 rounded-full">
                    {g.open}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Satisfaction */}
          <div className="bg-white rounded-2xl border border-[#8ED1C9]/30 shadow-sm p-5">
            <div className="mb-4">
              <h2 className="font-semibold text-[#137A87] text-sm">Customer Satisfaction</h2>
              <p className="text-xs text-slate-400">Across helpdesk this month</p>
            </div>
            <div className="mb-5 px-1">
              <p className="text-xs text-slate-400 mb-0.5">Responses received</p>
              <p className="text-3xl font-bold text-[#137A87]">320</p>
            </div>
            <div className="space-y-4">
              {[
                { label: "Positive", icon: Smile, value: 90, color: "#4CC9B5", bg: "#f0fdf9", iconColor: "#4CC9B5" },
                { label: "Neutral", icon: Meh, value: 6, color: "#f59e0b", bg: "#fffbeb", iconColor: "#f59e0b" },
                { label: "Negative", icon: Frown, value: 4, color: "#ef4444", bg: "#fef2f2", iconColor: "#ef4444" },
              ].map(({ label, icon: Icon, value, color, bg, iconColor }) => (
                <div key={label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4" style={{ color: iconColor }} />
                      <span className="text-sm text-slate-500">{label}</span>
                    </div>
                    <span className="text-sm font-bold" style={{ color }}>{value}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${value}%`, backgroundColor: color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* To-Do */}
          <div className="bg-white rounded-2xl border border-[#8ED1C9]/30 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-semibold text-[#137A87] text-sm">
                  To-Do{" "}
                  <span className="text-xs font-normal text-slate-400 ml-1">
                    ({todoList.filter((t) => !t.done).length})
                  </span>
                </h2>
              </div>
              <button className="flex items-center gap-1 text-xs text-[#4CC9B5] hover:text-[#137A87] font-medium transition-colors">
                <Plus className="w-3.5 h-3.5" /> Add to-do
              </button>
            </div>
            <div className="space-y-3">
              {todoList.map((todo) => (
                <div
                  key={todo.id}
                  onClick={() => toggleTodo(todo.id)}
                  className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 hover:border-[#8ED1C9]/50 hover:bg-[#f7fafa] transition-all cursor-pointer group"
                >
                  <div
                    className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center flex-shrink-0 border transition-colors ${
                      todo.done
                        ? "bg-[#4CC9B5] border-[#4CC9B5]"
                        : "border-slate-300 group-hover:border-[#4CC9B5]"
                    }`}
                  >
                    {todo.done && (
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={`text-sm font-medium leading-snug ${todo.done ? "line-through text-slate-400" : "text-slate-700"}`}>
                      {todo.title}
                    </p>
                    <p className="text-xs text-slate-400 truncate mt-0.5">{todo.tag}</p>
                    <span
                      className={`inline-block mt-1.5 text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${
                        todo.due === "DONE"
                          ? "bg-[#4CC9B5]/15 text-[#137A87]"
                          : todo.urgent
                          ? "bg-orange-50 text-orange-500"
                          : "bg-[#8ED1C9]/20 text-[#137A87]"
                      }`}
                    >
                      {todo.due === "DONE" ? "✓ Done" : <><Clock className="w-2.5 h-2.5 inline mr-1" />{todo.due}</>}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
