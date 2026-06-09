import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";

export default function SettingsPage() {
  return (
    <DashboardShell>
      <PageHeader eyebrow="Preferences" title="Settings" description="Profile, region, language, adult content, runtime, and notification preferences." />
      <Card>
        <CardContent className="space-y-4 p-6">
          <Input placeholder="Display name" />
          <Input placeholder="Preferred language" defaultValue="en" />
          <Input placeholder="Region" defaultValue="US" />
          <Button>Save preferences</Button>
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
