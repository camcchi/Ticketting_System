import { useState } from "react";
import type { Ticket } from "../../types";
import { ScrollArea } from "../ui/scroll-area";
import { TicketHeader } from "./TicketHeader";
import { TicketConversation } from "./TicketConversation";
import { CustomerInfo } from "./CustomerInfo";
import { TicketMetadata } from "./TicketMetadata";

interface TicketDetailProps {
  ticket: Ticket;
  onUpdate?: (ticket: Ticket) => void;
}

export function TicketDetail({ ticket, onUpdate }: TicketDetailProps) {
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true);

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">
      {/* ── TOP ACTION BAR ── */}
      <div className="flex-shrink-0 border-b border-slate-200 shadow-xs z-20">
        <TicketHeader 
          ticket={ticket} 
          isRightPanelOpen={isRightPanelOpen}
          onToggleRightPanel={() => setIsRightPanelOpen(!isRightPanelOpen)}
        />
      </div>

      {/* ── 3-COLUMN MAIN LAYOUT ── */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Column 1: Main Conversation Area */}
        <div className="flex-1 flex flex-col overflow-hidden bg-white">
          <ScrollArea className="flex-1 h-full">
            <TicketConversation ticket={ticket} />
          </ScrollArea>
        </div>

        {isRightPanelOpen ? (
          <>
            {/* Column 2: Ticket Properties */}
            <div className="w-[300px] flex-shrink-0 flex flex-col border-l border-slate-200 bg-[#f8fafb]/30 shadow-sm z-10">
              <ScrollArea className="flex-1 h-full">
                <TicketMetadata ticket={ticket} onUpdate={onUpdate} onClose={() => setIsRightPanelOpen(false)} />
              </ScrollArea>
              
              <div className="p-4 border-t border-slate-200 bg-white">
                <button className="w-full bg-[#137A87] hover:bg-[#0e5c66] text-white font-medium py-1.5 rounded-md transition-colors text-[13px] shadow-sm">
                  Update
                </button>
              </div>
            </div>

            {/* Column 3: Contact Info & Apps */}
            <div className="w-[320px] flex-shrink-0 flex flex-col border-l border-slate-200 overflow-hidden bg-white">
              <CustomerInfo customer={ticket.customer} />
            </div>
          </>
        ) : (
          <div className="w-12 flex-shrink-0 flex flex-col items-center py-4 border-l border-slate-200 bg-[#f8fafb]/30 shadow-sm z-10">
            <button 
              onClick={() => setIsRightPanelOpen(true)}
              className="w-8 h-8 flex items-center justify-center rounded-md text-slate-400 hover:text-slate-600 hover:bg-white border border-transparent hover:border-slate-200 transition-colors"
              title="Expand Sidebar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M15 3v18"/><path d="m10 15 3-3-3-3"/></svg>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}