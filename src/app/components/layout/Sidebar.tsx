import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import {
  Sparkles,
  LayoutDashboard,
  Ticket,
  Users,
  BarChart3,
  ShieldCheck,
  Building2,
} from "lucide-react";
import { cn } from "../ui/utils";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

const navItems = [
  { path: "/freddy-insights", label: "SoppyAI Insights", icon: Sparkles },
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/tickets", label: "Tickets", icon: Ticket, badge: 7 },
  { path: "/contacts", label: "Contacts", icon: Users },
  { path: "/analytics", label: "Analytics", icon: BarChart3 },
  { path: "/admin", label: "Admin", icon: ShieldCheck },
];

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isContactsOpen, setIsContactsOpen] = useState(false);

  return (
    <aside className={cn(
      "group transition-[width] duration-300 ease-in-out bg-[#137A87] flex flex-col z-20 absolute h-full md:relative bg-clip-padding shadow-lg md:shadow-none overflow-hidden flex-shrink-0",
      isContactsOpen ? "w-64" : "w-16 hover:w-64"
    )}>
      {/* Brand Header */}
      <div className="p-3.5 border-b border-white/10 flex items-center justify-start h-16 w-64 overflow-hidden">
        <div className="flex items-center w-full h-full">
          <img 
            src="/assist_logo.jpg" 
            alt="ASSIST Logo" 
            className="h-10 max-w-[180px] object-contain object-left flex-shrink-0"
          />
          <span className={cn(
            "ml-3 font-bold text-[19px] text-white tracking-wide transition-opacity duration-300 whitespace-nowrap",
            isContactsOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          )}>
            A.S.S.I.S.T
          </span>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto overflow-x-hidden w-64 scrollbar-hide">
        {navItems.map((item) => {
          const Icon = item.icon;
          
          if (item.path === "/contacts") {
            const isActive = location.pathname.startsWith("/contacts") || location.pathname.startsWith("/companies");
            return (
              <HoverCard key={item.path} open={isContactsOpen} onOpenChange={setIsContactsOpen} openDelay={0} closeDelay={150}>
                <HoverCardTrigger asChild>
                  <button
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 relative w-full text-left outline-none",
                      "text-white/70 hover:text-white hover:bg-white/10 mx-1",
                      isActive && "bg-white/15 text-white hover:bg-white/15 font-medium"
                    )}
                    title={item.label}
                  >
                    <Icon
                      className={cn(
                        "w-[20px] h-[20px] flex-shrink-0 transition-colors ml-0.5",
                        isActive ? "text-[#8ED1C9]" : "text-white/60 group-hover:text-white/90"
                      )}
                    />
                    <span className={cn(
                      "text-sm transition-opacity duration-300 w-32 whitespace-nowrap",
                      isContactsOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    )}>
                      {item.label}
                    </span>
                  </button>
                </HoverCardTrigger>
                <HoverCardContent 
                  side="right" 
                  align="start" 
                  sideOffset={10} 
                  className="w-[180px] bg-white rounded-2xl shadow-xl py-1.5 z-50 border border-slate-200 ml-2 p-0 flex flex-col"
                >
                  <button 
                    onClick={() => {
                      navigate("/contacts");
                      setIsContactsOpen(false);
                    }}
                    className="px-4 py-2.5 mx-1.5 my-0.5 rounded-[10px] cursor-pointer hover:bg-slate-200/60 focus:bg-slate-200/60 outline-none text-[#334155] font-medium text-[13px] transition-all duration-150 text-left"
                  >
                    Contacts
                  </button>
                  <button 
                    onClick={() => {
                      navigate("/companies");
                      setIsContactsOpen(false);
                    }}
                    className="px-4 py-2.5 mx-1.5 my-0.5 rounded-[10px] cursor-pointer hover:bg-slate-200/60 focus:bg-slate-200/60 outline-none text-[#334155] font-medium text-[13px] transition-all duration-150 text-left"
                  >
                    Companies
                  </button>
                </HoverCardContent>
              </HoverCard>
            );
          }

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 relative",
                  "text-white/70 hover:text-white hover:bg-white/10 mx-1",
                  isActive && "bg-white/15 text-white hover:bg-white/15 font-medium"
                )
              }
              title={item.label}
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={cn(
                      "w-[20px] h-[20px] flex-shrink-0 transition-colors ml-0.5",
                      isActive ? "text-[#8ED1C9]" : "text-white/60 group-hover:text-white/90"
                    )}
                  />
                  <span className={cn(
                    "text-sm transition-opacity duration-300 w-32 whitespace-nowrap",
                    isContactsOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  )}>
                    {item.label}
                  </span>
                  {item.badge && (
                    <span
                      className={cn(
                        "absolute right-2 text-[10px] px-1.5 py-0.5 rounded-full font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                        isActive ? "bg-[#4CC9B5] text-white" : "bg-white/15 text-white/80"
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                  {/* Minimized Badge Indicator */}
                  {item.badge && (
                    <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#4CC9B5] border-2 border-[#137A87] opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer Logo */}
      <div className="p-3 border-t border-white/10 w-64 flex items-center min-h-[64px] overflow-hidden relative">
        {/* Expanded Badge */}
        <div className="absolute left-[10px] flex items-center bg-white rounded-full p-1 pr-5 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
          <img 
            src="/logo.jpeg" 
            alt="DT I.T. Solutions Logo" 
            className="w-9 h-9 rounded-full flex-shrink-0"
          />
          <div className="flex flex-col justify-center ml-3">
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Powered By</span>
            <span className="text-[13px] font-black text-black leading-none tracking-tight">DT I.T. Solutions</span>
          </div>
        </div>
        
        {/* Collapsed Badge */}
        <div className="absolute left-[10px] opacity-100 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
          <div className="bg-white rounded-full p-1 shadow-md">
            <img 
              src="/logo.jpeg" 
              alt="Company Logo Minimal" 
              className="w-9 h-9 rounded-full"
            />
          </div>
        </div>
      </div>
    </aside>
  );
}