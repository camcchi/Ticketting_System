import { useState } from "react";
import { 
  Search, 
  Download, 
  Upload, 
  RefreshCw, 
  ChevronLeft, 
  ChevronRight, 
  MoreVertical,
  Building2,
  Filter
} from "lucide-react";
import { Checkbox } from "../components/ui/checkbox";
import { Button } from "../components/ui/button";
import { cn } from "../components/ui/utils";
import { Input } from "../components/ui/input";
import { mockCompanies } from "../data/mockData";

export function CompaniesPage() {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(mockCompanies.map(c => c.id));
    } else {
      setSelectedIds([]);
    }
  };

  const toggleSelect = (id: number) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div className="h-full flex bg-white overflow-hidden">
      {/* ── Main Content Area ── */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* ── Top Bar ── */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-slate-200 bg-white shadow-sm z-10">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Checkbox 
                id="select-all" 
                className="rounded border-slate-300 data-[state=checked]:bg-[#137A87] data-[state=checked]:border-[#137A87]"
                checked={selectedIds.length === mockCompanies.length}
                onCheckedChange={handleSelectAll}
              />
              <label htmlFor="select-all" className="text-sm font-medium text-slate-700 cursor-pointer select-none">Select all</label>
            </div>
            <div className="h-4 w-[1px] bg-slate-200" />
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#137A87] transition-colors" />
              <Input
                placeholder="Search all companies"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 w-[280px] rounded-lg border-slate-200 focus-visible:ring-[#137A87]/20 hover:border-slate-300 transition-all placeholder:text-slate-400 text-sm shadow-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="h-8 gap-1.5 text-slate-600 border-slate-200 hover:bg-slate-50 transition-colors shadow-sm rounded-lg font-medium text-xs">
              <Upload className="w-3.5 h-3.5" /> Export
            </Button>
            <Button variant="outline" size="sm" className="h-8 gap-1.5 text-slate-600 border-slate-200 hover:bg-slate-50 transition-colors shadow-sm rounded-lg font-medium text-xs">
              <Download className="w-3.5 h-3.5" /> Import
            </Button>

            
            <div className="h-4 w-[1px] bg-slate-200 mx-1" />
            
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">1 - 5 of 5</span>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="icon" className="w-7 h-7 rounded bg-white text-slate-400 opacity-50 cursor-not-allowed border-slate-200 shadow-sm" disabled>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="w-7 h-7 rounded bg-white text-slate-400 opacity-50 cursor-not-allowed border-slate-200 shadow-sm" disabled>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <Button variant="outline" size="icon" className="w-8 h-8 rounded-lg ml-1 text-slate-500 border-slate-200 hover:bg-slate-50 shadow-sm">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* ── Table Header ── */}
        <div className="flex items-center px-6 py-3 border-b border-slate-200 bg-[#f8fafa] text-[11px] font-bold text-slate-600 uppercase tracking-wide">
          <div className="w-[40px]" /> {/* Checkbox spacer */}
          <div className="flex-1 min-w-[300px]">Company</div>
          <div className="w-[200px]">Contacts</div>
          <div className="w-[50px]" /> {/* Menu spacer */}
        </div>

        {/* ── Table Body ── */}
        <div className="flex-1 overflow-y-auto">
          {mockCompanies.map((company) => (
            <div 
              key={company.id}
              className="flex items-center px-6 py-3 border-b border-slate-100 hover:bg-[#f8fafa] transition-colors group cursor-pointer"
            >
              <div className="w-[40px] flex items-center">
                <Checkbox 
                  className="rounded border-slate-300 data-[state=checked]:bg-[#137A87] data-[state=checked]:border-[#137A87]"
                  checked={selectedIds.includes(company.id)}
                  onCheckedChange={() => toggleSelect(company.id)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              <div className="flex-1 min-w-[300px] flex items-center gap-3">
                <div className={cn("w-7 h-7 rounded-sm flex items-center justify-center border", "bg-[#e2f5f2] border-[#b0e2da] text-[#137A87]")}>
                  <Building2 className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-semibold text-[#137A87] hover:underline">{company.name}</span>
              </div>
              <div className="w-[200px] flex items-center">
                <span className="text-xs font-semibold text-[#137A87] hover:underline">{company.contacts}</span>
              </div>
              <div className="w-[50px] flex justify-end">
                <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-slate-600 hover:bg-slate-200">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right Sidebar (Filters) ── */}
      <div className="w-[280px] border-l border-slate-200 bg-[#f8fafa] flex flex-col flex-shrink-0 z-10 shadow-sm relative">
        <div className="p-5 border-b border-slate-200 bg-white font-bold text-xs uppercase tracking-wide text-slate-700">
          Filters
        </div>
        
        <div className="flex-1 p-5 overflow-y-auto">
          <div className="space-y-1.5 focus-within:text-[#137A87] transition-colors">
            <label className="text-xs font-semibold text-slate-500">Created</label>
            <div className="relative">
              <select className="w-full h-9 pl-3 pr-8 text-sm text-slate-700 bg-white border border-slate-200 rounded-lg appearance-none outline-none focus:ring-2 focus:ring-[#137A87]/20 focus:border-[#137A87]/50 transition-all shadow-sm cursor-pointer">
                <option value="any">Any time</option>
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="this-month">This month</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>
        </div>

        {/* Apply Button Container */}
        <div className="p-4 border-t border-slate-200 bg-white mt-auto">
          <Button className="w-full bg-[#8fbfff] hover:bg-[#7aaeff] text-white font-semibold rounded-lg shadow-sm h-10 transition-colors">
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
}
