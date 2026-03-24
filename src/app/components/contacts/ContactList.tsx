import { Contact } from "../../types";
import { ContactTable } from "./ContactTable";
import { ImportContactsModal } from "./ImportContactsModal";
import { ExportContactsDrawer } from "./ExportContactsDrawer";
import { ScrollArea } from "../ui/scroll-area";
import { Upload, Download, RefreshCw, ChevronLeft, ChevronRight, PanelRightClose, PanelRightOpen, Search, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";

interface ContactListProps {
  contacts: Contact[];
  totalContacts: number;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  selectedIds: string[];
  onSelectContact: (id: string) => void;
  onSelectAll: (selected: boolean) => void;
  onDelete: () => void;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export function ContactList({ 
  contacts, 
  totalContacts,
  currentPage,
  itemsPerPage,
  onPageChange,
  selectedIds,
  onSelectContact,
  onSelectAll,
  onDelete,
  isSidebarOpen,
  onToggleSidebar
}: ContactListProps) {
  const totalPages = Math.ceil(totalContacts / itemsPerPage);
  const startRange = totalContacts > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const endRange = Math.min(currentPage * itemsPerPage, totalContacts);

  return (
    <div className="h-full flex flex-col bg-white">
      {/* ── SECONDARY TOOLBAR ── */}
      <div className="px-5 py-2 border-b border-slate-100 bg-white flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <Checkbox 
              checked={contacts.length > 0 && selectedIds.length === contacts.length} 
              onCheckedChange={(checked) => onSelectAll(!!checked)}
              className="rounded border-slate-300 data-[state=checked]:bg-[#137A87] data-[state=checked]:border-[#137A87]" 
            />
            <span className="text-sm font-semibold text-slate-600">Select all</span>
            
            {selectedIds.length > 0 && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onDelete}
                className="h-8 px-2.5 gap-2 text-red-500 border-red-100 hover:bg-red-50 hover:text-red-600 ml-2 animate-in fade-in slide-in-from-left-2 duration-200"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </Button>
            )}
            
            <div className="h-4 w-[1px] bg-slate-100 mx-1" />
          </div>

          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-[#137A87] transition-colors" />
            <Input 
              placeholder="Search all contacts" 
              className="pl-9 h-8 w-48 border-slate-200 focus-visible:ring-1 focus-visible:ring-[#137A87]/20 text-xs rounded-lg"
            />
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <ExportContactsDrawer>
            <Button variant="ghost" size="sm" className="h-8 px-2.5 gap-2 text-slate-600 hover:text-[#137A87] hover:bg-[#f0fafa] text-xs font-bold">
              <Upload className="w-3.5 h-3.5 rotate-180" />
              Export
            </Button>
          </ExportContactsDrawer>
          <ImportContactsModal>
            <Button variant="ghost" size="sm" className="h-8 px-2.5 gap-2 text-slate-600 hover:text-[#137A87] hover:bg-[#f0fafa] text-xs font-bold">
              <Download className="w-3.5 h-3.5" />
              Import
            </Button>
          </ImportContactsModal>
          <Button variant="ghost" size="sm" className="h-8 px-2.5 gap-2 text-slate-600 hover:text-[#137A87] hover:bg-[#f0fafa] text-xs font-bold">
            <RefreshCw className="w-3.5 h-3.5" />
            Sync
          </Button>
          
          <div className="h-4 w-[1px] bg-slate-100 mx-2" />

          {/* Top Pagination */}
          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-500 font-bold whitespace-nowrap">
              <span className="text-[#137A87]">{startRange} - {endRange}</span> of <span className="text-[#137A87]">{totalContacts}</span>
            </span>
            
            <div className="flex items-center gap-0.5">
              <Button
                variant="ghost"
                size="icon"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="w-7 h-7 rounded-md hover:bg-[#f0fafa] disabled:opacity-30"
              >
                <ChevronLeft className="w-4 h-4 text-[#137A87]" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => onPageChange(currentPage + 1)}
                className="w-7 h-7 rounded-md hover:bg-[#f0fafa] disabled:opacity-30"
              >
                <ChevronRight className="w-4 h-4 text-[#137A87]" />
              </Button>
            </div>
          </div>

          <div className="h-4 w-[1px] bg-slate-100 mx-2" />
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onToggleSidebar}
            className={`w-7 h-7 rounded-md hover:bg-[#f0fafa] transition-colors ${isSidebarOpen ? 'text-[#137A87]' : 'text-slate-400'}`}
          >
            {isSidebarOpen ? <PanelRightClose className="w-4 h-4" /> : <PanelRightOpen className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 bg-white">
        <ContactTable 
          contacts={contacts}
          selectedIds={selectedIds}
          onSelectContact={onSelectContact}
          onSelectAll={onSelectAll}
        />
      </ScrollArea>
    </div>
  );
}
