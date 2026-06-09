import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";

export default function NotificationsPage() {
  return (
    <DashboardShell>
      <PageHeader eyebrow="Release radar" title="Notifications" description="Follow actors, directors, and franchises to get new release alerts." />
      <div className="space-y-4">
        {["Dune franchise update", "New Denis Villeneuve project rumored", "Watch party invite pending"].map((title) => <Card key={title}><CardContent className="p-6"><h2 className="font-bold">{title}</h2><p className="mt-2 text-sm text-slate-400">Unread notification sample</p></CardContent></Card>)}
      </div>
    </DashboardShell>
  );
}
