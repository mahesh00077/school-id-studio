import { useQuery } from "@tanstack/react-query";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MockDataNotice, PageHeader } from "@/components/common/ui-kit";
import { designsService } from "@/services";
import { formatDate } from "@/utils/format";

export function DesignsPage({
  title,
  description,
  schoolId,
}: {
  title: string;
  description: string;
  schoolId?: string;
}) {
  const { data } = useQuery({
    queryKey: ["designs", schoolId ?? "all"],
    queryFn: () => designsService.list(schoolId ? { schoolId } : undefined),
  });

  return (
    <>
      <PageHeader title={title} description={description} />
      <MockDataNotice />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {(data ?? []).map((design) => (
          <Card key={design.id}>
            <CardHeader className="space-y-0">
              <CardTitle className="text-base">{design.name}</CardTitle>
              <p className="text-xs text-muted-foreground">Updated {formatDate(design.updatedAt)}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div
                className={
                  design.orientation === "PORTRAIT"
                    ? "mx-auto aspect-[54/86] w-28 rounded-md border bg-muted"
                    : "mx-auto aspect-[86/54] w-40 rounded-md border bg-muted"
                }
                aria-hidden
              />
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{design.orientation.toLowerCase()}</Badge>
                <Badge variant="secondary">{design.hasBackSide ? "front + back" : "front only"}</Badge>
                {schoolId ? null : (
                  <Badge variant="outline">{design.assignedSchools} schools</Badge>
                )}
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Form fields
                </p>
                <p className="mt-1 text-sm">{design.fields.join(", ")}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
