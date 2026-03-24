import { createBrowserRouter } from "react-router";
import { AppLayout } from "./components/layout/AppLayout";
import { TicketsPage } from "./pages/TicketsPage";
import { AnalyticsPage } from "./pages/AnalyticsPage";
import { SettingsPage } from "./pages/SettingsPage";
import { DashboardPage } from "./pages/DashboardPage";
import { FreddyInsightsPage } from "./pages/FreddyInsightsPage";
import { ContactsPage } from "./pages/ContactsPage";
import { CompaniesPage } from "./pages/CompaniesPage";
import { AdminPage } from "./pages/AdminPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    children: [
      { index: true, Component: DashboardPage },
      { path: "freddy-insights", Component: FreddyInsightsPage },
      { path: "dashboard", Component: DashboardPage },
      { path: "tickets", Component: TicketsPage },
      { path: "tickets/:ticketId", Component: TicketsPage },
      { path: "contacts", Component: ContactsPage },
      { path: "companies", Component: CompaniesPage },
      { path: "analytics", Component: AnalyticsPage },
      { path: "admin", Component: AdminPage },
      { path: "settings", Component: SettingsPage },
    ],
  },
]);
