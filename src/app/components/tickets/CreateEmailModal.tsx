import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, Bold, Italic, Underline, Strikethrough, Heading1, Heading2, Quote, List, ListOrdered, Link, Image, Code, Paperclip, User, ChevronUp, Search, Bell, HelpCircle } from "lucide-react";

interface CreateEmailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const inputClass = "w-full text-sm border border-slate-300 rounded-md px-3 py-2 bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-slate-400";
const selectClass = "w-full text-sm border border-slate-300 rounded-md px-3 py-2 bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M5%208l5%205%205-5%22%20fill%3D%22none%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_0.5rem_center] pr-10";
const labelClass = "block text-[13px] font-medium text-slate-700 mb-1.5";

export function CreateEmailModal({ open, onOpenChange }: CreateEmailModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sendAnother, setSendAnother] = useState(false);
  const [showCc, setShowCc] = useState(false);
  const [showBcc, setShowBcc] = useState(false);
  const [showMoreFields, setShowMoreFields] = useState(false);
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [showSearchPanel, setShowSearchPanel] = useState(false);

  const toggleContactInfo = () => {
    setShowContactInfo(!showContactInfo);
    if (!showContactInfo) setShowSearchPanel(false);
  };

  const toggleSearchPanel = () => {
    setShowSearchPanel(!showSearchPanel);
    if (!showSearchPanel) setShowContactInfo(false);
  };

  const handleSend = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onOpenChange(false);
    }, 800);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-50 animate-in fade-in" />
        <Dialog.Content
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <div className={`relative w-full ${showContactInfo || showSearchPanel ? 'max-w-[1150px]' : 'max-w-[850px]'} bg-slate-50 rounded-lg shadow-2xl flex max-h-[95vh] overflow-hidden transition-all duration-300 ease-in-out`}>
            
            {/* Main Email Form Area */}
            <div className="flex-1 flex flex-col overflow-hidden min-w-[600px]">
              {/* Header */}
              <div className="flex justify-between items-center px-6 py-4 bg-white border-b border-slate-200 shrink-0">
                <Dialog.Title className="text-lg font-semibold text-slate-800">
                  Send an email
                </Dialog.Title>
                <Dialog.Close className="text-slate-400 hover:text-slate-600 transition-colors">
                  <X className="w-5 h-5" />
                </Dialog.Close>
              </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-10 py-8 bg-white">
              <p className="text-[13px] text-slate-500 mb-6">
                When you hit send, the contact will receive an email and a ticket will be associated with them. <a href="#" className="text-blue-600 hover:underline">Learn more</a>
              </p>

              <div className="space-y-6">
                {/* From Field */}
                <div>
                  <label className={labelClass}>
                    From
                  </label>
                  <select className={selectClass} defaultValue="abc">
                    <option value="abc">abc (support@dtitsc.freshdesk.com)</option>
                  </select>
                </div>

                {/* To Field */}
                <div>
                  <div className="flex justify-between items-end mb-1.5">
                    <label className="block text-[13px] font-medium text-slate-700">
                      To <span className="text-red-500">*</span>
                    </label>
                    <div className="text-[13px] text-blue-600">
                      {!showCc && (
                        <button type="button" onClick={() => setShowCc(true)} className="hover:underline">Add Cc</button>
                      )}
                      {!showCc && !showBcc && (
                        <span className="mx-2 text-slate-300">|</span>
                      )}
                      {!showBcc && (
                        <button type="button" onClick={() => setShowBcc(true)} className="hover:underline">Add Bcc</button>
                      )}
                    </div>
                  </div>
                  <input
                    type="text"
                    className={inputClass}
                    required
                  />
                </div>

                {/* Cc Field */}
                {showCc && (
                  <div>
                    <label className={labelClass}>
                      Cc
                    </label>
                    <select className={selectClass} defaultValue=""></select>
                    <div className="flex justify-end mt-1">
                      <button type="button" onClick={() => setShowCc(false)} className="text-[13px] text-blue-600 hover:underline">Hide Cc</button>
                    </div>
                  </div>
                )}

                {/* Bcc Field */}
                {showBcc && (
                  <div>
                    <label className={labelClass}>
                      Bcc
                    </label>
                    <select className={selectClass} defaultValue=""></select>
                    <div className="flex justify-end mt-1">
                      <button type="button" onClick={() => setShowBcc(false)} className="text-[13px] text-blue-600 hover:underline">Hide Bcc</button>
                    </div>
                  </div>
                )}

                {/* Subject Field */}
                <div>
                  <label className={labelClass}>
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className={inputClass}
                    required
                  />
                </div>

                {/* Description Field */}
                <div>
                  <label className={labelClass}>
                    Description <span className="text-red-500">*</span>
                  </label>
                  <div className="border border-slate-300 rounded-md overflow-hidden focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
                    <textarea
                      rows={12}
                      className="w-full text-sm px-3 py-2 bg-white text-slate-800 focus:outline-none resize-y border-b border-slate-200"
                      required
                    />
                    <div className="bg-slate-50 flex items-center gap-1 p-1.5 px-3 flex-wrap">
                      <button type="button" className="p-1.5 text-slate-600 hover:bg-slate-200 rounded"><Bold className="w-4 h-4" /></button>
                      <button type="button" className="p-1.5 text-slate-600 hover:bg-slate-200 rounded"><Italic className="w-4 h-4" /></button>
                      <button type="button" className="p-1.5 text-slate-600 hover:bg-slate-200 rounded"><Underline className="w-4 h-4" /></button>
                      <button type="button" className="p-1.5 text-slate-600 hover:bg-slate-200 rounded"><Strikethrough className="w-4 h-4" /></button>
                      <div className="w-[1px] h-4 bg-slate-300 mx-1" />
                      <button type="button" className="p-1.5 text-slate-600 hover:bg-slate-200 rounded"><Heading1 className="w-4 h-4" /></button>
                      <button type="button" className="p-1.5 text-slate-600 hover:bg-slate-200 rounded"><Heading2 className="w-4 h-4" /></button>
                      <div className="w-[1px] h-4 bg-slate-300 mx-1" />
                      <button type="button" className="p-1.5 text-slate-600 hover:bg-slate-200 rounded"><Quote className="w-4 h-4" /></button>
                      <button type="button" className="p-1.5 text-slate-600 hover:bg-slate-200 rounded"><List className="w-4 h-4" /></button>
                      <button type="button" className="p-1.5 text-slate-600 hover:bg-slate-200 rounded"><ListOrdered className="w-4 h-4" /></button>
                      <div className="w-[1px] h-4 bg-slate-300 mx-1" />
                      <button type="button" className="p-1.5 text-slate-600 hover:bg-slate-200 rounded"><Link className="w-4 h-4" /></button>
                      <button type="button" className="p-1.5 text-slate-600 hover:bg-slate-200 rounded"><Image className="w-4 h-4" /></button>
                      <button type="button" className="p-1.5 text-slate-600 hover:bg-slate-200 rounded"><Code className="w-4 h-4" /></button>
                      <div className="flex-1" />
                      <button type="button" className="p-1.5 text-slate-600 hover:bg-slate-200 rounded"><Paperclip className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>

                {/* Priority Field */}
                <div>
                  <label className={labelClass}>
                    Priority <span className="text-red-500">*</span>
                  </label>
                  <select className={selectClass} defaultValue="Low">
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>

                {/* Status Field */}
                <div>
                  <label className={labelClass}>
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select className={selectClass} defaultValue="Closed">
                    <option value="Open">Open</option>
                    <option value="Pending">Pending</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                {/* Tags Field */}
                <div>
                  <label className={labelClass}>
                    Tags
                  </label>
                  <input
                    type="text"
                    className={inputClass}
                  />
                </div>
                
                {/* Show more fields toggle */}
                <div className="pt-2">
                  {!showMoreFields ? (
                    <button type="button" onClick={() => setShowMoreFields(true)} className="text-[13px] text-blue-600 hover:underline">
                      Show more fields
                    </button>
                  ) : (
                    <button type="button" onClick={() => setShowMoreFields(false)} className="text-[13px] text-blue-600 hover:underline">
                      Hide Fields
                    </button>
                  )}
                </div>

                {/* Additional Fields */}
                {showMoreFields && (
                  <>
                    <div>
                      <label className={labelClass}>Group</label>
                      <select className={selectClass} defaultValue="--">
                        <option value="--">--</option>
                      </select>
                    </div>

                    <div>
                      <label className={labelClass}>Type</label>
                      <select className={selectClass} defaultValue="--">
                        <option value="--">--</option>
                        <option value="Question">Question</option>
                        <option value="Incident">Incident</option>
                        <option value="Problem">Problem</option>
                        <option value="Feature Request">Feature Request</option>
                        <option value="Refund">Refund</option>
                      </select>
                    </div>

                    <div>
                      <label className={labelClass}>Reference Number</label>
                      <input type="text" className={inputClass} />
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-t border-slate-200 shrink-0">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                  checked={sendAnother}
                  onChange={(e) => setSendAnother(e.target.checked)}
                />
                <span className="text-[13px] text-slate-700">Send another</span>
              </label>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSend}
                  disabled={isSubmitting}
                  className="px-6 py-2 text-sm font-medium text-white bg-[#2D4E77] rounded-md hover:bg-[#243f61] transition-colors shadow-sm flex items-center justify-center gap-2 min-w-[80px]"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : null}
                  Send
                </button>
              </div>
            </div>
            </div> {/* End Main Email Form Area */}

            {/* Right Side: Contact Info Panel */}
            {showContactInfo && (
              <div className="w-[300px] bg-white border-l border-slate-200 flex flex-col shrink-0">
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
                  <div className="flex items-center gap-2 text-slate-800 font-medium">
                    <User className="w-[18px] h-[18px] text-[#137A87]" strokeWidth={2.5} />
                    <span className="text-sm">Contact info</span>
                  </div>
                  <button onClick={() => setShowContactInfo(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                    <ChevronUp className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-6 flex flex-col items-center sm:items-start text-center sm:text-left gap-3">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-1 text-slate-300">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-[80px] h-[80px] opacity-20 transform -rotate-12 absolute scale-150 pointer-events-none">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 11a4 4 0 100-8 4 4 0 000 8zM19 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2" />
                    </svg>
                    <User className="w-10 h-10 relative z-10" strokeWidth={1.5} />
                  </div>
                  <p className="text-[14px] text-slate-800">Pick a contact</p>
                  <p className="text-[13px] text-slate-500 leading-relaxed">
                    Their details and recent conversations will appear here
                  </p>
                </div>
              </div>
            )}

            {/* Right Side: Search Panel */}
            {showSearchPanel && (
              <div className="w-[300px] bg-white border-l border-slate-200 flex flex-col shrink-0">
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
                  <div className="flex items-center gap-2 text-slate-800 font-medium">
                    <Search className="w-[18px] h-[18px] text-[#137A87]" strokeWidth={2.5} />
                    <span className="text-sm">Search</span>
                  </div>
                  <button onClick={() => setShowSearchPanel(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                    <ChevronUp className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-6 flex flex-col items-center sm:items-start text-center sm:text-left gap-3">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-1 text-slate-300">
                     <div className="w-[60px] h-[60px] rounded-full border border-dashed border-slate-200 bg-slate-50 flex items-center justify-center">
                        <Search className="w-6 h-6" strokeWidth={1.5} />
                     </div>
                  </div>
                  <p className="text-[14px] text-slate-800">Search</p>
                  <p className="text-[13px] text-slate-500 leading-relaxed">
                    Search through tickets, contacts, or knowledge base articles here
                  </p>
                </div>
              </div>
            )}

            {/* Right Rail Toggle */}
            <div className="w-12 bg-white border-l border-slate-200 flex flex-col items-center py-4 shrink-0 shadow-[-4px_0_10px_rgba(0,0,0,0.02)] z-10 gap-2">
               {/* Contact Toggle */}
               <button 
                 onClick={toggleContactInfo} 
                 className={`p-1.5 rounded-md transition-colors relative group focus:outline-none ${showContactInfo ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-200 hover:text-slate-700'}`}
               >
                 <User className="w-[18px] h-[18px]" strokeWidth={2.5} />
                 <div className="absolute bottom-[2px] right-0 w-[7px] h-[7px] bg-emerald-500 rounded-full border-[1.5px] border-white"></div>
               </button>

               {/* Search Toggle */}
               <button 
                 onClick={toggleSearchPanel} 
                 className={`p-1.5 rounded-md transition-colors relative group focus:outline-none ${showSearchPanel ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-200 hover:text-slate-700'}`}
               >
                 <Search className="w-[18px] h-[18px]" strokeWidth={2.5} />
               </button>

               {/* Bottom Icons (Notification, Help, User Profile) */}
               <div className="mt-auto flex flex-col items-center gap-4 pb-2">
                 <button className="text-slate-400 hover:text-[#137A87] transition-colors focus:outline-none relative">
                   <Bell className="w-[18px] h-[18px]" strokeWidth={2.5} />
                   <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></div>
                 </button>
                 <button className="text-slate-400 hover:text-[#137A87] transition-colors focus:outline-none">
                   <HelpCircle className="w-[18px] h-[18px]" strokeWidth={2.5} />
                 </button>
                 <button className="flex items-center justify-center w-[26px] h-[26px] rounded-full bg-[#fde68a] text-[#137A87] font-bold text-[11px] outline-none mt-1 shadow-sm border border-white">
                   M
                 </button>
               </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
