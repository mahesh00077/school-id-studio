import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
  PageHeader,
} from "@/components/common/ui-kit";
import { Card } from "@/components/ui/card";
import { schoolsService } from "@/services";

export function OwnerSchoolsPage() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["schools"],
    queryFn: () => schoolsService.list(),
  });

  const schools = (data ?? []).filter((school) =>
    `${school.name} ${school.code}`
      .toLowerCase()
      .includes(search.toLowerCase()),
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
                  Create a new school.
                </DialogDescription>
              </DialogHeader>

              <form
                className="grid gap-4"
                onSubmit={(event) => {
                  event.preventDefault();

                  toast.info("School creation API will be connected next.");
                  setOpen(false);
                }}
              >
                <div className="grid gap-2">
                  <Label htmlFor="school-name">School name</Label>
                  <Input
                    id="school-name"
                    placeholder="Andhra Loyola Institute"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="school-code">Code</Label>
                  <Input
                    id="school-code"
                    placeholder="ALIET"
                    required
                  />
                </div>

                <DialogFooter>
                  <Button type="submit">
                    Create school
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="mb-4 max-w-sm">
        <Input
          placeholder="Search schools..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      {isLoading ? (
        <Card className="p-6">
          Loading schools...
        </Card>
      ) : isError ? (
        <Card className="p-6 text-destructive">
          Failed to load schools.
        </Card>
      ) : schools.length === 0 ? (
        <EmptyState
          title="No schools found"
          description="Try a different search term."
        />
      ) : (
        <Card className="overflow-hidden p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>School</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {schools.map((school) => (
                  <TableRow key={school.id}>
                    <TableCell className="font-medium">
                      {school.id}
                    </TableCell>

                    <TableCell className="font-medium">
                      {school.name}
                    </TableCell>

                    <TableCell className="text-muted-foreground">
                      {school.code}
                    </TableCell>

                    <TableCell>
                      {school.is_active ? (
                        <span className="inline-flex rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700">
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-700">
                          Inactive
                        </span>
                      )}
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