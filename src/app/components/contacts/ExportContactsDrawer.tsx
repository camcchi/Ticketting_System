import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetTrigger,
  SheetClose,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { ArrowUpCircle } from "lucide-react";

const exportFields = [
  "Full name", "Title",
  "Email", "Mobile phone",
  "Work phone", "Other phone numbers",
  "Company", "Address",
  "Time zone", "Language",
  "Tags", "About",
  "Unique external ID", "Social handle",
  "Can see all tickets from this company"
];

export function ExportContactsDrawer({ children }: { children: React.ReactNode }) {
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedFields(exportFields);
    } else {
      setSelectedFields([]);
    }
  };

  const toggleField = (field: string) => {
    setSelectedFields(prev => 
      prev.includes(field) 
        ? prev.filter(f => f !== field)
        : [...prev, field]
    );
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent side="right" className="w-[400px] sm:max-w-[450px] p-0 border-l border-slate-200 bg-white flex flex-col shadow-2xl">
        <SheetHeader className="px-6 py-5 border-b border-transparent">
          <SheetTitle className="flex items-center gap-2 text-[20px] font-semibold text-[#0B3A42]">
            <ArrowUpCircle className="w-[22px] h-[22px] text-slate-500 font-light" strokeWidth={1.5} />
            Export contacts
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-2">
          <div className="flex items-center gap-3 mb-6">
            <Checkbox 
              id="export-select-all" 
              className="rounded border-slate-300 w-[18px] h-[18px] data-[state=checked]:bg-[#137A87] data-[state=checked]:border-[#137A87]"
              checked={selectedFields.length === exportFields.length && exportFields.length > 0}
              onCheckedChange={handleSelectAll}
            />
            <label htmlFor="export-select-all" className="text-sm text-slate-700 cursor-pointer">
              Select all
            </label>
          </div>

          <div className="grid grid-cols-2 gap-y-5 gap-x-4">
            {exportFields.map(field => (
              <div key={field} className={`flex items-start gap-3 ${field === "Can see all tickets from this company" ? "col-span-2" : ""}`}>
                <Checkbox 
                  id={`export-field-${field}`}
                  className="rounded border-slate-300 w-[18px] h-[18px] mt-0.5 data-[state=checked]:bg-[#137A87] data-[state=checked]:border-[#137A87] flex-shrink-0"
                  checked={selectedFields.includes(field)}
                  onCheckedChange={() => toggleField(field)}
                />
                <label htmlFor={`export-field-${field}`} className="text-[13px] text-slate-700 leading-tight cursor-pointer cursor-pointer">
                  {field}
                </label>
              </div>
            ))}
          </div>
        </div>

        <SheetFooter className="px-6 py-4 border-t border-slate-200 bg-white flex flex-row items-center justify-end gap-3 mt-auto">
          <SheetClose asChild>
            <Button variant="outline" className="text-slate-700 border-slate-200 hover:bg-slate-50 font-semibold px-4">
              Cancel
            </Button>
          </SheetClose>
          <Button className="bg-[#137A87] hover:bg-[#0e5c66] text-white font-semibold px-5">
            Export
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
