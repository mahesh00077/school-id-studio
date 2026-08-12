import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { CreditCard, IdCard, Palette, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MockDataNotice, PageHeader, SectionCard, StatCard } from "@/components/common/ui-kit";
import { schoolPortalService } from "@/services";
import { formatDateTime, formatNumber } from "@/utils/format";

export function SchoolDashboardPage() {
  const stats = useQuery({ queryKey: ["school", "stats"], queryFn: () => schoolPortalService.getStats() });
  const activity = useQuery({
    queryKey: ["school", "activity"],
    queryFn: () => schoolPortalService.getActivity(),
  });

  return (
    <>
      <PageHeader
        title="School dashboard"
        description="Credits, assigned designs and recent ID card generation."
        actions={
          <Button asChild>
            <Link to="/school/id-cards/create">Generate ID card</Link>
          </Button>
        }
      />
      <MockDataNotice />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Available credits"
          value={formatNumber(stats.data?.availableCredits ?? 0)}
          hint="Validated server-side at generation"
          icon={CreditCard}
        />
        <StatCard
          label="Assigned designs"
          value={formatNumber(stats.data?.assignedDesigns ?? 0)}
          icon={Palette}
        />
        <StatCard
          label="Total IDs generated"
          value={formatNumber(stats.data?.totalGenerated ?? 0)}
          icon={IdCard}
        />
        <StatCard
          label="Generated this month"
          value={formatNumber(stats.data?.generatedThisMonth ?? 0)}
          icon={TrendingUp}
        />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <SectionCard
          title="Recent ID generation activity"
          description="Latest actions by staff at this school."
          className="lg:col-span-2"
          actions={
            <Button asChild variant="outline" size="sm">
              <Link to="/school/history">View history</Link>
            </Button>
          }
        >
          <ul className="divide-y">
            {(activity.data ?? []).map((event) => (
              <li key={event.id} className="flex flex-wrap items-baseline gap-x-2 gap-y-1 py-3">
                <span className="text-sm font-medium">{event.actor}</span>
                <span className="text-sm text-muted-foreground">{event.action}</span>
                <span className="text-sm">{event.target}</span>
                <span className="ml-auto text-xs text-muted-foreground">
                  {formatDateTime(event.createdAt)}
                </span>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Shortcuts" description="Everyday school operations.">
          <div className="grid gap-2">
            <Button asChild variant="outline" className="justify-start">
              <Link to="/school/id-cards">Browse generated cards</Link>
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <Link to="/school/designs">View assigned designs</Link>
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <Link to="/school/users">Manage school users</Link>
            </Button>
          </div>
        </SectionCard>
      </div>
    </>
  );
}
