import { Ticket, LayoutType, SortOptions } from "../../types";
import { TicketCard } from "./TicketCard";
import { TicketInboxItem } from "./TicketInboxItem";
import { TicketTable } from "./TicketTable";
import { ScrollArea } from "../ui/scroll-area";
import { ListFilter, Upload, ChevronLeft, ChevronRight } from "lucide-react";
import { ExportTicketsModal } from "./ExportTicketsModal";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { SortDropdown } from "./SortDropdown";
import { LayoutSelector } from "./LayoutSelector";

interface TicketListProps {
  tickets: Ticket[];
  totalTickets: number;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  layout: LayoutType;
  onLayoutChange: (layout: LayoutType) => void;
  sort: SortOptions;
  onSortChange: (sort: SortOptions) => void;
  selectedTicketId?: string;
  onSelectTicket: (ticketId: string) => void;
  onExport?: () => void;
}

export function TicketList({ 
  tickets, 
  totalTickets,
  currentPage,
  itemsPerPage,
  onPageChange,
  layout,
  onLayoutChange,
  sort,
  onSortChange,
  selectedTicketId, 
  onSelectTicket,
  onExport
}: TicketListProps) {
  const totalPages = Math.ceil(totalTickets / itemsPerPage);
  
  const startRange = (currentPage - 1) * itemsPerPage + 1;
  const endRange = Math.min(currentPage * itemsPerPage, totalTickets);

  return (
    <div className="h-full flex flex-col bg-white">
      {/* ── SECONDARY TOOLBAR ── */}
      <div className="px-5 py-2.5 border-b border-[#137A87]/10 bg-white flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <Checkbox className="rounded border-[#137A87]/30 data-[state=checked]:bg-[#137A87] data-[state=checked]:border-[#137A87]" />
            <div className="h-4 w-[1px] bg-[#137A87]/10 mx-1" />
          </div>
          
          <SortDropdown sort={sort} onSortChange={onSortChange} />
        </div>

        <div className="flex items-center gap-4">
          <LayoutSelector layout={layout} onLayoutChange={onLayoutChange} />

          <div className="flex-shrink-0">
            <ExportTicketsModal />
          </div>

          <div className="h-6 w-[1px] bg-[#137A87]/10 mx-1" />

          {/* Top Pagination */}
          <div className="flex items-center gap-4 ml-1">
            <span className="text-sm text-slate-500 font-medium whitespace-nowrap">
              <span className="text-[#137A87] font-bold">{startRange} - {endRange}</span> of <span className="text-[#137A87] font-bold">{totalTickets}</span>
            </span>
            
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="w-8 h-8 rounded-md hover:bg-[#f0fafa] disabled:opacity-30"
              >
                <ChevronLeft className="w-5 h-5 text-[#137A87]" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="w-8 h-8 rounded-md hover:bg-[#f0fafa] disabled:opacity-30"
              >
                <ChevronRight className="w-5 h-5 text-[#137A87]" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 bg-[#f8fafb]">
        <div className="p-4">
          {layout === 'card' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tickets.map((ticket) => (
                <TicketCard
                  key={ticket.id}
                  ticket={ticket}
                  isSelected={ticket.id === selectedTicketId}
                  onClick={() => onSelectTicket(ticket.id)}
                />
              ))}
            </div>
          )}

          {layout === 'inbox' && (
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-[#137A87]/10 overflow-hidden divide-y divide-[#137A87]/5">
              {tickets.map((ticket) => (
                <TicketInboxItem
                  key={ticket.id}
                  ticket={ticket}
                  isSelected={ticket.id === selectedTicketId}
                  onClick={() => onSelectTicket(ticket.id)}
                />
              ))}
            </div>
          )}

          {layout === 'table' && (
            <TicketTable
              tickets={tickets}
              selectedTicketId={selectedTicketId}
              onSelectTicket={onSelectTicket}
            />
          )}
        </div>
        
        {tickets.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <ListFilter className="w-12 h-12 mb-4 opacity-10" />
            <p className="text-sm">No tickets found matching your filters</p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}