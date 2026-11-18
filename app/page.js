"use client";
import Link from "next/link";
import { ArrowRight, ClipboardCheck, Plus } from "lucide-react";
import { useStore } from "@/components/Store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Dashboard() {
  const { students, batches } = useStore();
  const unassigned = students.filter((s) => !s.batchName);
  const stats = [
    { label: "Students", value: students.length },
    { label: "Batches", value: batches.length, warn: false },
    { label: "Without a batch", value: unassigned.length, warn: true },
  ];

  return (
    <div className="space-y-5">
      <section className="rounded-2xl border bg-gradient-to-br from-card to-[hsl(var(--hero-tint))] p-8 max-[860px]:p-6">
        <h1 className="max-w-xl max-[860px]:text-2xl">Keep every batch on track.</h1>
        <p className="mt-2 max-w-[46ch] text-muted-foreground">
          {students.length} students across {batches.length} batches. {unassigned.length} still waiting for a batch.
        </p>
        <div className="mt-6 flex flex-wrap gap-2.5">
          <Button asChild>
            <Link href="/students"><Plus />Add student</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/attendance"><ClipboardCheck />Take attendance</Link>
          </Button>
        </div>
      </section>

      <div className="grid grid-cols-3 gap-3.5 max-[860px]:grid-cols-1">
        {stats.map((s) => (
          <Card key={s.label} className="p-5">
            <b className={"block text-[32px] font-extrabold leading-none " + (s.warn ? "text-primary" : "text-foreground")}>{s.value}</b>
            <span className="mt-2 block text-sm text-muted-foreground">{s.label}</span>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0 p-5">
          <CardTitle>Batches</CardTitle>
          <Button asChild variant="link" className="h-auto p-0 text-sm text-success">
            <Link href="/batches">Manage batches<ArrowRight /></Link>
          </Button>
        </CardHeader>
        <CardContent className="px-2 pb-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Batch</TableHead>
                <TableHead>Start</TableHead>
                <TableHead>Classes</TableHead>
                <TableHead>Students</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {batches.map((b) => (
                <TableRow key={b._id}>
                  <TableCell className="font-semibold">{b.batchName}</TableCell>
                  <TableCell className="text-muted-foreground">{b.startDate}</TableCell>
                  <TableCell className="text-muted-foreground">{b.totalClass}</TableCell>
                  <TableCell>
                    <Badge variant="success">{students.filter((s) => s.batchName === b.batchName).length}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
