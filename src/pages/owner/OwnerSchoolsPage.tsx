import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  EmptyState,
  MockDataNotice,
  PageHeader,
  StatusBadge,
} from "@/components/common/ui-kit";
import { Card } from "@/components/ui/card";
import { schoolsService } from "@/services";
import { formatDate, formatNumber } from "@/utils/format";

export function OwnerSchoolsPage() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const { data } = useQuery({ queryKey: ["schools"], queryFn: () => schoolsService.list() });

  const schools = (data ?? []).filter((school) =>
    `${school.name} ${school.code} ${school.city}`.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <PageHeader
        title="Schools"
        description="All schools onboarded on the platform."
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>Add school</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add school</DialogTitle>
                <DialogDescription>
                  Submitting will call POST /schools on the FastAPI backend once it is available.
                </DialogDescription>
              </DialogHeader>
              <form
                className="grid gap-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  setOpen(false);
                  toast.info("Backend not connected yet", {
                    description: "School creation will be handled by the FastAPI API.",
                  });
                }}
              >
                <div className="grid gap-2">
                  <Label htmlFor="school-name">School name</Label>
                  <Input id="school-name" placeholder="Greenwood International School" required />
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="school-code">Code</Label>
                    <Input id="school-code" placeholder="GWIS" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="school-city">City</Label>
                    <Input id="school-city" placeholder="Pune" required />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Create school</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        }
      />
      <MockDataNotice />

      <div className="mb-4 max-w-sm">
        <Input
          placeholder="Search schools…"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      {schools.length === 0 ? (
        <EmptyState title="No schools found" description="Try a different search term." />
      ) : (
        <Card className="overflow-hidden p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>School</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead className="text-right">Students</TableHead>
                  <TableHead className="text-right">Credits</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Onboarded</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schools.map((school) => (
                  <TableRow key={school.id}>
                    <TableCell className="font-medium">{school.name}</TableCell>
                    <TableCell className="text-muted-foreground">{school.code}</TableCell>
                    <TableCell>{school.city}</TableCell>
                    <TableCell className="text-right tabular-nums">
                      {formatNumber(school.studentsCount)}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {formatNumber(school.credits)}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={school.status} />
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDate(school.createdAt)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      )}
    </>
  );
}
