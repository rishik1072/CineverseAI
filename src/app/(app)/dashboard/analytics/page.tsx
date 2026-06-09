import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { AnalyticsCharts } from "@/components/charts/analytics-charts";
import { PageHeader } from "@/components/shared/page-header";

export default function AnalyticsPage() {
  return (
    <DashboardShell>
      <PageHeader eyebrow="Taste analytics" title="Viewing Analytics" description="Average ratings, favorite genres, activity graphs, and taste drift." />
      <AnalyticsCharts />
    </DashboardShell>
  );
}
