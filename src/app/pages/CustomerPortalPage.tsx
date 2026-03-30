import { Search, Ticket, User, PlusCircle, Home, Mail } from "lucide-react";
import { useNavigate } from "react-router";

export function CustomerPortalPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8FAFB] flex flex-col font-sans">
      {/* ── Header ── */}
      <header className="h-16 bg-white border-b border-slate-100 px-8 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-8">
          {/* Logo / Branding */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
              <span className="text-slate-500 font-bold text-xs">A</span>
            </div>
            <span className="text-[18px] font-bold text-[#0F2D40] tracking-tight">abc</span>
          </div>

          {/* Navigation links */}
          <nav className="flex items-center gap-6">
            <button className="text-[14px] font-bold text-[#0F2D40] border-b-2 border-[#0F2D40] h-16 px-1 flex items-center">
              Home
            </button>
            <button className="text-[14px] font-medium text-slate-600 hover:text-[#0F2D40] transition-colors">
              Tickets
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-[13px] font-medium text-[#0F2D40] border border-slate-200 rounded px-4 py-1.5 hover:bg-slate-50 transition-colors shadow-sm">
            Submit a ticket
          </button>
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm shadow-inner">
            a
          </div>
        </div>
      </header>

      {/* ── Hero Section ── */}
      <section className="bg-[#0F2D40] py-16 px-4 flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 tracking-tight">
          Hi, how can we help you?
        </h1>
        <div className="w-full max-w-[640px] relative group">
          <input
            type="text"
            placeholder="Enter the search term here...."
            className="w-full bg-white rounded-md pl-4 pr-12 py-4 text-[15px] text-slate-800 placeholder:text-slate-400 focus:outline-none shadow-2xl transition-all focus:ring-2 focus:ring-[#3B82F6]/50"
          />
          <button className="absolute right-0 top-0 bottom-0 px-5 bg-[#E6E8EC] rounded-r-md text-slate-500 hover:text-[#0F2D40] transition-colors">
            <Search className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* ── Content / Cards Section ── */}
      <main className="flex-1 max-w-[960px] mx-auto w-full py-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: View all tickets */}
          <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 flex gap-6 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all cursor-pointer group">
            <div className="w-16 h-16 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0 group-hover:bg-[#f0fafb] transition-colors">
               <div className="relative">
                  <Ticket className="w-8 h-8 text-[#4CC9B5]" />
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 border border-slate-100">
                    <Search className="w-3.5 h-3.5 text-[#4CC9B5]" />
                  </div>
               </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <h3 className="text-[16px] font-bold text-[#0F2D40] group-hover:text-[#2D4E77] transition-colors">View all tickets</h3>
              <p className="text-[13px] text-slate-500 leading-relaxed">
                Track all your ticket's progress and your interaction with the support team
              </p>
            </div>
          </div>

          {/* Card 2: Submit a ticket */}
          <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 flex gap-6 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all cursor-pointer group">
            <div className="w-16 h-16 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0 group-hover:bg-[#f0fafb] transition-colors">
              <div className="relative">
                <User className="w-8 h-8 text-[#4CC9B5]" />
                <div className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 border border-slate-100">
                   <PlusCircle className="w-3.5 h-3.5 text-[#4CC9B5]" />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <h3 className="text-[16px] font-bold text-[#0F2D40] group-hover:text-[#2D4E77] transition-colors">Submit a ticket</h3>
              <p className="text-[13px] text-slate-500 leading-relaxed">
                Describe your issue by filling out the support ticket form
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="bg-[#1E293B] py-3 text-center border-t border-slate-800">
        <p className="text-[12px] text-slate-400">
          Helpdesk Software by <button className="hover:text-white transition-colors underline decoration-slate-600">DT I.T. Solutions and Consultancy</button> | <button className="hover:text-white transition-colors">Cookie policy</button>
        </p>
      </footer>
    </div>
  );
}
