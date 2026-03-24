import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  X,
  ChevronDown,
  Bold,
  Italic,
  Underline,
  Link,
  List,
  AlignLeft,
  Image,
  Smile,
  Tag,
  User,
  Clock,
  FileText,
  Plus,
  ChevronRight,
} from "lucide-react";

interface CreateTicketModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const selectClass =
  "w-full text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#4CC9B5]/40 focus:border-[#4CC9B5] transition-all appearance-none cursor-pointer";

function SelectField({ label, required, options, defaultValue }: { label: string; required?: boolean; options: string[]; defaultValue?: string }) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-500 mb-1">
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      <div className="relative">
        <select className={selectClass} defaultValue={defaultValue ?? ""}>
          {!defaultValue && <option value="">-- Select --</option>}
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
      </div>
    </div>
  );
}

export function CreateTicketModal({ open, onOpenChange }: CreateTicketModalProps) {
  const [createAnother, setCreateAnother] = useState(false);
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [subject, setSubject] = useState("");
  const [contact, setContact] = useState("");
  const [refNumber, setRefNumber] = useState("");

  const handleCreate = () => {
    // In a real app, submit the ticket
    if (!createAnother) onOpenChange(false);
    else {
      setSubject("");
      setDescription("");
      setContact("");
      setRefNumber("");
      setTags("");
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 animate-in fade-in" />
        <Dialog.Content
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white sticky top-0 z-10">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#4CC9B5] flex items-center justify-center">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <Dialog.Title className="text-base font-semibold text-[#137A87]">
                  New Ticket
                </Dialog.Title>
              </div>
              <Dialog.Close className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors">
                <X className="w-4 h-4" />
              </Dialog.Close>
            </div>

            {/* Body */}
            <div className="flex flex-1 overflow-hidden">
              {/* Main Form */}
              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
                {/* Contact */}
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">
                    Contact <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search contact..."
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4CC9B5]/40 focus:border-[#4CC9B5] transition-all"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-xs text-[#4CC9B5]">
                      <button className="hover:underline flex items-center gap-0.5">
                        <Plus className="w-3 h-3" /> Add new contact
                      </button>
                      <span className="text-slate-300">|</span>
                      <button className="hover:underline">Add Cc</button>
                    </div>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">
                    Subject <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter ticket subject..."
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4CC9B5]/40 focus:border-[#4CC9B5] transition-all"
                  />
                </div>

                {/* Type */}
                <SelectField label="Type" options={["Question", "Incident", "Problem", "Feature Request"]} />

                {/* Source & Status side by side */}
                <div className="grid grid-cols-2 gap-4">
                  <SelectField label="Source" options={["Phone", "Email", "Chat", "Portal", "Twitter", "Facebook"]} defaultValue="Phone" />
                  <SelectField label="Status" required options={["Open", "Pending", "Resolved", "Closed"]} defaultValue="Open" />
                </div>

                {/* Priority & Group side by side */}
                <div className="grid grid-cols-2 gap-4">
                  <SelectField label="Priority" required options={["Low", "Medium", "High", "Urgent"]} defaultValue="Low" />
                  <SelectField label="Group" options={["Customer Support", "Technical", "Billing", "Loyalty Programs", "Vendor Management"]} />
                </div>

                {/* Agent & Product side by side */}
                <div className="grid grid-cols-2 gap-4">
                  <SelectField label="Agent" options={["Sarah Chen", "Michael Adams", "Emily Johnson", "James Turner"]} defaultValue="Sarah Chen" />
                  <SelectField label="Product" options={["Example", "Support Pro", "Enterprise Suite", "Starter"]} defaultValue="Example" />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">
                    Description <span className="text-red-400">*</span>
                  </label>
                  <div className="border border-slate-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#4CC9B5]/40 focus-within:border-[#4CC9B5] transition-all">
                    {/* Toolbar */}
                    <div className="flex items-center gap-0.5 px-2 py-1.5 border-b border-slate-100 bg-slate-50 flex-wrap">
                      {[Bold, Italic, Underline, Link, List, AlignLeft, Image, Smile].map((Icon, i) => (
                        <button
                          key={i}
                          type="button"
                          className="w-7 h-7 flex items-center justify-center rounded hover:bg-[#8ED1C9]/20 text-slate-500 hover:text-[#137A87] transition-colors"
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </button>
                      ))}
                      <div className="w-px h-4 bg-slate-200 mx-1" />
                      {["B", "I", "H1", "H2"].map((t) => (
                        <button
                          key={t}
                          type="button"
                          className="px-1.5 h-7 flex items-center justify-center rounded hover:bg-[#8ED1C9]/20 text-xs text-slate-500 hover:text-[#137A87] transition-colors font-medium"
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                    <textarea
                      rows={5}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe the ticket issue here..."
                      className="w-full text-sm px-3 py-2.5 resize-none focus:outline-none text-slate-700 placeholder:text-slate-300"
                    />
                    {/* Media toolbar */}
                    <div className="flex items-center gap-1 px-2 py-1.5 border-t border-slate-100 bg-slate-50">
                      {[Tag, Image, Link].map((Icon, i) => (
                        <button
                          key={i}
                          type="button"
                          className="w-6 h-6 flex items-center justify-center rounded hover:bg-[#8ED1C9]/20 text-slate-400 hover:text-[#137A87] transition-colors"
                        >
                          <Icon className="w-3 h-3" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Reference Number */}
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Reference Number</label>
                  <input
                    type="text"
                    placeholder="Optional reference number..."
                    value={refNumber}
                    onChange={(e) => setRefNumber(e.target.value)}
                    className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4CC9B5]/40 focus:border-[#4CC9B5] transition-all"
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Tags</label>
                  <input
                    type="text"
                    placeholder="Add tags separated by commas..."
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4CC9B5]/40 focus:border-[#4CC9B5] transition-all"
                  />
                </div>
              </div>

              {/* Right Sidebar Panel */}
              <div className="w-64 border-l border-slate-100 bg-slate-50 overflow-y-auto flex-shrink-0">
                {/* Ticket Templates */}
                <div className="p-4 border-b border-slate-100">
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="w-3.5 h-3.5 text-[#4CC9B5]" />
                    <span className="text-xs font-semibold text-[#137A87]">Ticket Templates</span>
                  </div>
                  <div className="relative">
                    <select className="w-full text-xs border border-slate-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#4CC9B5]/40 appearance-none text-slate-400">
                      <option>Pick a template</option>
                      <option>Billing Issue</option>
                      <option>Technical Support</option>
                      <option>Feature Request</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-300 pointer-events-none" />
                  </div>
                </div>

                {/* Contact Info */}
                <div className="p-4 border-b border-slate-100">
                  <div className="flex items-center gap-2 mb-3">
                    <User className="w-3.5 h-3.5 text-[#4CC9B5]" />
                    <span className="text-xs font-semibold text-[#137A87]">Contact Info</span>
                  </div>
                  <div className="flex flex-col items-center py-4 text-center">
                    <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center mb-2">
                      <User className="w-6 h-6 text-slate-400" />
                    </div>
                    <p className="text-xs text-slate-400">Pick a contact</p>
                    <p className="text-[10px] text-slate-300 mt-1">Contact info will appear here</p>
                  </div>
                </div>

                {/* Recent Timeline */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#4CC9B5]" />
                      <span className="text-xs font-semibold text-[#137A87]">Recent Timeline</span>
                    </div>
                    <ChevronRight className="w-3 h-3 text-slate-300" />
                  </div>
                  <p className="text-xs text-slate-400 italic">No conversations, it's pretty quiet here!</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-white sticky bottom-0">
              <label className="flex items-center gap-2 cursor-pointer select-none group">
                <div
                  onClick={() => setCreateAnother(!createAnother)}
                  className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                    createAnother ? "bg-[#4CC9B5] border-[#4CC9B5]" : "border-slate-300 group-hover:border-[#4CC9B5]"
                  }`}
                >
                  {createAnother && (
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="text-sm text-slate-500">Create another</span>
              </label>

              <div className="flex items-center gap-2">
                <Dialog.Close asChild>
                  <button className="px-4 py-2 text-sm text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                    Cancel
                  </button>
                </Dialog.Close>
                <button
                  onClick={handleCreate}
                  disabled={!subject || !contact}
                  className="px-5 py-2 text-sm font-semibold rounded-lg bg-[#137A87] hover:bg-[#0f6370] text-white shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
                >
                  Create
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
