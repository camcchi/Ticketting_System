import { Outlet, useLocation } from "react-router";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function AppLayout() {
  const location = useLocation();
  const isModulePage = location.pathname.startsWith("/tickets") || location.pathname.startsWith("/contacts") || location.pathname.startsWith("/companies") || location.pathname.startsWith("/analytics");

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        {!isModulePage && <Topbar hideSearch={isModulePage} hideIcons={isModulePage} />}
        <main className="flex-1 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
