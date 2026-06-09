import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";

export const metadata = { title: "Reviews" };

export default function ReviewsPage() {
  return (
    <DashboardShell>
      <PageHeader eyebrow="Critic mode" title="Reviews" description="Write, edit, and moderate your public or private reviews." />
      <div className="space-y-4">
        {["A visually overwhelming masterpiece.", "Smart, emotional, and rewatchable.", "A perfect late-night sci-fi pick."].map((review) => (
          <Card key={review}><CardContent className="p-6"><p className="text-slate-300">{review}</p></CardContent></Card>
        ))}
      </div>
    </DashboardShell>
  );
}
