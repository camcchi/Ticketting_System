import { Ticket } from "../../types";
import { cn } from "../ui/utils";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "../ui/table";
import { Checkbox } from "../ui/checkbox";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface TicketTableProps {
  tickets: Ticket[];
  selectedTicketId?: string;
  onSelectTicket: (ticketId: string) => void;
}

export function TicketTable({ tickets, selectedTicketId, onSelectTicket }: TicketTableProps) {
  const statusLabels: Record<string, string> = {
    open: "Open",
    pending: "Pending",
    resolved: "Resolved",
    closed: "Closed",
    waiting_on_customer: "Waiting on Customer",
    waiting_on_third_party: "Waiting on Third Party",
  };

  const priorityColors: Record<string, string> = {
    low: "bg-green-500",
    medium: "bg-blue-500",
    high: "bg-amber-500",
    urgent: "bg-red-500",
  };
  
  const priorityLabels: Record<string, string> = {
    low: "Low",
    medium: "Medium",
    high: "High",
    urgent: "Urgent",
  };

  const getSentimentIcon = (sentiment?: string) => {
    if (sentiment === 'negative') return "😡";
    if (sentiment === 'neutral') return "😐";
    if (sentiment === 'positive') return "🙂";
    return "";
  };

  const getSentimentLabel = (sentiment?: string) => {
    if (sentiment === 'negative') return "Negative";
    if (sentiment === 'neutral') return "Neutral";
    if (sentiment === 'positive') return "Positive";
    return "";
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-[#137A87]/10 overflow-hidden">
      <Table>
        <TableHeader className="bg-[#f8fafa]">
          <TableRow className="border-b border-[#137A87]/10 hover:bg-transparent">
            <TableHead className="w-[50px] py-4 px-4 text-center">
              <Checkbox className="rounded border-[#137A87]/30 data-[state=checked]:bg-[#137A87] data-[state=checked]:border-[#137A87]" />
            </TableHead>
            <TableHead className="font-bold text-slate-700 text-[11px] tracking-wide uppercase">Contact</TableHead>
            <TableHead className="font-bold text-slate-700 text-[11px] tracking-wide uppercase cursor-pointer group hover:text-[#137A87] transition-colors">
              <div className="flex items-center gap-1">Subject <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#137A87] transition-colors" /></div>
            </TableHead>
            <TableHead className="font-bold text-slate-700 text-[11px] tracking-wide uppercase cursor-pointer group hover:text-[#137A87] transition-colors whitespace-nowrap">
              <div className="flex items-center gap-1">Initial Sentiment <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#137A87] transition-colors" /></div>
            </TableHead>
            <TableHead className="font-bold text-slate-700 text-[11px] tracking-wide uppercase cursor-pointer group hover:text-[#137A87] transition-colors whitespace-nowrap">
              <div className="flex items-center gap-1">Current Sentiment <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#137A87] transition-colors" /></div>
            </TableHead>
            <TableHead className="font-bold text-slate-700 text-[11px] tracking-wide uppercase">State</TableHead>
            <TableHead className="font-bold text-slate-700 text-[11px] tracking-wide uppercase">Group</TableHead>
            <TableHead className="font-bold text-slate-700 text-[11px] tracking-wide uppercase">Agent</TableHead>
            <TableHead className="font-bold text-slate-700 text-[11px] tracking-wide uppercase cursor-pointer group hover:text-[#137A87] transition-colors">
              <div className="flex items-center gap-1">Priority <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#137A87] transition-colors" /></div>
            </TableHead>
            <TableHead className="font-bold text-slate-700 text-[11px] tracking-wide uppercase cursor-pointer group hover:text-[#137A87] transition-colors">
              <div className="flex items-center gap-1">Status <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#137A87] transition-colors" /></div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets.map((ticket) => (
            <TableRow
              key={ticket.id}
              onClick={() => onSelectTicket(ticket.id)}
              className={cn(
                "cursor-pointer transition-colors border-b border-[#137A87]/5",
                ticket.id === selectedTicketId ? "bg-[#e0f2f1] hover:bg-[#b2dfdb]/50" : "hover:bg-[#f8fafa]"
              )}
            >
              <TableCell className="px-4 py-3 align-middle text-center w-[50px]">
                <Checkbox className="rounded border-slate-300 data-[state=checked]:bg-[#137A87] data-[state=checked]:border-[#137A87]" />
              </TableCell>
              <TableCell className="py-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 border border-slate-200">
                    <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(ticket.customer.name)}&background=random&color=fff`} alt={ticket.customer.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-xs font-medium text-[#137A87] whitespace-nowrap">{ticket.customer.name}</span>
                </div>
              </TableCell>
              <TableCell className="py-3">
                <div className="flex flex-col">
                  <span className="font-medium text-[#137A87] text-xs max-w-[200px] truncate">{ticket.subject} <span className="text-[11px] text-slate-400">#{ticket.id.split('-')[1]}</span></span>
                </div>
              </TableCell>
              <TableCell className="py-3">
                <div className="flex items-center gap-1.5 text-xs text-slate-700 font-medium">
                  <span className="text-base leading-none">{getSentimentIcon(ticket.initialSentiment)}</span> {getSentimentLabel(ticket.initialSentiment)}
                </div>
              </TableCell>
              <TableCell className="py-3">
                <div className="flex items-center gap-1.5 text-xs text-slate-700 font-medium">
                  <span className="text-base leading-none">{getSentimentIcon(ticket.currentSentiment)}</span> {getSentimentLabel(ticket.currentSentiment)}
                </div>
              </TableCell>
              <TableCell className="py-3">
                {ticket.state ? (
                  <span className={cn(
                    "px-2 py-0.5 rounded text-[10px] font-semibold border shadow-sm whitespace-nowrap",
                    ticket.state === 'First response due' ? "bg-red-50 text-red-600 border-red-100" : "bg-red-100 text-red-700 border-red-200"
                  )}>
                    {ticket.state}
                  </span>
                ) : null}
              </TableCell>
              <TableCell className="py-3">
                <div className="flex items-center gap-1 group/group">
                  <span className="text-xs text-slate-500 font-medium">{ticket.group || "--"}</span>
                  <ChevronDown className="w-3 h-3 text-slate-300 group-hover/group:text-slate-500 transition-colors cursor-pointer" />
                </div>
              </TableCell>
              <TableCell className="py-3">
                {ticket.assignedAgent ? (
                  <div className="flex items-center gap-1 group/agent">
                    <span className="text-xs text-slate-600 font-medium whitespace-nowrap">{ticket.assignedAgent.name}</span>
                    <ChevronDown className="w-3 h-3 text-slate-300 group-hover/agent:text-slate-500 transition-colors cursor-pointer" />
                  </div>
                ) : (
                  <span className="text-xs text-slate-400 italic">Unassigned</span>
                )}
              </TableCell>
              <TableCell className="py-3">
                <div className="flex items-center gap-1 group/priority cursor-pointer w-[80px]">
                  <div className={cn("w-2 h-2 rounded-sm", priorityColors[ticket.priority])} />
                  <span className="text-xs text-slate-600 font-medium ml-1 whitespace-nowrap">{priorityLabels[ticket.priority]}</span>
                  <ChevronDown className="w-3 h-3 text-slate-300 group-hover/priority:text-slate-500 transition-colors ml-auto" />
                </div>
              </TableCell>
              <TableCell className="py-3" onClick={(e) => e.stopPropagation()}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex items-center justify-between w-[90px] group/status cursor-pointer">
                      <span className="text-xs text-slate-600 font-medium">{statusLabels[ticket.status]}</span>
                      <ChevronDown className="w-3 h-3 text-slate-300 group-hover/status:text-slate-500 transition-colors" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-52 bg-white rounded-xl shadow-xl py-1 z-50 border border-slate-200">
                    {[
                      { key: "open", label: "Open" },
                      { key: "pending", label: "Pending" },
                      { key: "resolved", label: "Resolved" },
                      { key: "closed", label: "Closed" },
                      { key: "waiting_on_customer", label: "Waiting on Customer" },
                      { key: "waiting_on_third_party", label: "Waiting on Third Party" },
                    ].map((status) => (
                      <DropdownMenuItem
                        key={status.key}
                        onClick={() => {}}
                        className={cn(
                          "px-4 py-2.5 text-[13px] text-slate-600 hover:bg-[#f0fafa] hover:text-[#137A87] cursor-pointer outline-none transition-colors select-none rounded-none w-full text-left",
                          ticket.status === status.key && "bg-[#f0fafa] text-[#137A87] font-medium"
                        )}
                      >
                        {status.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
