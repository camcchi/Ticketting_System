import { useState, useMemo } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, Search } from "lucide-react";

interface AddCompanyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const labelClass = "block text-[13px] font-semibold text-slate-700 mb-2";
const inputClass =
  "w-full text-[13px] border border-slate-300 rounded-md px-3 py-2 bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#2D4E77]/30 focus:border-[#2D4E77] transition-all placeholder:text-slate-400";
const textareaClass =
  "w-full text-[13px] border border-slate-300 rounded-md px-3 py-2 bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#2D4E77]/30 focus:border-[#2D4E77] transition-all placeholder:text-slate-400 resize-y min-h-[60px]";
const selectClass =
  "w-full text-[13px] border border-slate-300 rounded-md px-3 py-2 bg-white text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#2D4E77]/30 focus:border-[#2D4E77] transition-all appearance-none cursor-pointer";

const ALL_FIELDS = [
  { id: "description",  label: "Description" },
  { id: "notes",        label: "Notes" },
  { id: "domains",      label: "Domains for this company" },
  { id: "healthScore",  label: "Health Score" },
  { id: "accountTier",  label: "Account Tier" },
  { id: "renewalDate",  label: "Renewal Date" },
  { id: "industry",     label: "Industry" },
];

// Fields shown in Quick-add mode
const QUICK_FIELD_IDS = ["description", "domains"];

