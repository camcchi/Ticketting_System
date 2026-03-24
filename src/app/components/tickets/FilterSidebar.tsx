import { FilterOptions, TicketStatus, TicketPriority } from "../../types";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Filter, Search, X, Plus, Minus } from "lucide-react";
import { mockAgents } from "../../data/mockData";
import { ScrollArea } from "../ui/scroll-area";
import { Label } from "../ui/label";

interface FilterSidebarProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const statuses: TicketStatus[] = ['open', 'pending', 'resolved', 'closed'];
const priorities: TicketPriority[] = ['low', 'medium', 'high', 'urgent'];

export function FilterSidebar({ filters, onFiltersChange, open, onOpenChange }: FilterSidebarProps) {
  const handleClear = () => {
    onFiltersChange({});
    onOpenChange(false);
  };

  const updateFilter = (key: keyof FilterOptions, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[320px] sm:w-[400px] p-0 flex flex-col border-[#137A87]/10">
        <SheetHeader className="px-6 py-5 border-b border-[#137A87]/10 flex flex-row items-center justify-between space-y-0">
          <SheetTitle className="text-sm font-bold text-[#137A87] uppercase tracking-wider">
            Filters
          </SheetTitle>
          <button onClick={handleClear} className="text-xs text-[#137A87] hover:underline font-medium">
            Clear all
          </button>
        </SheetHeader>

        <ScrollArea className="flex-1">
          <div className="p-6 space-y-6">
            {/* Search Field */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                Search
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search fields"
                  value={filters.search || ""}
                  onChange={(e) => updateFilter("search", e.target.value)}
                  className="pl-10 h-10 rounded-lg border-[#137A87]/20 focus-visible:ring-[#137A87]/20"
                />
              </div>
            </div>

            {/* Agent Filter */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                Agents Include
              </Label>
              <Select
                onValueChange={(val) => updateFilter("agent", val === "all" ? undefined : [val])}
                value={filters.agent?.[0] || "all"}
              >
                <SelectTrigger className="h-10 rounded-lg border-[#137A87]/20">
                  <SelectValue placeholder="Any agent" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any agent</SelectItem>
                  {mockAgents.map((agent) => (
                    <SelectItem key={agent.id} value={agent.id}>
                      {agent.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Status Filter */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                Status Include
              </Label>
              <Select
                onValueChange={(val) => updateFilter("status", val === "all" ? undefined : [val])}
                value={filters.status?.[0] || "all"}
              >
                <SelectTrigger className="h-10 rounded-lg border-[#137A87]/20">
                  <SelectValue placeholder="Any status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any status</SelectItem>
                  {statuses.map((s) => (
                    <SelectItem key={s} value={s} className="capitalize">
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Priority Filter */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                Priorities Include
              </Label>
              <Select
                onValueChange={(val) => updateFilter("priority", val === "all" ? undefined : [val])}
                value={filters.priority?.[0] || "all"}
              >
                <SelectTrigger className="h-10 rounded-lg border-[#137A87]/20">
                  <SelectValue placeholder="Any priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any priority</SelectItem>
                  {priorities.map((p) => (
                    <SelectItem key={p} value={p} className="capitalize">
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Created Range */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                  Created
                </Label>
                <button className="text-red-500 hover:bg-red-50 p-1 rounded transition-colors">
                  <Minus className="w-4 h-4" />
                </button>
              </div>
              <Select defaultValue="30days">
                <SelectTrigger className="h-10 rounded-lg border-[#137A87]/20">
                  <SelectValue placeholder="Last 30 days" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">Last 24 hours</SelectItem>
                  <SelectItem value="7days">Last 7 days</SelectItem>
                  <SelectItem value="30days">Last 30 days</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <button className="flex items-center gap-2 text-xs font-semibold text-[#137A87] hover:bg-[#137A87]/5 p-2 rounded-lg transition-colors w-full">
              <Plus className="w-4 h-4" />
              Add filters
            </button>
          </div>
        </ScrollArea>

        <SheetFooter className="p-6 border-t border-[#137A87]/10 sm:flex-col gap-2">
          <Button 
            className="w-full bg-[#137A87] hover:bg-[#0f6370] text-white rounded-lg h-10 font-bold"
            onClick={() => onOpenChange(false)}
          >
            Apply
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
