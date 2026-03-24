import * as React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { 
  Search, 
  ChevronDown, 
  LayoutDashboard, 
  Users, 
  UserPlus,
  Building2,
  Trash2, 
  CheckCircle2
} from "lucide-react";
import { cn } from "../ui/utils";

interface ViewItem {
  label: string;
  icon: React.ElementType;
  active?: boolean;
}

const views: Record<string, ViewItem[]> = {
  Default: [
    { label: "All contacts", icon: Users, active: true },
    { label: "New contacts", icon: UserPlus },
    { label: "Recently viewed", icon: LayoutDashboard },
    { label: "All Companies", icon: Building2 },
    { label: "Verified contacts", icon: CheckCircle2 },
    { label: "Trash", icon: Trash2 },
  ]
};

export function ContactViewsPopover() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-white shadow-sm hover:border-[#137A87]/30 transition-all group">
          <span className="text-sm font-bold text-[#137A87]">All contacts</span>
          <ChevronDown className={cn("w-4 h-4 text-slate-400 group-hover:text-[#137A87] transition-transform", isOpen && "rotate-180")} />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[280px] p-0 rounded-xl shadow-2xl border-[#137A87]/10 overflow-hidden bg-white mt-1">
        <div className="p-3 border-b border-[#137A87]/10 bg-slate-50/50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Search for a view" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 rounded-lg border-[#137A87]/20 focus-visible:ring-[#137A87]/20 bg-white text-sm"
            />
          </div>
        </div>
        <ScrollArea className="h-[300px]">
          <div className="p-2 space-y-1">
            {Object.entries(views).map(([category, items]) => (
              <div key={category} className="space-y-1">
                {items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.label}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all text-left",
                        item.active 
                          ? "bg-[#f0fafa] text-[#137A87] font-bold shadow-sm" 
                          : "text-slate-600 hover:bg-slate-50 hover:text-[#137A87]"
                      )}
                    >
                      <Icon className={cn("w-4 h-4", item.active ? "text-[#137A87]" : "text-slate-400")} />
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
