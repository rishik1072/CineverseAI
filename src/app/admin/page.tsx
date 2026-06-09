import { AdminShell } from "@/components/admin/admin-shell";
import { DashboardStatsCards } from "@/components/dashboard/stats-cards";
import { PageHeader } from "@/components/shared/page-header";

export const metadata = { title: "Admin" };

export default function AdminPage() {
  return <AdminShell><PageHeader eyebrow="Platform ops" title="Admin Dashboard" description="User management, review moderation, reports, and platform analytics." /><DashboardStatsCards /></AdminShell>;
}
