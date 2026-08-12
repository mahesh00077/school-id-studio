import { useQuery } from "@tanstack/react-query";
import { Check } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader, SectionCard } from "@/components/common/ui-kit";
import { designsService } from "@/services";
import { cn } from "@/lib/utils";

/**
 * Placeholder for the ID generation wizard.
 *
 * The real flow (design selection -> dynamic student form -> photo upload ->
 * background removal -> preview & auto-fit -> server-side credit validation ->
 * JPEG generation -> download) is implemented in a later phase. Every step is
 * executed and validated by the FastAPI backend; this screen only reserves the
 * structure so the modules can be dropped in cleanly.
 */

const STEPS = [
  "Select design",
  "Student details",
  "Upload photo",
  "Background removal",
  "Preview & adjust",
  "Front + back review",
  "Generate & download",
];

export function CreateIdCardPage() {
  const { data } = useQuery({
    queryKey: ["designs", "assigned"],
    queryFn: () => designsService.list({ schoolId: "sch_001" }),
  });

  return (
    <>
      <PageHeader
        title="Generate ID card"
        description="Guided flow for producing a student photo ID card. Credit validation and rendering run on the server."
      />

      <Card className="mb-6">
        <CardContent className="p-5">
          <ol className="flex flex-wrap gap-x-3 gap-y-2 text-sm">
            {STEPS.map((step, index) => (
              <li key={step} className="flex items-center gap-2">
                <span
                  className={cn(
                    "flex size-6 items-center justify-center rounded-full text-xs font-medium",
                    index === 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                  )}
                >
                  {index === 0 ? <Check className="size-3.5" /> : index + 1}
                </span>
                <span className={index === 0 ? "font-medium" : "text-muted-foreground"}>{step}</span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-3">
        <SectionCard
          title="Step 1 — Select a design"
          description="Only designs assigned to your school are available."
          className="lg:col-span-2"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {(data ?? []).map((design) => (
              <button
                key={design.id}
                type="button"
                className="rounded-lg border p-4 text-left transition-colors hover:border-primary hover:bg-accent/50"
              >
                <p className="text-sm font-medium">{design.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {design.orientation.toLowerCase()} ·{" "}
                  {design.hasBackSide ? "front + back" : "front only"}
                </p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {design.fields.slice(0, 3).map((field) => (
                    <Badge key={field} variant="secondary" className="font-normal">
                      {field}
                    </Badge>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="What happens next" description="Reserved for the generation modules.">
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Dynamic student form built from the design's field schema.</li>
            <li>Photo upload with server-side background removal to white.</li>
            <li>Live preview with auto-fit and manual adjustment.</li>
            <li>Credit check, clean JPEG render and single-credit deduction on the server.</li>
          </ul>
          <Button className="mt-4 w-full" disabled>
            Continue — available in the next phase
          </Button>
        </SectionCard>
      </div>
    </>
  );
}
