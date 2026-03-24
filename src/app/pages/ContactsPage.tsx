import { useState, useMemo } from "react";
import { Contact, ContactFilterOptions } from "../types";
import { mockContacts as initialContacts } from "../data/mockData";
import { ContactFilters } from "../components/contacts/ContactFilters";
import { ContactList } from "../components/contacts/ContactList";
import { ContactSidebar } from "../components/contacts/ContactSidebar";
import { cn } from "../components/ui/utils";

export function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [filters, setFilters] = useState<ContactFilterOptions>({
    search: "",
  });
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filtered contacts
  const filteredContacts = useMemo(() => {
    if (!filters.search) return contacts;
    const search = filters.search.toLowerCase();
    return contacts.filter(
      (c) =>
        c.name.toLowerCase().includes(search) ||
        c.company.toLowerCase().includes(search) ||
        c.email.toLowerCase().includes(search)
    );
  }, [contacts, filters.search]);

  // Paginated contacts
  const paginatedContacts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredContacts.slice(start, start + itemsPerPage);
  }, [filteredContacts, currentPage, itemsPerPage]);

  const handleSelectContact = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      setSelectedIds(paginatedContacts.map((c) => c.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleDelete = () => {
    if (selectedIds.length === 0) return;
    setContacts((prev) => prev.filter((c) => !selectedIds.includes(c.id)));
    setSelectedIds([]);
  };

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">
      {/* ── PRIMARY ROW (TOP) ── */}
      <ContactFilters 
        filters={filters} 
        onFiltersChange={(f) => {
          setFilters(f);
          setCurrentPage(1); // Reset to page 1 on search
        }} 
        totalContacts={filteredContacts.length} 
      />

      <div className="flex-1 flex overflow-hidden relative">
        {/* ── MAIN CONTENT (SECONDARY ROW + TABLE) ── */}
        <div className="flex-1 flex flex-col min-w-0">
          <ContactList
            contacts={paginatedContacts}
            totalContacts={filteredContacts.length}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            selectedIds={selectedIds}
            onSelectContact={handleSelectContact}
            onSelectAll={handleSelectAll}
            onDelete={handleDelete}
            isSidebarOpen={isSidebarOpen}
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />
        </div>

        {/* ── RIGHT FILTERS SIDEBAR (Minimizable) ── */}
        <div className={cn(
          "transition-all duration-300 ease-in-out border-l border-slate-100",
          isSidebarOpen ? "w-[280px] opacity-100" : "w-0 opacity-0 overflow-hidden border-none"
        )}>
          <ContactSidebar />
        </div>
      </div>
    </div>
  );
}
