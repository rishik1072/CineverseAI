import { AdminShell } from "@/components/admin/admin-shell";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminReviewsPage() {
  return (
    <AdminShell>
      <PageHeader eyebrow="Admin" title="Reviews" description="Production-ready admin route protected by middleware and role checks." />
      <Card><CardContent className="p-6"><p className="text-slate-300">Reviews management workspace wired to /api/admin/reviews.</p></CardContent></Card>
    </AdminShell>
  );
}
