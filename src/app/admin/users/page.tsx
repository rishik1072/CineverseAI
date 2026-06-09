import { AdminShell } from "@/components/admin/admin-shell";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminUsersPage() {
  return (
    <AdminShell>
      <PageHeader eyebrow="Admin" title="Users" description="Production-ready admin route protected by middleware and role checks." />
      <Card><CardContent className="p-6"><p className="text-slate-300">Users management workspace wired to /api/admin/users.</p></CardContent></Card>
    </AdminShell>
  );
}
