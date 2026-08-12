import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { PageHeader, SectionCard } from "@/components/common/ui-kit";
import { API_BASE_URL, API_CONFIGURED } from "@/services/api";
import { toast } from "sonner";

export function OwnerSettingsPage() {
  return (
    <>
      <PageHeader
        title="Settings"
        description="Platform configuration. Authentication, roles and limits are enforced by the backend."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard title="Platform" description="Branding shown across portals.">
          <form
            className="grid gap-4"
            onSubmit={(event) => {
              event.preventDefault();
              toast.info("Backend not connected yet", {
                description: "Settings persist through the FastAPI API.",
              });
            }}
          >
            <div className="grid gap-2">
              <Label htmlFor="platform-name">Platform name</Label>
              <Input id="platform-name" defaultValue="IDSuite" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="support-email">Support email</Label>
              <Input id="support-email" type="email" defaultValue="support@idsuite.app" />
            </div>
            <Separator />
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium">Require photo background removal</p>
                <p className="text-sm text-muted-foreground">
                  Applied server-side during ID generation.
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div>
              <Button type="submit">Save settings</Button>
            </div>
          </form>
        </SectionCard>

        <SectionCard title="API connection" description="Configured via environment variables.">
          <dl className="grid gap-3 text-sm">
            <div className="flex items-center justify-between gap-4">
              <dt className="text-muted-foreground">VITE_API_BASE_URL</dt>
              <dd className="truncate font-mono text-xs">
                {API_CONFIGURED ? API_BASE_URL : "not set"}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-muted-foreground">Status</dt>
              <dd>{API_CONFIGURED ? "Live API" : "Mock data mode"}</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-muted-foreground">Auth transport</dt>
              <dd>httpOnly cookies (backend issued)</dd>
            </div>
          </dl>
          <p className="mt-4 text-sm text-muted-foreground">
            No credentials, credits or authorization decisions are stored in the browser.
          </p>
        </SectionCard>
      </div>
    </>
  );
}
