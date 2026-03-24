import { Ticket } from "../../types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Sparkles, Info, Reply, StickyNote, Smile } from "lucide-react";
import { format } from "date-fns";
import { Button } from "../ui/button";

interface TicketConversationProps {
  ticket: Ticket;
}

export function TicketConversation({ ticket }: TicketConversationProps) {
  const firstMessage = ticket.messages[0];

  return (
    <div className="flex flex-col h-full bg-white">
      {/* ── HEADER AREA (Subject & Badges) ── */}
      <div className="px-6 py-5 border-b border-slate-100 flex items-start justify-between">
        <div>
          <h2 className="text-[20px] font-bold text-[#0B3A42] mb-3">{ticket.subject}</h2>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-red-50 text-red-600 border border-red-100 font-medium text-[11px] px-2 py-0.5 rounded-[4px] hover:bg-red-50">
              First response due
            </Badge>
            <Badge variant="secondary" className="bg-slate-50 text-slate-700 border border-slate-200 font-medium text-[11px] px-2 py-0.5 rounded-[4px] flex items-center gap-1 hover:bg-slate-50">
              <Smile className="w-3.5 h-3.5 text-orange-500" />
              Sentiment: Negative
              <Info className="w-3 h-3 text-slate-400 ml-0.5" />
            </Badge>
          </div>
        </div>

      </div>

      {/* ── MESSAGES FEED ── */}
      <div className="flex-1 px-6 py-4 space-y-6">
        <p className="text-[13px] text-slate-500 mb-2">
          Created by <span className="font-semibold text-[#137A87]">{ticket.assignedAgent?.name || "System"}</span>
        </p>

        {ticket.messages.map((message, index) => {
          const initials = message.sender.name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase();

          return (
            <div key={message.id} className="flex gap-4">
              <Avatar className="w-9 h-9 flex-shrink-0 border border-slate-200 shadow-sm mt-0.5">
                <AvatarFallback className="text-xs font-semibold bg-slate-50 text-slate-600">
                  {initials}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold text-[14px] text-[#0B3A42]">
                    {message.sender.name}
                  </span>
                  <span className="text-[13px] text-slate-500">
                    reported via email - 6 days ago ({format(message.timestamp, "EEE, d MMM yyyy 'at' HH:mm a")})
                  </span>
                </div>

                <div className="text-[14px] text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {message.content}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── REPLY BOX ── */}
      <div className="p-6 bg-white border-t border-slate-100 flex gap-4">
        <Avatar className="w-9 h-9 flex-shrink-0 border border-[#137A87]/30 shadow-sm bg-[#e6f2f3]">
          <AvatarFallback className="text-xs font-semibold text-[#137A87] bg-transparent">
            M
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 border border-slate-200 rounded-lg shadow-sm overflow-hidden flex flex-col focus-within:ring-1 focus-within:ring-[#137A87] focus-within:border-[#137A87] transition-all">
          <div className="flex bg-slate-50 border-b border-slate-200 p-1 gap-1">
            <Button variant="ghost" size="sm" className="h-7 px-3 text-xs font-bold text-[#137A87] bg-[#e6f2f3] hover:bg-[#d0e9eb] gap-1.5 rounded">
              <Reply className="w-3.5 h-3.5" />
              Reply
            </Button>
            <Button variant="ghost" size="sm" className="h-7 px-3 text-xs font-medium text-slate-600 hover:bg-slate-200 gap-1.5 rounded">
              <StickyNote className="w-3.5 h-3.5" />
              Note
            </Button>
          </div>
          <textarea 
            className="w-full h-24 p-3 text-sm text-slate-700 outline-none resize-none placeholder:text-slate-400"
            placeholder="Type your response here..."
          />
        </div>
      </div>
    </div>
  );
}