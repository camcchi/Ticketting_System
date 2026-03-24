import { 
  History, 
  Star, 
  BarChart2, 
  User, 
  Users, 
  Lock, 
  Trash2, 
  Settings,
  Search,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  BarChart3
} from "lucide-react";
import { Button } from "../components/ui/button";

export function AnalyticsPage() {
  return (
    <div className="flex h-full bg-white overflow-hidden">
      {/* ── LEFT SIDEBAR ── */}
      <div className="w-[240px] flex-shrink-0 border-r border-slate-200 flex flex-col bg-white">
        <div className="px-5 py-4">
          <h2 className="text-[15px] font-bold text-[#0B3A42]">Analytics</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto w-full">
          <nav className="flex flex-col mb-4">
            <button className="flex items-center gap-3 px-5 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors w-full text-left">
              <History className="w-4 h-4 text-slate-500" />
              Recent
            </button>
            <button className="flex items-center gap-3 px-5 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors w-full text-left">
              <Star className="w-4 h-4 text-slate-500" />
              Favorites
            </button>
          </nav>

          <div className="h-[1px] bg-slate-100 mx-5 mb-4" />

          <nav className="flex flex-col space-y-0.5">
            <button className="flex items-center gap-3 px-5 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors w-full text-left">
              <BarChart2 className="w-4 h-4 text-slate-500" />
              All reports
            </button>
            <button className="flex items-center gap-3 px-5 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors w-full text-left">
              <User className="w-4 h-4 text-slate-500" />
              My reports
            </button>
            <button className="flex items-center gap-3 px-5 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors w-full text-left">
              <Users className="w-4 h-4 text-slate-500" />
              Curated reports
            </button>
            <button className="flex items-center gap-3 px-5 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors w-full text-left">
              <Lock className="w-4 h-4 text-slate-500" />
              Private reports
            </button>
            <button className="flex items-center gap-3 px-5 py-2.5 text-sm text-[#137A87] font-medium bg-[#e6f2f3] border-l-4 border-[#137A87] w-full text-left relative -ml-[2px] pr-4">
              <span className="ml-[2px] flex items-center gap-3">
                <Users className="w-4 h-4 text-[#137A87]" />
                Shared reports
              </span>
            </button>
            <button className="flex items-center gap-3 px-5 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors w-full text-left">
              <Users className="w-4 h-4 text-slate-500" />
              Curated reports (Old)
            </button>
          </nav>
        </div>

        <div className="mt-auto flex flex-col pt-4 pb-2">
          <button className="flex items-center gap-3 px-5 py-3 text-sm text-slate-600 hover:bg-slate-50 transition-colors w-full text-left">
            <Trash2 className="w-4 h-4 text-slate-500" />
            Trash
          </button>
          <button className="flex items-center justify-between px-5 py-3 text-sm text-slate-600 hover:bg-slate-50 transition-colors w-full text-left">
            <span className="flex items-center gap-3">
              <Settings className="w-4 h-4 text-slate-500" />
              Settings
            </span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Header Bar */}
        <div className="h-[60px] border-b border-slate-200 bg-white flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex items-center gap-6">
            <h1 className="text-[15px] font-semibold text-[#0B3A42]">Shared reports</h1>
            <button className="flex items-center gap-1.5 text-[13px] text-slate-600 hover:text-slate-800 transition-colors">
              Sort By: <span className="font-medium text-slate-700">Last modified date</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 text-[13px] font-medium text-slate-600 hover:bg-slate-50 px-3 py-1.5 rounded-md transition-colors">
              <Search className="w-4 h-4 text-slate-500" />
              Search
            </button>
            <button className="flex items-center gap-2 text-[13px] font-medium text-slate-600 hover:bg-slate-50 px-3 py-1.5 rounded-md transition-colors border border-slate-200">
              <HelpCircle className="w-4 h-4 text-slate-500" />
              Help Center
            </button>
            <Button className="h-8 px-4 text-[13px] font-semibold bg-[#137A87] hover:bg-[#0e5c66] text-white rounded-md shadow-sm">
              New Report
            </Button>
          </div>
        </div>

        {/* Empty State Area */}
        <div className="flex-1 overflow-auto bg-white flex items-center justify-center">
          <div className="flex flex-col items-center max-w-sm text-center -mt-20">
            {/* Blob + Icon */}
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-slate-100 rounded-[40px] transform rotate-3 scale-110 -z-10" />
              <div className="absolute inset-0 bg-[#eef2f5] rounded-[30px] transform -rotate-6 scale-95 -z-10" />
              <div className="w-24 h-24 bg-white border-[3px] border-slate-300 rounded-xl shadow-xs flex items-center justify-center relative overflow-hidden">
                <BarChart3 className="w-12 h-12 text-slate-400" strokeWidth={1.5} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-[3px] bg-slate-400 transform -rotate-45" />
                </div>
              </div>
            </div>

            <h2 className="text-[17px] font-bold text-[#0B3A42] mb-1.5">Shared reports</h2>
            <p className="text-[13px] text-slate-500 mb-6 font-medium">
              You currently have no reports here.
            </p>
            
            <Button variant="outline" className="h-9 px-4 text-[13px] font-semibold text-slate-700 border-slate-300 hover:bg-slate-50">
              See All Reports
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}