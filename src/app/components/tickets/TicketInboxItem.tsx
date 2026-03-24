import { Ticket } from "../../types";
import { cn } from "../ui/utils";
import { formatDistanceToNow } from "date-fns";
import { MessageSquare, Clock, AlertCircle } from "lucide-react";

interface TicketInboxItemProps {
  ticket: Ticket;
  isSelected?: boolean;
  onClick: () => void;
}

export function TicketInboxItem({ ticket, isSelected, onClick }: TicketInboxItemProps) {
  const statusColors = {
    open: "bg-emerald-500",
    pending: "bg-amber-500",
    resolved: "bg-blue-500",
    closed: "bg-slate-500",
  };

  const priorityColors = {
    low: "text-slate-400",
    medium: "text-blue-500",
    high: "text-amber-500",
    urgent: "text-rose-500",
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "group flex items-center gap-4 px-4 py-3 border-b border-[#137A87]/5 cursor-pointer transition-all hover:bg-[#f0fafa]",
        isSelected ? "bg-[#e0f2f1] border-l-4 border-l-[#137A87]" : "bg-white border-l-4 border-l-transparent"
      )}
    >
      <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#137A87]" />
      
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#137A87]/10 flex items-center justify-center font-bold text-[#137A87] text-sm">
        {ticket.customer.name.split(' ').map(n => n[0]).join('')}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <span className="text-sm font-bold text-[#137A87] truncate">{ticket.customer.name}</span>
          <span className="text-[11px] text-slate-400 font-medium">
            {formatDistanceToNow(ticket.createdAt, { addSuffix: true })}
          </span>
        </div>
        <h3 className="text-sm font-semibold text-slate-700 truncate group-hover:text-[#137A87] transition-colors">
          {ticket.subject}
        </h3>
        <div className="flex items-center gap-3 mt-1">
          <span className="text-[11px] text-slate-400 font-mono">#{ticket.id}</span>
          <div className="flex items-center gap-1 text-[11px] text-slate-400">
            <MessageSquare className="w-3 h-3" />
            {ticket.messages.length}
          </div>
          {ticket.priority === 'urgent' && (
            <div className="flex items-center gap-1 text-[11px] text-rose-500 font-bold uppercase tracking-wider">
              <AlertCircle className="w-3 h-3" />
              Urgent
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <div className={cn(
          "px-2 py-0.5 rounded-full text-[10px] font-bold text-white uppercase tracking-wider shadow-sm",
          statusColors[ticket.status]
        )}>
          {ticket.status}
        </div>
        <div className={cn("text-[10px] font-bold uppercase tracking-wider", priorityColors[ticket.priority])}>
          {ticket.priority}
        </div>
      </div>
    </div>
  );
}
