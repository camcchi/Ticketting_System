import { SortOptions, SortField, SortOrder } from "../../types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ListFilter, ChevronDown, Check } from "lucide-react";
import { cn } from "../ui/utils";

interface SortDropdownProps {
  sort: SortOptions;
  onSortChange: (sort: SortOptions) => void;
}

const sortFields: { label: string; value: SortField }[] = [
  { label: "Date created", value: "createdAt" },
  { label: "Due by time", value: "dueDate" },
  { label: "Last modified", value: "updatedAt" },
  { label: "Priority", value: "priority" },
  { label: "Status", value: "status" },
  { label: "Subject", value: "subject" },
];

export function SortDropdown({ sort, onSortChange }: SortDropdownProps) {
  const handleFieldChange = (field: SortField) => {
    onSortChange({ ...sort, field });
  };

  const handleOrderChange = (order: SortOrder) => {
    onSortChange({ ...sort, order });
  };

  const currentFieldLabel = sortFields.find((f) => f.value === sort.field)?.label || "Date created";

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-slate-500 whitespace-nowrap">Sort by:</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="h-9 px-4 gap-3 rounded-xl border-2 border-[#137A87]/60 hover:border-[#137A87] bg-white hover:bg-white text-slate-700 font-bold transition-all shadow-sm group"
          >
            {currentFieldLabel}
            <ChevronDown className="w-5 h-5 text-[#137A87] transition-transform group-data-[state=open]:rotate-180" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 p-1 rounded-xl shadow-2xl border-[#137A87]/10 bg-white">
          <div className="p-1 space-y-0.5">
            {sortFields.map((field) => (
              <DropdownMenuItem
                key={field.value}
                onClick={() => handleFieldChange(field.value)}
                className={cn(
                  "flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer outline-none transition-colors text-sm font-medium",
                  sort.field === field.value 
                    ? "bg-[#e0f2f1] text-[#137A87]" 
                    : "text-slate-600 hover:bg-[#f8fafa] hover:text-[#137A87]"
                )}
              >
                {field.label}
                {sort.field === field.value && <Check className="w-4 h-4" />}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator className="my-1.5 opacity-50" />
            <DropdownMenuCheckboxItem
              checked={sort.order === "asc"}
              onCheckedChange={() => handleOrderChange("asc")}
              className="px-3 py-2.5 rounded-lg cursor-pointer outline-none text-sm font-medium"
            >
              Ascending
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={sort.order === "desc"}
              onCheckedChange={() => handleOrderChange("desc")}
              className="px-3 py-2.5 rounded-lg cursor-pointer outline-none text-sm font-medium"
            >
              Descending
            </DropdownMenuCheckboxItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
