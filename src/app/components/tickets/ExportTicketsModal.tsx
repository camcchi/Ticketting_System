import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "../ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Alert, AlertDescription } from "../ui/alert";
import { ScrollArea } from "../ui/scroll-area";
import { 
  Upload, 
  Info, 
  X, 
  ChevronDown, 
  Download,
  CheckCircle2
} from "lucide-react";

const TICKET_FIELDS = [
  "Ticket ID", "Subject", "Status", "Priority", "Source", "Source Info", 
  "Type", "Agent", "Group", "Created time", "Due by Time", "Resolved time", 
  "Closed time", "Last update time", "Initial response time", "Time tracked", 
  "First response time (in hrs)", "Resolution time (in hrs)", "Agent interactions", 
  "Customer interactions", "Resolution status", "First response status", 
  "Every response status", "Tags", "Survey results", "Skill", "Product", 
  "Summary", "Reference Number"
];

const CONTACT_FIELDS = [
  "Full name", "Email", "Work phone", "Mobile phone", "Facebook ID", 
  "Twitter ID", "Contact ID", "Time zone", "Language", "Tags", 
  "Title", "Unique External ID", "Other phone numbers", "Contact type"
];

const COMPANY_FIELDS = [
  "Company Name", "Company Domains", "Health score", "Account tier", 
  "Industry", "Renewal date"
];

