import { Ticket } from "../../types";
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
  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">
      {/* ── TOP ACTION BAR ── */}
      <div className="flex-shrink-0 border-b border-slate-200 shadow-xs z-20">
        <TicketHeader ticket={ticket} />
      </div>

      {/* ── 3-COLUMN MAIN LAYOUT ── */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Column 1: Main Conversation Area */}
        <div className="flex-1 flex flex-col overflow-hidden bg-white">
          <ScrollArea className="flex-1 h-full">
            <TicketConversation ticket={ticket} />
          </ScrollArea>
        </div>

        {/* Column 2: Ticket Properties */}
        <div className="w-[300px] flex-shrink-0 flex flex-col border-l border-slate-200 bg-[#f8fafb]/30 shadow-sm z-10">
          <ScrollArea className="flex-1 h-full">
            <TicketMetadata ticket={ticket} onUpdate={onUpdate} />
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

      </div>
    </div>
  );
}