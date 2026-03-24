import { useState } from "react";
import { ContactFilterOptions } from "../../types";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Filter, Search, Plus, HelpCircle, Star, LayoutGrid, ChevronDown, Ticket, Mail, MessageSquare, User, Building2, UserCheck } from "lucide-react";
import { Badge } from "../ui/badge";
import { ContactViewsPopover } from "./ContactViewsPopover";
import { NotificationsPopover } from "../tickets/NotificationsPopover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface ContactFiltersProps {
  filters: ContactFilterOptions;
  onFiltersChange: (filters: ContactFilterOptions) => void;
  totalContacts: number;
}

export function ContactFilters({ 
  filters, 
  onFiltersChange, 
  totalContacts 
}: ContactFiltersProps) {
  const [shortcutsEnabled, setShortcutsEnabled] = useState(true);

  return (
    <div className="flex items-center justify-between px-5 py-3 border-b border-[#137A87]/10 bg-white">
      {/* ── LEFT SECTION: VIEW & STAR ── */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="w-10 h-10 rounded-lg hover:bg-[#f0fafa] text-[#137A87]"
        >
          <Filter className="w-5 h-5" />
        </Button>

        <ContactViewsPopover />

        <div className="flex items-center gap-1.5 ml-1">
          <button className="text-slate-300 hover:text-yellow-400 transition-colors">
            <Star className="w-5 h-5" />
          </button>
          <Badge className="bg-[#137A87] text-white text-[11px] font-bold px-2 py-0.5 rounded-full border-none shadow-sm">
            {totalContacts}
          </Badge>
        </div>
      </div>

      {/* ── RIGHT SECTION: NEW, SEARCH, ICONS ── */}
      <div className="flex items-center gap-3">
        <div className="flex items-center bg-[#137A87] rounded-lg shadow-sm hover:bg-[#0f6370] transition-colors overflow-hidden mr-2">
          <button className="flex items-center gap-2 h-9 px-4 text-white text-sm font-bold border-r border-white/10 active:scale-95 transition-transform outline-none">
            <Plus className="w-4 h-4 stroke-[3px]" /> 
            New
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="h-9 px-2 text-white hover:bg-white/10 transition-colors active:scale-95 outline-none">
                <ChevronDown className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52 bg-white rounded-xl border border-[#137A87]/10 shadow-xl py-1.5 z-50">
              {[
                { label: "Ticket",  Icon: Ticket,        onClick: () => {} },
                { label: "Email",   Icon: Mail,          onClick: () => {} },
                { label: "Message", Icon: MessageSquare, onClick: () => {} },
                { label: "Contact", Icon: User,          onClick: () => {} },
                { label: "Company", Icon: Building2,     onClick: () => {} },
                { label: "Agent",   Icon: UserCheck,     onClick: () => {} },
              ].map(({ label, Icon, onClick }) => (
                <DropdownMenuItem
                  key={label}
                  onClick={onClick}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:text-[#137A87] hover:bg-[#f0fafa] cursor-pointer outline-none transition-colors select-none rounded-none"
                >
                  <Icon className="w-4 h-4 text-slate-400" />
                  {label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="h-8 w-[1px] bg-[#137A87]/10 mx-1" />

        <div className="relative group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[17px] h-[17px] text-slate-400 group-focus-within:text-[#137A87] transition-colors" />
          <Input
            placeholder="Search"
            value={filters.search || ""}
            onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
            className="pl-10 h-9 w-[280px] rounded-lg border-[#137A87]/15 focus-visible:ring-[#137A87]/20 bg-slate-50/50 hover:bg-white transition-all placeholder:text-slate-400 text-sm"
          />
        </div>

        <div className="flex items-center gap-1 ml-2">
          <NotificationsPopover />

          <Button variant="ghost" size="icon" className="w-9 h-9 hover:bg-[#f0fafa] rounded-lg group text-[#137A87]/70 group-hover:text-[#137A87]">
            <HelpCircle className="w-[21px] h-[21px]" />
          </Button>

          <Button variant="ghost" size="icon" className="w-9 h-9 hover:bg-[#f0fafa] rounded-lg group text-[#137A87]/70 group-hover:text-[#137A87]">
            <LayoutGrid className="w-[20px] h-[20px]" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center justify-center w-8 h-8 rounded-full bg-[#fde68a] text-[#137A87] font-bold text-xs ml-2 border-2 border-white outline-none focus:ring-2 focus:ring-[#4CC9B5] shadow-sm transition-shadow">
                M
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 p-0 shadow-lg border-[#137A87]/10 rounded-xl mt-2">
              <div className="p-4 bg-[#f8f9fb] rounded-t-xl border-b border-[#137A87]/5">
                <p className="font-semibold text-[#137A87] text-sm">Metziel Mutia</p>
                <p className="text-sm text-slate-500 mt-0.5 truncate">metzielmutia17@gmail.com</p>
              </div>
              <div className="p-2">
                <DropdownMenuSeparator className="bg-[#137A87]/5 my-1" />
                <DropdownMenuItem className="py-2.5 px-3 text-sm text-[#137A87] cursor-pointer focus:bg-[#f8f9fb]">Sign out</DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
