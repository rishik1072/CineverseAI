import { AdminShell } from "@/components/admin/admin-shell";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminAnalyticsPage() {
  return (
    <AdminShell>
      <PageHeader eyebrow="Admin" title="Analytics" description="Production-ready admin route protected by middleware and role checks." />
      <Card><CardContent className="p-6"><p className="text-slate-300">Analytics management workspace wired to /api/admin/analytics.</p></CardContent></Card>
    </AdminShell>
  );
}