export function ExportTicketsModal() {
  const [format, setFormat] = React.useState("excel");
  const [selectedTicketFields, setSelectedTicketFields] = React.useState<string[]>(["Ticket ID", "Subject", "Status"]);
  const [selectedContactFields, setSelectedContactFields] = React.useState<string[]>(["Full name", "Contact ID"]);
  const [selectedCompanyFields, setSelectedCompanyFields] = React.useState<string[]>([]);

  const toggleField = (field: string, type: 'ticket' | 'contact' | 'company') => {
    const setters = {
      ticket: [selectedTicketFields, setSelectedTicketFields],
      contact: [selectedContactFields, setSelectedContactFields],
      company: [selectedCompanyFields, setSelectedCompanyFields]
    } as const;

    const [selected, setSelected] = setters[type];
    if (selected.includes(field)) {
      setSelected(selected.filter(f => f !== field));
    } else {
      setSelected([...selected, field]);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 px-2.5 gap-2 text-slate-600 hover:text-[#137A87] hover:bg-[#f0fafa] text-xs font-bold">
          <Upload className="w-3.5 h-3.5 rotate-180" />
          Export
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] p-0 gap-0 overflow-hidden rounded-xl border-none shadow-2xl">
        <DialogHeader className="p-6 pb-4 flex flex-row items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center">
            <Upload className="w-5 h-5 text-slate-600 rotate-180" />
          </div>
          <DialogTitle className="text-xl font-bold text-slate-800">Export tickets</DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[80vh]">
          <div className="px-6 pb-6 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-8">
                <span className="text-sm font-medium text-slate-500 min-w-[80px]">Export as:</span>
                <RadioGroup defaultValue={format} onValueChange={setFormat} className="flex items-center gap-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="csv" id="csv" className="border-slate-300 text-[#137A87]" />
                    <Label htmlFor="csv" className="text-sm font-medium text-slate-700">CSV</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="excel" id="excel" className="border-slate-300 text-[#137A87]" />
                    <Label htmlFor="excel" className="text-sm font-medium text-slate-700">Excel</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex items-center gap-8">
                <span className="text-sm font-medium text-slate-500 min-w-[80px]">Filter tickets by:</span>
                <div className="flex items-center gap-3">
                  <Select defaultValue="created">
                    <SelectTrigger className="w-[140px] h-9 border-slate-200 rounded-lg text-sm">
                      <SelectValue placeholder="Select field" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="created">Created time</SelectItem>
                      <SelectItem value="resolved">Resolved time</SelectItem>
                      <SelectItem value="closed">Closed time</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="text-slate-300">|</span>
                  <Select defaultValue="7days">
                    <SelectTrigger className="w-[140px] h-9 border-slate-200 rounded-lg text-sm font-medium">
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="yesterday">From yesterday</SelectItem>
                      <SelectItem value="7days">Last 7 days</SelectItem>
                      <SelectItem value="30days">Last 30 days</SelectItem>
                      <SelectItem value="custom">Pick time range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Accordion type="multiple" defaultValue={["ticket"]} className="space-y-3">
              <AccordionItem value="ticket" className="border rounded-xl border-slate-100 overflow-hidden">
                <AccordionTrigger className="px-4 py-3 hover:no-underline bg-slate-50/50">
                  <div className="flex justify-between items-center w-full pr-4">
                    <span className="text-sm font-bold text-slate-700">Ticket fields</span>
                    <span className="text-[11px] font-medium text-slate-400">{selectedTicketFields.length} fields selected</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-4 pt-2">
                  <div className="flex items-center gap-3 mb-4">
                    <Checkbox id="select-all-ticket" />
                    <Label htmlFor="select-all-ticket" className="text-xs text-slate-400 font-medium cursor-pointer">Select all fields</Label>
                    <button className="text-xs text-[#0060df] hover:underline font-medium ml-2">Show multiline text fields</button>
                  </div>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                    {TICKET_FIELDS.map(field => (
                      <div key={field} className="flex items-center space-x-2.5">
                        <Checkbox 
                          id={`ticket-${field}`} 
                          checked={selectedTicketFields.includes(field)}
                          onCheckedChange={() => toggleField(field, 'ticket')}
                          className="border-slate-300 data-[state=checked]:bg-[#137A87] data-[state=checked]:border-[#137A87]"
                        />
                        <Label htmlFor={`ticket-${field}`} className="text-sm text-slate-600 font-medium cursor-pointer">{field}</Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="contact" className="border rounded-xl border-slate-100 overflow-hidden">
                <AccordionTrigger className="px-4 py-3 hover:no-underline bg-slate-50/50">
                  <div className="flex justify-between items-center w-full pr-4">
                    <span className="text-sm font-bold text-slate-700">Contact fields</span>
                    <span className="text-[11px] font-medium text-slate-400">{selectedContactFields.length} fields selected</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-4 pt-2">
                   <div className="flex items-center gap-3 mb-4">
                    <Checkbox id="select-all-contact" />
                    <Label htmlFor="select-all-contact" className="text-xs text-slate-400 font-medium cursor-pointer">Select all fields</Label>
                  </div>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                    {CONTACT_FIELDS.map(field => (
                      <div key={field} className="flex items-center space-x-2.5">
                        <Checkbox 
                          id={`contact-${field}`} 
                          checked={selectedContactFields.includes(field)}
                          onCheckedChange={() => toggleField(field, 'contact')}
                          className="border-slate-300 data-[state=checked]:bg-[#137A87] data-[state=checked]:border-[#137A87]"
                        />
                        <Label htmlFor={`contact-${field}`} className="text-sm text-slate-600 font-medium cursor-pointer">{field}</Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="company" className="border rounded-xl border-slate-100 overflow-hidden">
                <AccordionTrigger className="px-4 py-3 hover:no-underline bg-slate-50/50">
                  <div className="flex justify-between items-center w-full pr-4">
                    <span className="text-sm font-bold text-slate-700">Company fields</span>
                    <span className="text-[11px] font-medium text-slate-400">{selectedCompanyFields.length} fields selected</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-4 pt-2">
                   <div className="flex items-center gap-3 mb-4">
                    <Checkbox id="select-all-company" />
                    <Label htmlFor="select-all-company" className="text-xs text-slate-400 font-medium cursor-pointer">Select all fields</Label>
                  </div>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                    {COMPANY_FIELDS.map(field => (
                      <div key={field} className="flex items-center space-x-2.5">
                        <Checkbox 
                          id={`company-${field}`} 
                          checked={selectedCompanyFields.includes(field)}
                          onCheckedChange={() => toggleField(field, 'company')}
                          className="border-slate-300 data-[state=checked]:bg-[#137A87] data-[state=checked]:border-[#137A87]"
                        />
                        <Label htmlFor={`company-${field}`} className="text-sm text-slate-600 font-medium cursor-pointer">{field}</Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </ScrollArea>

        <DialogFooter className="p-6 border-t border-slate-100 bg-slate-50/30 gap-3">
          <DialogClose asChild>
            <Button variant="outline" className="h-10 px-6 rounded-lg text-slate-600 font-bold border-slate-200">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button className="h-10 px-8 rounded-lg bg-[#2D4E77] hover:bg-[#243f61] text-white font-bold shadow-md shadow-[#2D4E77]/10">Export</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
