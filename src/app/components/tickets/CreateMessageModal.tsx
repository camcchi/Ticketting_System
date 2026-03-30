import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, User, ChevronUp, Search, Bell, HelpCircle } from "lucide-react";

interface CreateMessageModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const selectClass = "w-full text-sm border border-slate-300 rounded-md px-3 py-2 bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#137A87] focus:border-[#137A87] transition-all appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M5%208l5%205%205-5%22%20fill%3D%22none%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_0.5rem_center] pr-10";
const labelClass = "block text-[13px] font-medium text-slate-700 mb-1.5";
const inputClass = "w-full text-sm border border-slate-300 rounded-md px-3 py-2 bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#137A87] focus:border-[#137A87] transition-all placeholder:text-slate-400";

export function CreateMessageModal({ open, onOpenChange }: CreateMessageModalProps) {
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

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-50 animate-in fade-in" />
        <Dialog.Content
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <div className={`relative w-full ${showContactInfo || showSearchPanel ? 'max-w-[1150px]' : 'max-w-[850px]'} bg-slate-50 rounded-lg shadow-2xl flex max-h-[95vh] overflow-hidden transition-all duration-300 ease-in-out`}>
            
            {/* Main Message Form Area */}
            <div className="flex-1 flex flex-col overflow-hidden min-w-[600px] h-full min-h-[600px]">
              {/* Header */}
              <div className="flex justify-between items-center px-6 py-4 bg-white border-b border-slate-200 shrink-0">
                <Dialog.Title className="text-lg font-semibold text-slate-800">
                  Message
                </Dialog.Title>
                <Dialog.Close className="text-slate-400 hover:text-slate-600 transition-colors">
                  <X className="w-5 h-5" />
                </Dialog.Close>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto px-10 py-8 bg-white flex flex-col items-center">
                <div className="w-full max-w-3xl">
                  <p className="text-[13px] text-slate-500 mb-6">
                    When you hit send, the contact will receive the message and a ticket will be associated with them. <a href="#" className="text-blue-600 hover:underline">Learn more</a>
                  </p>

                  <div className="space-y-6">
                    {/* Source Field */}
                    <div>
                      <label className={labelClass}>
                        Source
                      </label>
                      <select className={selectClass} defaultValue="Whatsapp">
                        <option value="Whatsapp">Whatsapp</option>
                      </select>
                    </div>

                    {/* Empty State / Warning Graphic */}
                    <div className="pt-16 pb-12 flex flex-col items-center justify-center text-center">
                        <div className="relative w-32 h-32 mb-4 flex items-center justify-center">
                            {/* Simple illustration matching the vibe */}
                            <svg className="w-full h-full text-slate-300" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="25" y="35" width="70" height="50" rx="4" fill="#E2E8F0" />
                                <rect x="25" y="35" width="70" height="12" rx="4" fill="#94A3B8" />
                                <path d="M75 35H91C93.2091 35 95 36.7909 95 39V47H75V35Z" fill="#94A3B8" />
                                <rect x="30" y="40" width="8" height="2" rx="1" fill="#CBD5E1" />
                                <rect x="35" y="55" width="50" height="20" rx="2" stroke="#64748B" strokeWidth="1.5" fill="white" />
                                <path d="M60 58L68 70H52L60 58Z" stroke="#64748B" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
                                <rect x="59.25" y="63" width="1.5" height="4" fill="#64748B" />
                                <circle cx="60" cy="68.5" r="1" fill="#64748B" />
                                <path d="M15 45L20 45" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
                                <path d="M22 30L25 34" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
                                <path d="M98 75L105 75" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
                                <path d="M35 90L75 90" stroke="#E2E8F0" strokeWidth="1.5" strokeLinecap="round" />
                                <path d="M85 90L90 90" stroke="#E2E8F0" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </div>
                        <p className="text-[13px] text-slate-700">
                          Sending proactive messages is available on paid plans.
                        </p>
                        <a href="#" className="text-[13px] text-blue-600 font-medium hover:underline mt-1">
                          Learn more
                        </a>
                    </div>
                  </div>
                </div>
              </div>
            </div> {/* End Main Form Area */}

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
