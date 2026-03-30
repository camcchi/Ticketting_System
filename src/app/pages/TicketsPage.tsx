import { useState, useMemo } from "react";
import { useParams } from "react-router";
import { mockTickets } from "../data/mockData";
import { FilterOptions, SortOptions, Ticket, LayoutType } from "../types";
import { TicketList } from "../components/tickets/TicketList";
import { TicketDetail } from "../components/tickets/TicketDetail";
import { TicketFilters } from "../components/tickets/TicketFilters";
import { CreateTicketModal } from "../components/tickets/CreateTicketModal";
import { CreateEmailModal } from "../components/tickets/CreateEmailModal";
import { CreateMessageModal } from "../components/tickets/CreateMessageModal";
import { CreateContactModal } from "../components/tickets/CreateContactModal";
import { AddCompanyModal } from "../components/companies/AddCompanyModal";
import { InviteAgentsModal } from "../components/agents/InviteAgentsModal";
import { ArrowLeft } from "lucide-react";

export function TicketsPage() {
  const { ticketId } = useParams();
  const [selectedTicketId, setSelectedTicketId] = useState<string | undefined>(
    ticketId ?? undefined
  );
  
  // Sort and Filter State
  const [filters, setFilters] = useState<FilterOptions>({});
  const [sort, setSort] = useState<SortOptions>({ field: 'createdAt', order: 'desc' });
  const [layout, setLayout] = useState<LayoutType>('card');
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const showCreateTicket = false; // Simplified for now as modal was already handled
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
  const [isInviteAgentsModalOpen, setIsInviteAgentsModalOpen] = useState(false);

  // ── FILTERING & SORTING LOGIC ──
  const processedTickets = useMemo(() => {
    let result = [...mockTickets];

    // Filter
    result = result.filter((ticket) => {
      if (filters.search) {
        const search = filters.search.toLowerCase();
        if (!ticket.subject.toLowerCase().includes(search) && 
            !ticket.id.toLowerCase().includes(search)) return false;
      }
      if (filters.status && filters.status.length > 0) {
        if (!filters.status.includes(ticket.status)) return false;
      }
      if (filters.priority && filters.priority.length > 0) {
        if (!filters.priority.includes(ticket.priority)) return false;
      }
      if (filters.agent && filters.agent.length > 0) {
        if (!ticket.assignedAgent || !filters.agent.includes(ticket.assignedAgent.id)) {
          return false;
        }
      }
      return true;
    });

    // Sort
    result.sort((a, b) => {
      const field = sort.field;
      const order = sort.order === 'asc' ? 1 : -1;

      if (field === 'createdAt' || field === 'dueDate' || field === 'updatedAt') {
        const valA = a[field]?.getTime() || 0;
        const valB = b[field]?.getTime() || 0;
        return (valA - valB) * order;
      }
      
      const valA = String(a[field as keyof Ticket] || "");
      const valB = String(b[field as keyof Ticket] || "");
      return valA.localeCompare(valB) * order;
    });

    return result;
  }, [filters, sort]);

  // ── PAGINATION LOGIC ──
  const paginatedTickets = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return processedTickets.slice(startIndex, startIndex + itemsPerPage);
  }, [processedTickets, currentPage, itemsPerPage]);

  const selectedTicket = mockTickets.find((t) => t.id === selectedTicketId);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="h-full flex flex-col bg-[#f8fafb]">
      <CreateTicketModal open={isModalOpen} onOpenChange={setIsModalOpen} />
      <CreateEmailModal open={isEmailModalOpen} onOpenChange={setIsEmailModalOpen} />
      <CreateMessageModal open={isMessageModalOpen} onOpenChange={setIsMessageModalOpen} />
      <CreateContactModal open={isContactModalOpen} onOpenChange={setIsContactModalOpen} />
      <AddCompanyModal open={isCompanyModalOpen} onOpenChange={setIsCompanyModalOpen} />
      <InviteAgentsModal open={isInviteAgentsModalOpen} onOpenChange={setIsInviteAgentsModalOpen} />

      {/* Primary Top Row Header */}
      <TicketFilters
        filters={filters}
        onFiltersChange={(f) => { setFilters(f); setCurrentPage(1); }}
        totalTickets={processedTickets.length}
        onNewTicket={() => setIsModalOpen(true)}
        onNewEmail={() => setIsEmailModalOpen(true)}
        onNewMessage={() => setIsMessageModalOpen(true)}
        onNewContact={() => setIsContactModalOpen(true)}
        onNewCompany={() => setIsCompanyModalOpen(true)}
        onInviteAgents={() => setIsInviteAgentsModalOpen(true)}
      />

      {/* ── DETAIL VIEW: ticket is selected ── */}
      {selectedTicket ? (
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-2.5 bg-white border-b border-[#137A87]/10 shadow-sm">
            <button
              onClick={() => setSelectedTicketId(undefined)}
              className="flex items-center gap-1.5 text-sm text-[#137A87] hover:text-[#4CC9B5] font-bold transition-colors"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.5px]" />
              Back to All Tickets
            </button>
            <span className="text-slate-300 text-sm font-light">|</span>
            <span className="text-sm text-slate-500 truncate font-medium">{selectedTicket.subject}</span>
          </div>

          <div className="flex-1 overflow-hidden">
            <TicketDetail ticket={selectedTicket} />
          </div>
        </div>
      ) : (
        /* ── LIST VIEW: no ticket selected — full width ── */
        <div className="flex-1 overflow-hidden flex flex-col">
          <TicketList
            tickets={paginatedTickets}
            totalTickets={processedTickets.length}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            layout={layout}
            onLayoutChange={setLayout}
            sort={sort}
            onSortChange={setSort}
            selectedTicketId={selectedTicketId}
            onSelectTicket={setSelectedTicketId}
            onExport={() => console.log('Exporting...')}
          />
        </div>
      )}
    </div>
  );
}
