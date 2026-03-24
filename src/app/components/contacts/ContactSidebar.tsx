import { Button } from "../ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "../ui/select";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";

export function ContactSidebar() {
  return (
    <div className="w-[280px] h-full border-l border-slate-100 bg-white flex flex-col">
      <div className="p-4 border-b border-slate-50">
        <h2 className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.1em]">Filters</h2>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-6">
        {/* Created */}
        <div className="space-y-2.5">
          <label className="text-[13px] font-semibold text-slate-700">Created</label>
          <Select defaultValue="any">
            <SelectTrigger className="h-10 rounded-lg border-slate-200 focus:ring-1 focus:ring-[#137A87]/20">
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="7days">Last 7 days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Time zone */}
        <div className="space-y-2.5">
          <label className="text-[13px] font-semibold text-slate-700">Time zone</label>
          <Select defaultValue="any">
            <SelectTrigger className="h-10 rounded-lg border-slate-200 focus:ring-1 focus:ring-[#137A87]/20">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="est">EST</SelectItem>
              <SelectItem value="pst">PST</SelectItem>
              <SelectItem value="utc">UTC</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tags */}
        <div className="space-y-2.5">
          <label className="text-[13px] font-semibold text-slate-700">Tags</label>
          <Select defaultValue="any">
            <SelectTrigger className="h-10 rounded-lg border-slate-200 focus:ring-1 focus:ring-[#137A87]/20">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="customer">Customer</SelectItem>
              <SelectItem value="partner">Partner</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Companies */}
        <div className="space-y-2.5">
          <label className="text-[13px] font-semibold text-slate-700">Companies</label>
          <Select defaultValue="any">
            <SelectTrigger className="h-10 rounded-lg border-slate-200 focus:ring-1 focus:ring-[#137A87]/20">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="freshworks">Freshworks</SelectItem>
              <SelectItem value="acme">Acme Inc</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Contact type */}
        <div className="space-y-2.5">
          <label className="text-[13px] font-semibold text-slate-700">Contact type</label>
          <Select defaultValue="any">
            <SelectTrigger className="h-10 rounded-lg border-slate-200 focus:ring-1 focus:ring-[#137A87]/20">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="contacts">Contacts</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex flex-wrap gap-1.5 mt-2">
            <Badge variant="secondary" className="bg-[#f0fafa] text-[#137A87] hover:bg-[#e0f5f5] border-none px-2 py-1 flex items-center gap-1">
              Contacts
              <X className="w-3 h-3 cursor-pointer" />
            </Badge>
          </div>
        </div>
      </div>

      <div className="p-4 bg-slate-50/50 mt-auto">
        <Button className="w-full bg-[#137A87] hover:bg-[#0f6370] text-white font-bold h-11 rounded-lg shadow-sm">
          Apply
        </Button>
      </div>
    </div>
  );
}