export function AddCompanyModal({ open, onOpenChange }: AddCompanyModalProps) {
  const [companyName, setCompanyName] = useState("");
  const [mode, setMode] = useState<"quick" | "all">("all");
  const [fieldSearch, setFieldSearch] = useState("");

  // Field state
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");
  const [domains, setDomains] = useState("");
  const [healthScore, setHealthScore] = useState("");
  const [accountTier, setAccountTier] = useState("");
  const [renewalDate, setRenewalDate] = useState("");
  const [industry, setIndustry] = useState("");

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setCompanyName("");
      setMode("all");
      setFieldSearch("");
      setDescription("");
      setNotes("");
      setDomains("");
      setHealthScore("");
      setAccountTier("");
      setRenewalDate("");
      setIndustry("");
    }, 300);
  };

  const visibleFields = useMemo(() => {
    const base = mode === "quick" ? ALL_FIELDS.filter(f => QUICK_FIELD_IDS.includes(f.id)) : ALL_FIELDS;
    if (!fieldSearch.trim()) return base;
    return base.filter(f => f.label.toLowerCase().includes(fieldSearch.toLowerCase()));
  }, [mode, fieldSearch]);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 animate-in fade-in" />
        <Dialog.Content
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <div className="relative w-full max-w-[480px] bg-white rounded-xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
            {/* ── Header ── */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-transparent">
              <Dialog.Title className="text-[22px] font-bold text-[#0B2545]">
                Add Company
              </Dialog.Title>
            </div>

            {/* ── Body ── */}
            <div className="flex-1 overflow-y-auto px-8 pb-8 space-y-6">
              {/* Company Name */}
              <div className="relative pt-2">
                <div className="absolute left-[-16px] top-[14px] w-[1px] h-12 border-l border-dashed border-slate-300" />
                <label className={labelClass}>
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter a Company Name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full text-[16px] border-[2px] border-slate-800 rounded-md px-4 py-2 bg-white text-slate-800 focus:outline-none shadow-sm font-medium"
                  autoFocus
                />
              </div>

              {/* ── Field Mode Toggle ── */}
              <div className="flex items-center gap-4 pt-1">
                <div className="flex items-center gap-1 bg-[#EBEEF5] rounded-full p-1 w-fit">
                  <button
                    type="button"
                    onClick={() => setMode("quick")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-semibold transition-all ${
                      mode === "quick"
                        ? "bg-white text-[#2D4E77] shadow-sm"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border-[1.5px] flex items-center justify-center ${
                      mode === "quick" ? "border-[#2D4E77]" : "border-slate-400"
                    }`}>
                      {mode === "quick" && <div className="w-2 h-2 rounded-full bg-[#3B82F6]" />}
                    </div>
                    Quick-add fields
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode("all")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-semibold transition-all ${
                      mode === "all"
                        ? "bg-white text-[#2D4E77] shadow-sm"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border-[1.5px] flex items-center justify-center ${
                      mode === "all" ? "border-[#2D4E77]" : "border-slate-400"
                    }`}>
                      {mode === "all" && <div className="w-2 h-2 rounded-full bg-[#3B82F6]" />}
                    </div>
                    All fields
                  </button>
                </div>
                <div className="h-[2px] flex-1 bg-slate-200" />
              </div>

              {/* ── Field Search ── */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search for a field"
                  value={fieldSearch}
                  onChange={(e) => setFieldSearch(e.target.value)}
                  className="w-full text-[13px] border border-slate-300 rounded px-10 py-2 bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#2D4E77]/30 transition-all placeholder:text-slate-400"
                />
              </div>

              {/* ── Dynamic Fields ── */}
              {visibleFields.length === 0 && (
                <p className="text-[13px] text-slate-400 text-center py-4">No fields match your search.</p>
              )}

              {visibleFields.map((field) => (
                <div key={field.id}>
                  <label className={labelClass}>{field.label}</label>

                  {field.id === "description" && (
                    <textarea
                      placeholder="Enter some text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className={textareaClass}
                    />
                  )}

                  {field.id === "notes" && (
                    <textarea
                      placeholder="Enter some text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className={textareaClass}
                    />
                  )}

                  {field.id === "domains" && (
                    <div className="relative">
                      <select
                        value={domains}
                        onChange={(e) => setDomains(e.target.value)}
                        className={selectClass}
                      >
                        <option value="">Your choice</option>
                        <option value="dtitsc.com">dtitsc.com</option>
                        <option value="xceler8.com">xceler8.com</option>
                      </select>
                      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                    </div>
                  )}

                  {field.id === "healthScore" && (
                    <div className="relative">
                      <select
                        value={healthScore}
                        onChange={(e) => setHealthScore(e.target.value)}
                        className={selectClass}
                      >
                        <option value="">Your choice</option>
                        <option value="at_risk">At Risk</option>
                        <option value="neutral">Neutral</option>
                        <option value="healthy">Healthy</option>
                      </select>
                      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                    </div>
                  )}

                  {field.id === "accountTier" && (
                    <div className="relative">
                      <select
                        value={accountTier}
                        onChange={(e) => setAccountTier(e.target.value)}
                        className={selectClass}
                      >
                        <option value="">Your choice</option>
                        <option value="basic">Basic</option>
                        <option value="standard">Standard</option>
                        <option value="premium">Premium</option>
                        <option value="enterprise">Enterprise</option>
                      </select>
                      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                    </div>
                  )}

                  {field.id === "renewalDate" && (
                    <div className="relative">
                      <input
                        type="date"
                        value={renewalDate}
                        onChange={(e) => setRenewalDate(e.target.value)}
                        className={`${inputClass} text-slate-500`}
                      />
                    </div>
                  )}

                  {field.id === "industry" && (
                    <div className="relative">
                      <select
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        className={selectClass}
                      >
                        <option value="">Your choice</option>
                        <option value="technology">Technology</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="finance">Finance</option>
                        <option value="education">Education</option>
                        <option value="retail">Retail</option>
                        <option value="manufacturing">Manufacturing</option>
                        <option value="consulting">Consulting</option>
                        <option value="other">Other</option>
                      </select>
                      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* ── Footer ── */}
            <div className="flex items-center justify-end gap-3 px-8 py-5 border-t border-slate-100 bg-white">
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-2.5 text-sm font-medium rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors h-11"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!companyName.trim()}
                className="px-8 py-2.5 text-sm font-semibold rounded-md bg-[#2D4E77] hover:bg-[#243f61] disabled:opacity-50 disabled:cursor-not-allowed text-white transition-colors shadow-sm h-11 flex items-center justify-center"
              >
                Create company
              </button>
            </div>

          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
