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
import { EmptyState, PageHeader, StatusBadge } from "@/components/common/ui-kit";
import { Card } from "@/components/ui/card";
import { schoolsService } from "@/services";
import type { School } from "@/types";

export function OwnerSchoolsPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  const { data } = useQuery({ queryKey: ["schools"], queryFn: () => schoolsService.list() });

  const createSchool = useMutation({
    mutationFn: (payload: { name: string; code: string }) => schoolsService.create(payload),
    onSuccess: () => {
      toast.success("School created successfully");
      setOpen(false);
      setName("");
      setCode("");
      queryClient.invalidateQueries({ queryKey: ["schools"] });
    },
    onError: (error: unknown) => {
      const message =
        error instanceof Error ? error.message : "Failed to create school. Please try again.";
      toast.error("Could not create school", { description: message });
    },
  });

  const schools = (data ?? []).filter((school) =>
    `${school.name} ${school.code}`.toLowerCase().includes(search.toLowerCase()),
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedCode = code.trim();

    if (!trimmedName || !trimmedCode) {
      toast.error("School name and code are required");
      return;
    }

    createSchool.mutate({ name: trimmedName, code: trimmedCode });
  }

  function handleOpenChange(nextOpen: boolean) {
    if (createSchool.isPending) return;
    setOpen(nextOpen);
    if (!nextOpen) {
      setName("");
      setCode("");
    }
  }

  function statusFromSchool(school: School): "ACTIVE" | "INACTIVE" {
    return school.is_active ? "ACTIVE" : "INACTIVE";
  }

  return (
    <>
      <PageHeader
        title="Schools"
        description="All schools onboarded on the platform."
        actions={
          <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
              <Button>Add school</Button>
            </DialogTrigger>
            <DialogContent onPointerDownOutside={(e) => createSchool.isPending && e.preventDefault()}>
              <DialogHeader>
                <DialogTitle>Add school</DialogTitle>
                <DialogDescription>Create a new school on the platform.</DialogDescription>
              </DialogHeader>
              <form className="grid gap-4" onSubmit={handleSubmit}>
                <div className="grid gap-2">
                  <Label htmlFor="school-name">School name</Label>
                  <Input
                    id="school-name"
                    placeholder="Greenwood International School"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    disabled={createSchool.isPending}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="school-code">Code</Label>
                  <Input
                    id="school-code"
                    placeholder="GWIS"
                    value={code}
                    onChange={(event) => setCode(event.target.value)}
                    disabled={createSchool.isPending}
                    required
                  />
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    disabled={createSchool.isPending}
                    onClick={() => handleOpenChange(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={createSchool.isPending}>
                    {createSchool.isPending ? "Creating..." : "Create school"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        }
      />

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
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schools.map((school) => (
                  <TableRow key={school.id}>
                    <TableCell className="font-medium">{school.name}</TableCell>
                    <TableCell className="text-muted-foreground">{school.code}</TableCell>
                    <TableCell>
                      <StatusBadge status={statusFromSchool(school)} />
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
