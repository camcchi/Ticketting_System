import * as React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { 
  Search, 
  ChevronDown, 
  ChevronUp, 
  LayoutDashboard, 
  Inbox, 
  Clock, 
  Users, 
  AlertCircle, 
  Sparkles, 
  Send, 
  AtSign, 
  Eye, 
  Trash2, 
  AlertOctagon 
} from "lucide-react";
import { cn } from "../ui/utils";

interface ViewItem {
  label: string;
  icon: React.ElementType;
  active?: boolean;
}

const views: Record<string, ViewItem[]> = {
  Shared: [
    { label: "My Open and Pending Tickets", icon: Clock },
    { label: "My Overdue Tickets", icon: AlertCircle },
    { label: "Open Tickets in My Groups", icon: Users },
    { label: "Urgent and High priority Tickets", icon: AlertOctagon },
  ],
  Default: [
    { label: "All tickets", icon: LayoutDashboard, active: true },
    { label: "All undelivered messages", icon: Send },
    { label: "All unresolved tickets", icon: Inbox },
    { label: "New and my open tickets", icon: Sparkles },
    { label: "Tickets currently handled by SoppyAI Agent", icon: Sparkles },
    { label: "Tickets I raised", icon: AtSign },
    { label: "Tickets I'm mentioned in", icon: AtSign },
    { label: "Tickets I'm watching", icon: Eye },
    { label: "Spam", icon: AlertCircle },
    { label: "Trash", icon: Trash2 },
  ]
};

export function ViewsPopover() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const filteredViews = React.useMemo(() => {
    if (!search) return views;
    
    const filtered: Record<string, ViewItem[]> = {};
    Object.entries(views).forEach(([category, items]) => {
      const match = items.filter(item => 
        item.label.toLowerCase().includes(search.toLowerCase())
      );
      if (match.length > 0) {
        filtered[category] = match;
      }
    });
    return filtered;
  }, [search]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-white shadow-sm hover:border-[#137A87]/30 transition-all group">
          <span className="text-sm font-bold text-[#137A87]">All tickets</span>
          <ChevronDown className={cn("w-4 h-4 text-slate-400 group-hover:text-[#137A87] transition-transform", isOpen && "rotate-180")} />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[300px] p-0 rounded-xl shadow-2xl border-[#137A87]/10 overflow-hidden bg-white">
        <div className="p-3 border-b border-[#137A87]/10 bg-slate-50/50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Search for a view" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 rounded-lg border-[#137A87]/20 focus-visible:ring-[#137A87]/20 bg-white"
            />
          </div>
        </div>
        <ScrollArea className="h-[450px]">
          <div className="p-2 space-y-4">
            {Object.entries(filteredViews).map(([category, items]) => (
              <div key={category} className="space-y-1">
                <div className="px-3 py-1.5 flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                  {category}
                  <ChevronUp className="w-3.5 h-3.5" />
                </div>
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
                      <Icon className={cn("w-4 h-4 text-left", item.active ? "text-[#137A87]" : "text-slate-400")} />
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
