import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Building2, CreditCard, IdCard, TrendingUp, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MockDataNotice, PageHeader, SectionCard, StatCard } from "@/components/common/ui-kit";
import { ownerService } from "@/services";
import { formatDateTime, formatNumber } from "@/utils/format";

export function OwnerDashboardPage() {
  const stats = useQuery({ queryKey: ["owner", "stats"], queryFn: ownerService.getStats });
  const activity = useQuery({ queryKey: ["owner", "activity"], queryFn: ownerService.getActivity });

  return (
    <>
      <PageHeader
        title="Owner dashboard"
        description="Platform-wide overview of schools, users, credits and generated ID cards."
        actions={
          <Button asChild>
            <Link to="/owner/schools">Manage schools</Link>
          </Button>
        }
      />
      <MockDataNotice />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard
          label="Total schools"
          value={formatNumber(stats.data?.totalSchools ?? 0)}
          icon={Building2}
        />
        <StatCard
          label="Active schools"
          value={formatNumber(stats.data?.activeSchools ?? 0)}
          icon={TrendingUp}
        />
        <StatCard label="Total users" value={formatNumber(stats.data?.totalUsers ?? 0)} icon={Users} />
        <StatCard
          label="Available credits"
          value={formatNumber(stats.data?.totalCredits ?? 0)}
          icon={CreditCard}
        />
        <StatCard
          label="ID cards generated"
          value={formatNumber(stats.data?.totalCardsGenerated ?? 0)}
          icon={IdCard}
        />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <SectionCard
          title="Recent activity"
          description="Latest events across all schools."
          className="lg:col-span-2"
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

        <SectionCard title="Quick actions" description="Common owner operations.">
          <div className="grid gap-2">
            <Button asChild variant="outline" className="justify-start">
              <Link to="/owner/schools">Add or edit a school</Link>
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <Link to="/owner/credits">Allocate credits</Link>
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <Link to="/owner/designs">Assign card designs</Link>
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <Link to="/owner/users">Invite a user</Link>
            </Button>
          </div>
        </SectionCard>
      </div>
    </>
  );
}
