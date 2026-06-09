import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DashboardStatsCards } from "@/components/dashboard/stats-cards";
import { AnalyticsCharts } from "@/components/charts/analytics-charts";
import { PageHeader } from "@/components/shared/page-header";

export const metadata = { title: "Dashboard" };

export default function DashboardPage() {
  return (
    <DashboardShell>
      <PageHeader eyebrow="Private workspace" title="Dashboard" description="Track your watchlist, favorites, ratings, review activity, and AI taste profile." />
      <DashboardStatsCards />
      <div className="mt-6">
        <AnalyticsCharts />
      </div>
    </DashboardShell>
  );
}
