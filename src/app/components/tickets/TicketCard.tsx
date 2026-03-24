import { Ticket } from "../../types";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Clock, AlertCircle, MessageSquare } from "lucide-react";
import { cn } from "../ui/utils";
import { formatDistanceToNow } from "date-fns";

interface TicketCardProps {
  ticket: Ticket;
  isSelected: boolean;
  onClick: () => void;
}

const priorityColors = {
  low: "bg-slate-50 text-slate-700 border-slate-200",
  medium: "bg-[#8ED1C9]/10 text-[#4CC9B5] border-[#8ED1C9]/30",
  high: "bg-orange-50 text-orange-600 border-orange-200",
  urgent: "bg-red-50 text-red-600 border-red-200",
};

const statusColors = {
  open: "bg-[#4CC9B5]/10 text-[#4CC9B5] border-[#4CC9B5]/30",
  pending: "bg-amber-50 text-amber-600 border-amber-200",
  resolved: "bg-[#8ED1C9]/10 text-[#8ED1C9] border-[#8ED1C9]/30",
  closed: "bg-slate-50 text-slate-600 border-slate-200",
};

const slaColors = {
  'on-time': 'text-[#4CC9B5]',
  'warning': 'text-orange-600',
  'breached': 'text-red-600',
};

export function TicketCard({ ticket, isSelected, onClick }: TicketCardProps) {
  const initials = ticket.customer.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <div
      onClick={onClick}
      className={cn(
        "p-4 rounded-xl border cursor-pointer transition-all",
        isSelected 
          ? "bg-[#4CC9B5]/5 border-[#4CC9B5] shadow-md ring-2 ring-[#4CC9B5]/20" 
          : "bg-white border-[#137A87]/10 hover:border-[#137A87]/20 hover:shadow-md"
      )}
    >
      <div className="flex items-start gap-3">
        <Avatar className="w-10 h-10 ring-2 ring-white shadow-sm">
          <AvatarFallback className="bg-gradient-to-br from-[#4CC9B5] to-[#8ED1C9] text-white text-sm font-medium">
            {initials}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-[#137A87] truncate mb-0.5">
                {ticket.subject}
              </h3>
              <p className="text-sm text-slate-500 truncate">
                {ticket.customer.name}
              </p>
            </div>
            <span className="text-xs text-slate-400 font-medium whitespace-nowrap">
              {ticket.id}
            </span>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <Badge variant="outline" className={cn("text-xs font-medium", statusColors[ticket.status])}>
              {ticket.status}
            </Badge>
            <Badge variant="outline" className={cn("text-xs font-medium", priorityColors[ticket.priority])}>
              {ticket.priority}
            </Badge>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5" />
                {ticket.messages.length}
              </span>
              {ticket.assignedAgent && (
                <span className="truncate max-w-[100px] font-medium">
                  {ticket.assignedAgent.name.split(' ')[0]}
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-1.5">
              {ticket.slaStatus && ticket.slaStatus !== 'on-time' && (
                <AlertCircle className={cn("w-3.5 h-3.5", slaColors[ticket.slaStatus])} />
              )}
              <Clock className="w-3.5 h-3.5" />
              <span>{formatDistanceToNow(ticket.updatedAt, { addSuffix: true })}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}