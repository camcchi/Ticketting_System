import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ChevronDown, Check, LayoutGrid, List, Table as TableIcon } from "lucide-react";
import { LayoutType } from "../../types";
import { cn } from "../ui/utils";

interface LayoutSelectorProps {
  layout: LayoutType;
  onLayoutChange: (layout: LayoutType) => void;
}

const layoutOptions: { value: LayoutType; label: string; icon: React.ElementType }[] = [
  { value: 'card', label: "Card", icon: LayoutGrid },
  { value: 'inbox', label: "Inbox", icon: List },
  { value: 'table', label: "Table", icon: TableIcon },
];

export function LayoutSelector({ layout, onLayoutChange }: LayoutSelectorProps) {
  const currentLabel = layoutOptions.find((o) => o.value === layout)?.label || "Card";

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-slate-500 whitespace-nowrap font-medium">Layout:</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="h-9 px-4 gap-3 rounded-xl border-2 border-[#137A87]/60 hover:border-[#137A87] bg-white hover:bg-white text-slate-700 font-bold transition-all shadow-sm group"
          >
            {currentLabel}
            <ChevronDown className="w-5 h-5 text-[#137A87] transition-transform group-data-[state=open]:rotate-180" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40 p-1 rounded-xl shadow-2xl border-[#137A87]/10 bg-white">
          <div className="p-1 space-y-0.5">
            {layoutOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => onLayoutChange(option.value)}
                className={cn(
                  "flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer outline-none transition-colors text-sm font-medium",
                  layout === option.value 
                    ? "bg-[#e0f2f1] text-[#137A87]" 
                    : "text-slate-600 hover:bg-[#f8fafa] hover:text-[#137A87]"
                )}
              >
                <div className="flex items-center gap-2">
                  <option.icon className="w-4 h-4" />
                  {option.label}
                </div>
                {layout === option.value && <Check className="w-4 h-4" />}
              </DropdownMenuItem>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
