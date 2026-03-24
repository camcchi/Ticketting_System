import * as React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { Button } from "../ui/button";
import { Bell } from "lucide-react";
import { Badge } from "../ui/badge";

export function NotificationsPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative w-9 h-9 hover:bg-[#f0fafa] rounded-lg group">
          <Bell className="w-[20px] h-[20px] text-[#137A87]/70 group-hover:text-[#137A87]" />
          <Badge className="absolute top-1.5 right-1.5 w-[7px] h-[7px] p-0 bg-red-500 border-none rounded-full ring-2 ring-white" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0 rounded-xl shadow-2xl border-[#137A87]/10 overflow-hidden bg-white mt-2">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#137A87]/10 bg-slate-50/50">
          <h3 className="text-sm font-bold text-[#137A87]">Notifications</h3>
          <button className="text-xs font-bold text-[#137A87] hover:text-[#0e5c66] transition-colors">
            Settings
          </button>
        </div>
        <div className="flex flex-col items-center justify-center py-12 px-6">
          <p className="text-sm text-slate-400 font-medium italic">
            No new notifications.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
