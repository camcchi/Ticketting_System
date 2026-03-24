import { useState } from "react";
import { Search, Bell, HelpCircle } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface TopbarProps {
  hideSearch?: boolean;
  hideIcons?: boolean;
}

export function Topbar({ hideSearch, hideIcons }: TopbarProps) {
  const [shortcutsEnabled, setShortcutsEnabled] = useState(true);

  return (
    <header className="h-16 border-b border-[#137A87]/10 bg-white flex items-center px-8 gap-6 shadow-sm">
      <div className="flex-1 max-w-2xl">
        {!hideSearch && (
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#137A87]/40" />
            <Input
              type="search"
              placeholder="Search tickets, customers, or keywords..."
              className="pl-11 h-10 bg-[#f8f9fb] border-[#137A87]/10 focus:bg-white focus:border-[#4CC9B5] focus:ring-2 focus:ring-[#4CC9B5]/20 rounded-lg"
            />
          </div>
        )}
      </div>

      {!hideIcons && (
        <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative hover:bg-[#f8f9fb] rounded-lg">
          <Bell className="w-5 h-5 text-[#137A87]" />
          <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-[#4CC9B5] text-white text-xs border-2 border-white">
            3
          </Badge>
        </Button>

        <Button variant="ghost" size="icon" className="hover:bg-[#f8f9fb] rounded-lg">
          <HelpCircle className="w-5 h-5 text-[#137A87]" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center justify-center w-8 h-8 rounded-full bg-[#fde68a] text-[#137A87] font-medium text-sm ml-4 border-2 border-white outline-none focus:ring-2 focus:ring-[#4CC9B5] shadow-sm transition-shadow">
              M
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 p-0 shadow-lg border-[#137A87]/10 rounded-xl mt-2">
            <div className="p-4 bg-[#f8f9fb] rounded-t-xl border-b border-[#137A87]/5">
              <p className="font-semibold text-[#137A87] text-sm">Metziel Mutia</p>
              <p className="text-sm text-slate-500 mt-0.5 truncate">metzielmutia17@gmail.com</p>
            </div>
            
            <div className="p-2">
              <div className="flex items-center justify-between px-2 py-2.5">
                <div>
                  <p className="text-sm text-[#137A87]">Keyboard shortcuts</p>
                  <p className="text-xs text-slate-400 mt-0.5">press <span className="font-bold text-slate-600">?</span> to view <span className="text-[#137A87] hover:underline cursor-pointer">shortcuts</span></p>
                </div>
                <button 
                  onClick={() => setShortcutsEnabled(!shortcutsEnabled)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${shortcutsEnabled ? 'bg-[#137A87]' : 'bg-slate-200'}`}
                >
                  <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${shortcutsEnabled ? 'translate-x-5' : 'translate-x-1'}`} />
                </button>
              </div>
              
              <DropdownMenuSeparator className="bg-[#137A87]/5 my-1" />
              
              <DropdownMenuItem className="py-2.5 px-3 text-sm text-[#137A87] cursor-pointer focus:bg-[#f8f9fb]">
                Profile settings
              </DropdownMenuItem>
              
              <DropdownMenuItem className="py-2.5 px-3 text-sm text-[#137A87] cursor-pointer focus:bg-[#f8f9fb]">
                Go to customer portal
              </DropdownMenuItem>
              
              <DropdownMenuItem className="py-2.5 px-3 text-sm text-[#137A87] cursor-pointer focus:bg-[#f8f9fb]">
                Schedule out of office
              </DropdownMenuItem>
              
              <DropdownMenuSeparator className="bg-[#137A87]/5 my-1" />
              
              <DropdownMenuItem className="py-2.5 px-3 text-sm text-[#137A87] cursor-pointer focus:bg-[#f8f9fb]">
                Sign out
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      )}
    </header>
  );
}