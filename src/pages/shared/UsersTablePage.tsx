import { useQuery } from "@tanstack/react-query";

import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MockDataNotice, PageHeader, StatusBadge } from "@/components/common/ui-kit";
import { usersService } from "@/services";
import { ROLE_LABELS, formatDateTime } from "@/utils/format";

export function UsersTablePage({
  title,
  description,
  schoolId,
  actions,
}: {
  title: string;
  description: string;
  schoolId?: string;
  actions?: React.ReactNode;
}) {
  const { data } = useQuery({
    queryKey: ["users", schoolId ?? "all"],
    queryFn: () => usersService.list(schoolId ? { schoolId } : undefined),
  });

  return (
    <>
      <PageHeader title={title} description={description} actions={actions} />
      <MockDataNotice />
      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>School</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last active</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(data ?? []).map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell className="text-muted-foreground">{user.email}</TableCell>
                  <TableCell>{ROLE_LABELS[user.role]}</TableCell>
                  <TableCell>{user.schoolName ?? "—"}</TableCell>
                  <TableCell>
                    <StatusBadge status={user.status} />
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDateTime(user.lastActiveAt)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </>
  );
}
