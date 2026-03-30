import { useState, useRef, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, User, ChevronUp, ChevronDown, Search, Bell, HelpCircle, Plus, Trash2, Settings } from "lucide-react";

interface CreateTicketModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const inputClass = "w-full text-sm border border-slate-300 rounded-md px-3 py-2 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#137A87]/40 focus:border-[#137A87] transition-all placeholder:text-slate-400";
const textareaClass = "w-full text-sm border border-slate-300 rounded-md px-3 py-2 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#137A87]/40 focus:border-[#137A87] transition-all placeholder:text-slate-400 resize-y";

export function CreateTicketModal({ open, onOpenChange }: CreateTicketModalProps) {
  const [company, setCompany] = useState("");
  const [productRelated, setProductRelated] = useState("");
  const [softwareVersion, setSoftwareVersion] = useState("");
  const [issueEncountered, setIssueEncountered] = useState("");
  const [scenario, setScenario] = useState("");
  const [expectedResult, setExpectedResult] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [otherInfo, setOtherInfo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sendReceipt, setSendReceipt] = useState(false);
  
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [showSearchPanel, setShowSearchPanel] = useState(false);

  // Add Contact form state
  const [contactEmail, setContactEmail] = useState("");
  const [mobilePhone, setMobilePhone] = useState("");
  const [workPhone, setWorkPhone] = useState("");
  const [uniqueExternalId, setUniqueExternalId] = useState("");
  const [socialHandle, setSocialHandle] = useState("");
  const [socialPlatform, setSocialPlatform] = useState("Facebook");
  const [socialDropdownOpen, setSocialDropdownOpen] = useState(false);
  const socialDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (socialDropdownRef.current && !socialDropdownRef.current.contains(e.target as Node)) {
        setSocialDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const socialPlatforms = [
    { label: "Facebook", icon: "fb" },
    { label: "Instagram", icon: "ig" },
    { label: "X (Twitter)", icon: "x" },
  ];

  const toggleContactInfo = () => {
    setShowContactInfo(!showContactInfo);
    if (!showContactInfo) setShowSearchPanel(false);
  };

  const toggleSearchPanel = () => {
    setShowSearchPanel(!showSearchPanel);
    if (!showSearchPanel) setShowContactInfo(false);
  };

  const productOptions = [
    "SAP B1",
    "E-Sweldo Payroll",
    "HIS & EMR",
    "Xceler8 Addon",
    "SAP Cloud ERP",
  ];

  const handleCreate = () => {
    if (!company || !productRelated || !softwareVersion || !issueEncountered || !scenario || !expectedResult || !fullName || !email) {
       return; // Ideally we'd show validation errors
    }
    
    setIsSubmitting(true);
    // Simulate API call for form submission
    setTimeout(() => {
      setIsSubmitting(false);
      onOpenChange(false);
      // Reset after close
      setTimeout(() => {
        setCompany("");
        setProductRelated("");
        setSoftwareVersion("");
        setIssueEncountered("");
        setScenario("");
        setExpectedResult("");
        setFullName("");
        setEmail("");
        setContactNumber("");
        setOtherInfo("");
        setSendReceipt(false);
      }, 300);
    }, 800);
  };

  const isFormValid = company && productRelated && softwareVersion && issueEncountered && scenario && expectedResult && fullName && email;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 animate-in fade-in" />
        <Dialog.Content
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <div className={`relative w-full ${showContactInfo || showSearchPanel ? 'max-w-[1100px]' : 'max-w-[800px]'} bg-slate-50 flex max-h-[92vh] overflow-hidden rounded-lg shadow-2xl transition-all duration-300 ease-in-out`}>
            
            <div className="flex-1 flex flex-col overflow-hidden min-w-[600px] bg-white">
              {/* Form Header (matching MS Form style) */}
            <div className="flex flex-col border-b border-slate-200 sticky top-0 z-10 bg-[#EDF8F8]">
              <div className="absolute top-0 left-0 w-full h-2 bg-[#137A87]" />
              <div className="flex justify-between items-start px-8 pt-8 pb-4">
                <Dialog.Title className="text-2xl font-semibold text-slate-800">
                  A.S.S.I.S.T Ticket Creation
                </Dialog.Title>
                <Dialog.Close className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-200/50 hover:text-slate-800 transition-colors shrink-0 -mt-2 -mr-2">
                  <X className="w-5 h-5" />
                </Dialog.Close>
              </div>
              <div className="px-8 pb-8 text-[13px] text-slate-600 space-y-2">
                <p>DT I.T. Solutions and Consultancy ticket creation.</p>
                <p>Every ticket submitted will be evaluated and managed through severity level.</p>
                <p>Support schedule: Monday-Friday at 8:30 am - 6:00 pm, excluding holidays.</p>
                <p className="italic font-medium text-slate-700">*Note: Ticket/s with more than 30 days of no update from the client will be automatically closed.</p>
                <p className="pt-2">Thank you</p>
                <p className="text-slate-500 pt-1">When you submit this form, it will not automatically collect your details like name and email address unless you provide it yourself.</p>
                <div className="text-red-600 font-medium pt-3">* Required</div>
              </div>
            </div>

            {/* Form Body */}
            <div className="flex-1 overflow-y-auto px-8 py-8 space-y-8 bg-[#F4F4F4]">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                  <label className="flex gap-2 text-sm font-semibold text-slate-800 mb-3">
                    <span>1.</span>
                    <span>Company <span className="text-red-500">*</span></span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your answer"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className={inputClass}
                    required
                  />
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                  <label className="flex gap-2 text-sm font-semibold text-slate-800 mb-4">
                    <span>2.</span>
                    <span>Product Related <span className="text-red-500">*</span></span>
                  </label>
                  <div className="space-y-3 pl-4">
                    {productOptions.map((option) => (
                      <label key={option} className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${productRelated === option ? 'border-[#137A87] bg-[#137A87]' : 'border-slate-300 group-hover:border-[#137A87]'}`}>
                          {productRelated === option && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                        <input
                          type="radio"
                          className="hidden"
                          name="productRelated"
                          value={option}
                          checked={productRelated === option}
                          onChange={(e) => setProductRelated(e.target.value)}
                        />
                        <span className="text-sm text-slate-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                  <label className="flex gap-2 text-sm font-semibold text-slate-800 mb-1">
                    <span>3.</span>
                    <span>Software Version and Patch/FP <span className="text-red-500">*</span></span>
                  </label>
                  <p className="text-[13px] text-slate-500 mb-3 pl-4">Ex. SAP B1 Version 10 FP 2311 and SQL 2017 or SAP Cloud ERP (Public)</p>
                  <input
                    type="text"
                    placeholder="Enter your answer"
                    value={softwareVersion}
                    onChange={(e) => setSoftwareVersion(e.target.value)}
                    className={inputClass}
                    required
                  />
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                  <label className="flex gap-2 text-sm font-semibold text-slate-800 mb-3">
                    <span>4.</span>
                    <span>Issue encountered <span className="text-red-500">*</span></span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your answer"
                    value={issueEncountered}
                    onChange={(e) => setIssueEncountered(e.target.value)}
                    className={inputClass}
                    required
                  />
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                  <label className="flex gap-2 text-sm font-semibold text-slate-800 mb-3">
                    <span>5.</span>
                    <span>Scenario upon encountering the issue. Please provide the steps <span className="text-red-500">*</span></span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Enter your answer"
                    value={scenario}
                    onChange={(e) => setScenario(e.target.value)}
                    className={textareaClass}
                    required
                  />
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                  <label className="flex gap-2 text-sm font-semibold text-slate-800 mb-1">
                    <span>6.</span>
                    <span>Expected result <span className="text-red-500">*</span></span>
                  </label>
                  <p className="text-[13px] text-slate-500 mb-3 pl-4">Explain the expected result of the issue. It would save time and to have initial information on the concern.</p>
                  <textarea
                    rows={3}
                    placeholder="Enter your answer"
                    value={expectedResult}
                    onChange={(e) => setExpectedResult(e.target.value)}
                    className={textareaClass}
                    required
                  />
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                  <label className="flex gap-2 text-sm font-semibold text-slate-800 mb-3">
                    <span>7.</span>
                    <span>Full name <span className="text-red-500">*</span></span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your answer"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={inputClass}
                    required
                  />
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                  <label className="flex gap-2 text-sm font-semibold text-slate-800 mb-1">
                    <span>8.</span>
                    <span>Email address to contact to: <span className="text-red-500">*</span></span>
                  </label>
                  <p className="text-[13px] text-slate-500 mb-3 pl-4">Ex. JuandelaCruz@Sampleemail.com</p>
                  <input
                    type="email"
                    placeholder="Please enter an email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                    required
                  />
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                  <label className="flex gap-2 text-sm font-semibold text-slate-800 mb-1">
                    <span>9.</span>
                    <span>Contact number</span>
                  </label>
                  <p className="text-[13px] text-slate-500 mb-3 pl-4">Contact Number: 0977-111-1111</p>
                  <input
                    type="text"
                    placeholder="The value must be a number"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                  <label className="flex gap-2 text-sm font-semibold text-slate-800 mb-3">
                    <span>10.</span>
                    <span>Other information that you need to add:</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Enter your answer"
                    value={otherInfo}
                    onChange={(e) => setOtherInfo(e.target.value)}
                    className={textareaClass}
                  />
                </div>
            </div>

            {/* Form Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between px-8 py-5 border-t border-slate-200 bg-white sticky bottom-0 gap-4">
              <label className="flex items-center gap-2 cursor-pointer select-none group w-full sm:w-auto">
                <div
                  className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors ${
                    sendReceipt ? "bg-[#137A87] border-[#137A87]" : "border-slate-300 group-hover:border-[#137A87]"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={sendReceipt}
                    onChange={(e) => setSendReceipt(e.target.checked)}
                  />
                  {sendReceipt && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="text-sm text-slate-700">Send me an email receipt of my responses</span>
              </label>

              <button
                onClick={handleCreate}
                disabled={isSubmitting || !isFormValid}
                className="w-full sm:w-auto px-8 py-2.5 text-sm font-semibold rounded-md bg-[#2D4E77] hover:bg-[#243f61] text-white shadow-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : null}
                Submit
              </button>
            </div>
            </div> {/* End Main Form Area */}

            {/* Right Side: Contact Info Panel */}
            {showContactInfo && (
              <div className="w-[300px] bg-white border-l border-slate-200 flex flex-col shrink-0">
                {/* Panel Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
                  <span className="text-[15px] font-semibold text-slate-800">Add Contact</span>
                  <button onClick={() => setShowContactInfo(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Panel Body */}
                <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">

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
                          className="w-full text-[13px] border border-slate-300 rounded-md px-3 py-[7px] pr-8 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#137A87]/30 focus:border-[#137A87] transition-all placeholder:text-slate-400"
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
                      className="w-full text-[13px] border border-slate-300 rounded-md px-3 py-[7px] bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#137A87]/30 focus:border-[#137A87] transition-all placeholder:text-slate-400"
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
                      className="w-full text-[13px] border border-slate-300 rounded-md px-3 py-[7px] bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#137A87]/30 focus:border-[#137A87] transition-all placeholder:text-slate-400"
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
                      className="w-full text-[13px] border border-slate-300 rounded-md px-3 py-[7px] bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#137A87]/30 focus:border-[#137A87] transition-all placeholder:text-slate-400"
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
                      {/* Platform Dropdown */}
                      <div className="relative" ref={socialDropdownRef}>
                        <button
                          type="button"
                          onClick={() => setSocialDropdownOpen(!socialDropdownOpen)}
                          className="flex items-center gap-1.5 border border-slate-300 rounded-md px-2.5 py-[7px] bg-white text-[13px] text-slate-700 hover:border-[#137A87] focus:outline-none transition-all whitespace-nowrap"
                        >
                          {/* Platform icon */}
                          {socialPlatform === "Facebook" && (
                            <svg className="w-3.5 h-3.5 text-[#1877F2]" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                          )}
                          {socialPlatform === "Instagram" && (
                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="url(#ig-grad)" strokeWidth="2">
                              <defs>
                                <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                                  <stop offset="0%" stopColor="#f09433" />
                                  <stop offset="25%" stopColor="#e6683c" />
                                  <stop offset="50%" stopColor="#dc2743" />
                                  <stop offset="75%" stopColor="#cc2366" />
                                  <stop offset="100%" stopColor="#bc1888" />
                                </linearGradient>
                              </defs>
                              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                              <circle cx="12" cy="12" r="4" />
                              <circle cx="17.5" cy="6.5" r="0.5" fill="#cc2366" stroke="none" />
                            </svg>
                          )}
                          {socialPlatform === "X (Twitter)" && (
                            <svg className="w-3.5 h-3.5 text-slate-800" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.736-8.844L2.25 2.25h6.849l4.259 5.631L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
                            </svg>
                          )}
                          <span>{socialPlatform}</span>
                          <ChevronDown className="w-3 h-3 text-slate-500" />
                        </button>

                        {socialDropdownOpen && (
                          <div className="absolute right-0 top-[calc(100%+4px)] w-[160px] bg-white border border-slate-200 rounded-lg shadow-lg z-50 overflow-hidden">
                            {socialPlatforms.map((p) => (
                              <button
                                key={p.label}
                                type="button"
                                onClick={() => { setSocialPlatform(p.label); setSocialDropdownOpen(false); }}
                                className="w-full flex items-center gap-2.5 px-3 py-2.5 text-[13px] text-slate-700 hover:bg-slate-50 transition-colors"
                              >
                                {/* Icon per platform */}
                                {p.label === "Facebook" && (
                                  <svg className="w-4 h-4 text-[#1877F2]" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                  </svg>
                                )}
                                {p.label === "Instagram" && (
                                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="url(#ig-grad2)" strokeWidth="2">
                                    <defs>
                                      <linearGradient id="ig-grad2" x1="0%" y1="100%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#f09433" />
                                        <stop offset="50%" stopColor="#dc2743" />
                                        <stop offset="100%" stopColor="#bc1888" />
                                      </linearGradient>
                                    </defs>
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                    <circle cx="12" cy="12" r="4" />
                                    <circle cx="17.5" cy="6.5" r="0.5" fill="#cc2366" stroke="none" />
                                  </svg>
                                )}
                                {p.label === "X (Twitter)" && (
                                  <svg className="w-4 h-4 text-slate-800" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.736-8.844L2.25 2.25h6.849l4.259 5.631L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
                                  </svg>
                                )}
                                <span className="flex-1 text-left">{p.label}</span>
                                {socialPlatform === p.label && (
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

                {/* Panel Footer */}
                <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-slate-200 bg-white">
                  <button
                    type="button"
                    onClick={() => setShowContactInfo(false)}
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
