import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MockDataNotice, PageHeader, StatCard } from "@/components/common/ui-kit";
import { creditsService, schoolsService } from "@/services";
import { formatDateTime, formatNumber } from "@/utils/format";

export function OwnerCreditsPage() {
  const [open, setOpen] = useState(false);
  const schools = useQuery({ queryKey: ["schools"], queryFn: () => schoolsService.list() });
  const transactions = useQuery({
    queryKey: ["credits"],
    queryFn: () => creditsService.listTransactions(),
  });

  return (
    <>
      <PageHeader
        title="Credits"
        description="Credit balances per school and the full allocation ledger. Deduction happens server-side at generation time."
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>Allocate credits</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Allocate credits</DialogTitle>
                <DialogDescription>
                  Balances are authoritative on the server. This form will call
                  POST /credits/allocate.
                </DialogDescription>
              </DialogHeader>
              <form
                className="grid gap-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  setOpen(false);
                  toast.info("Backend not connected yet", {
                    description: "Credit allocation is validated by the FastAPI API.",
                  });
                }}
              >
                <div className="grid gap-2">
                  <Label htmlFor="credit-school">School</Label>
                  <Select>
                    <SelectTrigger id="credit-school">
                      <SelectValue placeholder="Select a school" />
                    </SelectTrigger>
                    <SelectContent>
                      {(schools.data ?? []).map((school) => (
                        <SelectItem key={school.id} value={String(school.id)}>
                          {school.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="credit-amount">Amount</Label>
                  <Input id="credit-amount" type="number" min={1} placeholder="500" required />
                </div>
                <DialogFooter>
                  <Button type="submit">Allocate</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        }
      />
      <MockDataNotice />

      <div className="grid gap-4 sm:grid-cols-1">
        <StatCard label="Ledger entries" value={(transactions.data ?? []).length} />
      </div>

      <Card className="mt-6 overflow-hidden p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>School</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Balance after</TableHead>
                <TableHead>Note</TableHead>
                <TableHead>When</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(transactions.data ?? []).map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell className="font-medium">{tx.schoolName}</TableCell>
                  <TableCell className="capitalize">{tx.type.toLowerCase()}</TableCell>
                  <TableCell className="text-right tabular-nums">{tx.amount}</TableCell>
                  <TableCell className="text-right tabular-nums">
                    {formatNumber(tx.balanceAfter)}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{tx.note}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDateTime(tx.createdAt)}
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
