import { Ticket } from "../../types";
import { Clock, ExternalLink, ChevronDown, Plus } from "lucide-react";
import { Button } from "../ui/button";

interface TicketMetadataProps {
  ticket: Ticket;
  onUpdate?: (ticket: Ticket) => void;
}

export function TicketMetadata({ ticket, onUpdate }: TicketMetadataProps) {
  return (
    <div className="flex flex-col">
      {/* ── STATUS & SLA BLOCK ── */}
      <div className="p-5 border-b border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[15px] font-semibold text-[#0B3A42] capitalize">{ticket.status}</h3>
          <Button variant="ghost" size="icon" className="w-6 h-6 text-slate-400 hover:text-slate-600">
            <ExternalLink className="w-3.5 h-3.5" />
          </Button>
        </div>
        
        <div className="space-y-3">
          <div className="flex gap-2">
            <Clock className="w-3.5 h-3.5 text-red-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-[12px] font-medium text-slate-700">First response overdue by 6 days</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Tue 17 Mar 2026, 02:51 pm</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Clock className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-[12px] font-medium text-slate-700">Resolution due in 17 hours</p>
              <div className="flex items-center gap-1 mt-0.5">
                <p className="text-[11px] text-slate-500">Tue 24 Mar 2026, 08:51 am</p>
                <div className="w-3 h-3 rounded-full bg-slate-100 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── PROPERTIES BLOCK ── */}
      <div className="p-5">
        <h4 className="text-[11px] font-bold text-slate-500 mb-5 tracking-wide">PROPERTIES</h4>
        
        <div className="space-y-4">
          {/* Tags */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] text-slate-500 font-medium">Tags</label>
            <div className="h-8 border border-slate-200 rounded-md bg-white w-full shadow-sm" />
          </div>

          {/* Type */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] text-slate-500 font-medium">Type</label>
            <button className="flex items-center justify-between h-8 px-3 border border-slate-200 rounded-md bg-white hover:bg-slate-50 shadow-sm w-full">
              <span className="text-[13px] text-slate-700">Question</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>

          {/* Status */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] text-slate-500 font-medium">Status <span className="text-red-500">*</span></label>
            <button className="flex items-center justify-between h-8 px-3 border border-slate-200 rounded-md bg-white hover:bg-slate-50 shadow-sm w-full">
              <span className="text-[13px] text-slate-700 capitalize">{ticket.status}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>

          {/* Priority */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] text-slate-500 font-medium">Priority</label>
            <button className="flex items-center justify-between h-8 px-3 border border-slate-200 rounded-md bg-white hover:bg-slate-50 shadow-sm w-full">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-[13px] text-slate-700 capitalize">{ticket.priority}</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>

          {/* Group */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] text-slate-500 font-medium">Group</label>
            <div className="h-8 border border-slate-200 rounded-md bg-slate-50/80 px-3 flex items-center shadow-sm w-full">
              <span className="text-[13px] text-slate-400">No groups found</span>
            </div>
          </div>

          {/* Agent */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] text-slate-500 font-medium">Agent</label>
            <button className="flex items-center justify-between h-8 px-3 border border-slate-200 rounded-md bg-white hover:bg-slate-50 shadow-sm w-full">
              <span className="text-[13px] text-slate-700">{ticket.assignedAgent?.name || "System"}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
            <button className="flex items-center gap-1.5 text-[12px] font-semibold text-[#137A87] hover:underline mt-0.5 self-start">
              <Plus className="w-3 h-3" />
              Add Agent
            </button>
          </div>

          {/* Product */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] text-slate-500 font-medium">Product</label>
            <button className="flex items-center justify-between h-8 px-3 border border-slate-200 rounded-md bg-white hover:bg-slate-50 shadow-sm w-full">
              <span className="text-[13px] text-slate-700">Example</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>

          {/* Reference Number */}
          <div className="flex flex-col gap-1.5 pb-2">
            <label className="text-[12px] text-slate-500 font-medium">Reference Number</label>
            <button className="flex items-center justify-end h-8 border-b border-white hover:bg-slate-50 w-full">
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}