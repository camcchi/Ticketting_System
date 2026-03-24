import { Ticket } from "../../types";
import { Button } from "../ui/button";
import { 
  Star, 
  Reply, 
  StickyNote, 
  Forward, 
  CheckCircle, 
  Info,
  MessageSquarePlus,
  Activity,
  ChevronLeft,
  ChevronRight,
  Minus,
  Settings
} from "lucide-react";

interface TicketHeaderProps {
  ticket: Ticket;
}

export function TicketHeader({ ticket }: TicketHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white w-full">
      {/* ── LEFT ACTIONS ── */}
      <div className="flex items-center gap-1.5">
        <Button variant="ghost" size="icon" className="w-8 h-8 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 flex-shrink-0">
          <Star className="w-4 h-4" />
        </Button>
        <div className="h-4 w-px bg-slate-200 mx-1" />
        <Button variant="ghost" className="h-8 px-3 rounded-md text-[13px] font-medium text-slate-600 hover:bg-slate-50 gap-2">
          <Reply className="w-4 h-4" />
          Reply
        </Button>
        <Button variant="ghost" className="h-8 px-3 rounded-md text-[13px] font-medium text-slate-600 hover:bg-slate-50 gap-2">
          <StickyNote className="w-4 h-4" />
          Note
        </Button>
        <Button variant="ghost" className="h-8 px-3 rounded-md text-[13px] font-medium text-slate-600 hover:bg-slate-50 gap-2">
          <Forward className="w-4 h-4" />
          Forward
        </Button>
        <Button variant="ghost" className="h-8 px-3 rounded-md text-[13px] font-medium text-slate-600 hover:bg-slate-50 gap-2">
          <CheckCircle className="w-4 h-4" />
          Close
        </Button>
        <div className="h-4 w-px bg-slate-200 mx-1" />
        <Button variant="ghost" size="icon" className="w-8 h-8 rounded-md text-[#137A87] hover:bg-[#e6f2f3] flex-shrink-0">
          <Info className="w-4 h-4" />
        </Button>
      </div>

      {/* ── RIGHT ACTIONS ── */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" className="h-8 px-3 rounded-md text-[13px] font-medium text-slate-600 hover:bg-slate-50 gap-2">
          Threads
          <MessageSquarePlus className="w-3.5 h-3.5" />
        </Button>
        <div className="h-4 w-px bg-slate-200" />
        <Button variant="ghost" className="h-8 px-3 rounded-md text-[13px] font-medium text-slate-600 hover:bg-slate-50 gap-2">
          <Activity className="w-4 h-4" />
          Activities
        </Button>
        <div className="h-4 w-px bg-slate-200" />
        <div className="flex items-center gap-0.5 bg-slate-50 rounded-md p-0.5 border border-slate-200">
          <Button variant="ghost" size="icon" className="w-6 h-6 rounded text-slate-500 hover:bg-white hover:text-slate-800">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="w-6 h-6 rounded text-slate-500 hover:bg-white hover:text-slate-800">
            <Minus className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="w-6 h-6 rounded text-slate-500 hover:bg-white hover:text-slate-800">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
        <div className="h-4 w-px bg-slate-200 ml-1 mr-1" />
        <Button variant="ghost" size="icon" className="w-8 h-8 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 flex-shrink-0">
          <Settings className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}