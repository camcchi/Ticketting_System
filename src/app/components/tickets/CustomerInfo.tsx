import { User } from "../../types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Copy, Building2, ExternalLink, ChevronRight, ChevronDown, ListTodo, Clock, Network, Fingerprint, Puzzle, CalendarDays, Webhook } from "lucide-react";

interface CustomerInfoProps {
  customer: User;
}

export function CustomerInfo({ customer }: CustomerInfoProps) {
  const initials = customer.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="flex h-full bg-white">
      {/* ── CONTACT INFO & ACCORDIONS ── */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="p-4 flex items-center justify-between group">
          <div className="flex items-center gap-2 text-[13px] font-semibold text-slate-700">
            <User className="w-4 h-4 text-slate-500" />
            Contact info <span className="text-slate-300 font-light mx-0.5">|</span> <span className="text-[#137A87] hover:underline cursor-pointer">Edit</span>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        <div className="px-5 pb-5 border-b border-slate-100">
          <div className="flex items-start gap-3 mb-4">
            <Avatar className="w-10 h-10 mt-1 shadow-sm">
              <AvatarImage src="/sarah-avatar.jpg" />
              <AvatarFallback className="bg-slate-100 text-slate-600 font-medium">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-bold text-[14px] text-[#137A87] hover:underline cursor-pointer mb-0.5">
                {customer.name}
              </span>
              <span className="flex items-center gap-1.5 text-[12px] text-slate-500 hover:text-[#137A87] cursor-pointer">
                <Building2 className="w-3 h-3" />
                Advanced Machinery
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col gap-0.5">
              <span className="text-[11px] text-slate-500 tracking-wide">Title</span>
              <span className="text-[13px] text-slate-700 font-medium">Manager Public relations</span>
            </div>

            <div className="flex flex-col gap-0.5 group">
              <span className="text-[11px] text-slate-500 tracking-wide">Email</span>
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-slate-700 font-medium truncate pr-2">{customer.email}</span>
                <Copy className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 cursor-pointer hover:text-slate-600 flex-shrink-0" />
              </div>
            </div>

            <div className="flex flex-col gap-0.5 group">
              <span className="text-[11px] text-slate-500 tracking-wide">Work Phone</span>
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-slate-700 font-medium truncate pr-2">1855747676</span>
                <Copy className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 cursor-pointer hover:text-slate-600 flex-shrink-0" />
              </div>
            </div>

            <div className="flex items-center gap-1.5 pt-1">
              <ExternalLink className="w-3.5 h-3.5 text-[#137A87]" />
              <span className="text-[12px] font-semibold text-[#137A87] hover:underline cursor-pointer">View more info</span>
            </div>
          </div>
        </div>

        {/* Accordions */}
        <div className="flex flex-col">
          <button className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 hover:bg-slate-50 w-full">
            <span className="flex items-center gap-3 text-[13px] font-semibold text-slate-700">
              <Fingerprint className="w-4 h-4 text-[#4CC9B5]" />
              Recent timeline
            </span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
          
          <button className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 hover:bg-slate-50 w-full">
            <span className="flex items-center gap-3 text-[13px] font-semibold text-slate-700">
              <Clock className="w-4 h-4 text-[#8ED1C9]" />
              Time logs
            </span>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>

          <button className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 hover:bg-slate-50 w-full">
            <span className="flex items-center gap-3 text-[13px] font-semibold text-slate-700">
              <ListTodo className="w-4 h-4 text-[#4CC9B5]" />
              To-do
            </span>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>

          <button className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 hover:bg-slate-50 w-full">
            <span className="flex items-center gap-3 text-[13px] font-semibold text-slate-700">
              <Network className="w-4 h-4 text-orange-500" />
              HubSpot CRM (Sample)
            </span>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>

      {/* ── EXTREME RIGHT EDGE MENU ── */}
      <div className="w-10 bg-slate-50 border-l border-slate-200 flex flex-col items-center py-4 gap-4 flex-shrink-0">
        <button className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:text-[#137A87] hover:bg-white border border-transparent hover:border-slate-200 transition-all">
          <User className="w-3.5 h-3.5" />
        </button>
        <button className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:text-[#137A87] hover:bg-white border border-transparent hover:border-slate-200 transition-all">
          <Puzzle className="w-3.5 h-3.5" />
        </button>
        <button className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:text-[#137A87] hover:bg-white border border-transparent hover:border-slate-200 transition-all">
          <CalendarDays className="w-3.5 h-3.5" />
        </button>
        <button className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:text-[#137A87] hover:bg-white border border-transparent hover:border-slate-200 transition-all">
          <Webhook className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}