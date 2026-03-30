import { useState, useRef, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, ChevronDown, Plus, Trash2, Settings } from "lucide-react";

interface CreateContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const fieldClass =
  "w-full text-[13px] border border-slate-300 rounded-md px-3 py-[7px] bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#137A87]/30 focus:border-[#137A87] transition-all placeholder:text-slate-400";

export function CreateContactModal({ open, onOpenChange }: CreateContactModalProps) {
  const [contactEmail, setContactEmail] = useState("");
  const [mobilePhone, setMobilePhone] = useState("");
  const [workPhone, setWorkPhone] = useState("");
  const [uniqueExternalId, setUniqueExternalId] = useState("");
  const [socialHandle, setSocialHandle] = useState("");
  const [socialPlatform, setSocialPlatform] = useState("Facebook");
  const [socialDropdownOpen, setSocialDropdownOpen] = useState(false);
  const socialDropdownRef = useRef<HTMLDivElement>(null);

  const socialPlatforms = ["Facebook", "Instagram", "X (Twitter)"];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (socialDropdownRef.current && !socialDropdownRef.current.contains(e.target as Node)) {
        setSocialDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setContactEmail("");
      setMobilePhone("");
      setWorkPhone("");
      setUniqueExternalId("");
      setSocialHandle("");
      setSocialPlatform("Facebook");
      setSocialDropdownOpen(false);
    }, 300);
  };

  const PlatformIcon = ({ platform, size = "sm" }: { platform: string; size?: "sm" | "md" }) => {
    const cls = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";
    if (platform === "Facebook")
      return (
        <svg className={`${cls} text-[#1877F2]`} viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
    if (platform === "Instagram")
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="url(#ig-contact)" strokeWidth="2">
          <defs>
            <linearGradient id="ig-contact" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f09433" />
              <stop offset="50%" stopColor="#dc2743" />
              <stop offset="100%" stopColor="#bc1888" />
            </linearGradient>
          </defs>
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.5" fill="#cc2366" stroke="none" />
        </svg>
      );
    return (
      <svg className={`${cls} text-slate-800`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.736-8.844L2.25 2.25h6.849l4.259 5.631L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
      </svg>
    );
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 animate-in fade-in" />
        <Dialog.Content
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <div className="relative w-full max-w-[420px] bg-white rounded-lg shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <Dialog.Title className="text-[15px] font-semibold text-slate-800">
                Add Contact
              </Dialog.Title>
              <Dialog.Close
                onClick={handleClose}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </Dialog.Close>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
              {/* Email */}
              <div>
                <label className="block text-[12px] font-medium text-slate-600 mb-1.5">Email</label>
                <div className="flex items-center gap-1.5">
                  <div className="relative flex-1">
                    <input
                      type="email"
                      placeholder="Enter an email address"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className={`${fieldClass} pr-8`}
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#137A87] transition-colors">
                      <Settings className="w-[14px] h-[14px]" />
                    </button>
                  </div>
                  <button className="p-1.5 border border-slate-200 rounded-md text-slate-400 hover:text-red-500 hover:border-red-200 transition-colors">
                    <Trash2 className="w-[14px] h-[14px]" />
                  </button>
                </div>
                <button className="mt-2 flex items-center gap-1 text-[12px] text-[#137A87] hover:text-[#0f6370] font-medium transition-colors">
                  <Plus className="w-3.5 h-3.5" />
                  Add email
                </button>
              </div>

              {/* Mobile Phone */}
              <div>
                <label className="block text-[12px] font-medium text-slate-600 mb-1.5">Mobile Phone</label>
                <input
                  type="tel"
                  placeholder="Enter a Mobile Phone"
                  value={mobilePhone}
                  onChange={(e) => setMobilePhone(e.target.value)}
                  className={fieldClass}
                />
              </div>

              {/* Work Phone */}
              <div>
                <label className="block text-[12px] font-medium text-slate-600 mb-1.5">Work Phone</label>
                <input
                  type="tel"
                  placeholder="Enter a Work Phone"
                  value={workPhone}
                  onChange={(e) => setWorkPhone(e.target.value)}
                  className={fieldClass}
                />
              </div>

              {/* Unique External ID */}
              <div>
                <label className="block text-[12px] font-medium text-slate-600 mb-1.5">Unique External ID</label>
                <input
                  type="text"
                  placeholder="Enter a Unique External ID"
                  value={uniqueExternalId}
                  onChange={(e) => setUniqueExternalId(e.target.value)}
                  className={fieldClass}
                />
              </div>

              {/* Social Handle */}
              <div>
                <label className="block text-[12px] font-medium text-slate-600 mb-1.5">Social Handle</label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    placeholder="ID goes here"
                    value={socialHandle}
                    onChange={(e) => setSocialHandle(e.target.value)}
                    className="flex-1 text-[13px] border border-slate-300 rounded-md px-3 py-[7px] bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#137A87]/30 focus:border-[#137A87] transition-all placeholder:text-slate-400"
                  />

                  {/* Platform dropdown */}
                  <div className="relative" ref={socialDropdownRef}>
                    <button
                      type="button"
                      onClick={() => setSocialDropdownOpen(!socialDropdownOpen)}
                      className="flex items-center gap-1.5 border border-slate-300 rounded-md px-2.5 py-[7px] bg-white text-[13px] text-slate-700 hover:border-[#137A87] focus:outline-none transition-all whitespace-nowrap"
                    >
                      <PlatformIcon platform={socialPlatform} size="sm" />
                      <span>{socialPlatform}</span>
                      <ChevronDown className="w-3 h-3 text-slate-500" />
                    </button>

                    {socialDropdownOpen && (
                      <div className="absolute right-0 top-[calc(100%+4px)] w-[160px] bg-white border border-slate-200 rounded-lg shadow-lg z-50 overflow-hidden">
                        {socialPlatforms.map((p) => (
                          <button
                            key={p}
                            type="button"
                            onClick={() => { setSocialPlatform(p); setSocialDropdownOpen(false); }}
                            className="w-full flex items-center gap-2.5 px-3 py-2.5 text-[13px] text-slate-700 hover:bg-slate-50 transition-colors"
                          >
                            <PlatformIcon platform={p} size="md" />
                            <span className="flex-1 text-left">{p}</span>
                            {socialPlatform === p && (
                              <svg className="w-3.5 h-3.5 text-[#137A87]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <button className="p-1.5 border border-slate-200 rounded-md text-slate-400 hover:text-red-500 hover:border-red-200 transition-colors">
                    <Trash2 className="w-[14px] h-[14px]" />
                  </button>
                </div>
                <button className="mt-2 flex items-center gap-1 text-[12px] text-[#137A87] hover:text-[#0f6370] font-medium transition-colors">
                  <Plus className="w-3.5 h-3.5" />
                  Add new ID
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-slate-200 bg-white">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-[13px] font-medium rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 text-[13px] font-semibold rounded-md bg-[#2D4E77] hover:bg-[#243f61] text-white transition-colors"
              >
                Create contact
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
