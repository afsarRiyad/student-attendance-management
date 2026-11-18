"use client";
import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, Plus, UserPlus } from "lucide-react";
import { useStore } from "@/components/Store";
import Modal from "@/components/Modal";
import StudentPicker from "@/components/StudentPicker";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const empty = { batchName: "", startDate: "", endDate: "", totalClass: "" };

export default function Batches() {
  const { students, batches, createBatch, addToBatch } = useStore();
  const [modal, setModal] = useState(null); // "new" | batch
  const [sel, setSel] = useState([]);
  const [f, setF] = useState(empty);
  const [sortKey, setSortKey] = useState("name");
  const [asc, setAsc] = useState(true);

  const sorted = useMemo(() => {
    const sizeOf = (batch) => students.filter((s) => s.batchName === batch.batchName).length;
    const valueOf = (batch) =>
      sortKey === "start" ? batch.startDate || ""
        : sortKey === "students" ? sizeOf(batch)
        : sortKey === "classes" ? Number(batch.totalClass || 0)
        : sortKey === "created" ? Number(String(batch._id).replace(/\D/g, "")) || 0
        : batch.batchName;
    return [...batches].sort((a, b) => {
      const av = valueOf(a);
      const bv = valueOf(b);
      const cmp =
        typeof av === "number" && typeof bv === "number"
          ? av - bv
          : String(av).localeCompare(String(bv), undefined, { numeric: true, sensitivity: "base" });
      return asc ? cmp : -cmp;
    });
  }, [batches, students, sortKey, asc]);

  const close = () => { setModal(null); setSel([]); setF(empty); };
  const submit = (e) => { e.preventDefault(); createBatch({ ...f, totalClass: Number(f.totalClass) }, sel); close(); };
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1>Batches</h1>
          <p className="mt-1 text-muted-foreground">Create a batch by searching students, or add students to one that exists.</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-muted-foreground">Sort by</span>
          <Select value={sortKey} onValueChange={setSortKey}>
            <SelectTrigger className="h-9 w-[168px]" aria-label="Sort batches by">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Batch name</SelectItem>
              <SelectItem value="start">Start date</SelectItem>
              <SelectItem value="students">Students</SelectItem>
              <SelectItem value="classes">Total classes</SelectItem>
              <SelectItem value="created">Recently created</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9"
            onClick={() => setAsc((v) => !v)}
            aria-label={asc ? "Ascending — switch to descending" : "Descending — switch to ascending"}
            title={asc ? "Ascending" : "Descending"}
          >
            {asc ? <ArrowUp /> : <ArrowDown />}
          </Button>
          <Button onClick={() => setModal("new")}><Plus />New batch</Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {sorted.map((b) => {
          const members = students.filter((s) => s.batchName === b.batchName);
          return (
            <Card key={b._id} className="flex flex-col gap-3 p-5">
              <div className="flex items-start justify-between gap-2">
                <h2 className="truncate">{b.batchName}</h2>
                <Badge variant="success" className="shrink-0">{members.length} students</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {b.startDate || "No start date"} → {b.endDate || "ongoing"} · {b.totalClass} classes
              </p>
              <div className="flex flex-wrap gap-1.5">
                {members.slice(0, 5).map((m) => <Badge key={m._id} variant="muted">{m.fullName}</Badge>)}
                {members.length > 5 && <Badge variant="muted">+{members.length - 5}</Badge>}
                {members.length === 0 && <span className="text-sm text-muted-foreground">No students yet</span>}
              </div>
              <Button variant="outline" size="sm" className="mt-auto self-start" onClick={() => setModal(b)}>
                <UserPlus />Add students
              </Button>
            </Card>
          );
        })}
      </div>

      {modal === "new" && (
        <Modal title="Create batch" onClose={close} wide>
          <form className="space-y-4" onSubmit={submit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <Label htmlFor="batchName">Batch name<Input id="batchName" required value={f.batchName} onChange={set("batchName")} /></Label>
              <Label htmlFor="totalClass">Total classes<Input id="totalClass" required type="number" min={1} value={f.totalClass} onChange={set("totalClass")} /></Label>
              <Label htmlFor="startDate">Start date<Input id="startDate" required type="date" value={f.startDate} onChange={set("startDate")} /></Label>
              <Label htmlFor="endDate">End date<Input id="endDate" type="date" value={f.endDate} onChange={set("endDate")} /></Label>
            </div>

            <h4 className="pt-1 text-sm font-bold">Add students ({sel.length} selected)</h4>
            <StudentPicker students={students} selected={sel} onChange={setSel} />

            <div className="flex justify-end gap-2.5 pt-1">
              <Button type="button" variant="outline" onClick={close}>Cancel</Button>
              <Button>Create batch</Button>
            </div>
          </form>
        </Modal>
      )}

      {modal && modal !== "new" && (
        <Modal title={`Add students to ${modal.batchName}`} onClose={close}>
          <div className="space-y-4">
            <StudentPicker students={students.filter((s) => s.batchName !== modal.batchName)} selected={sel} onChange={setSel} />
            <div className="flex justify-end gap-2.5">
              <Button variant="outline" onClick={close}>Cancel</Button>
              <Button disabled={!sel.length} onClick={() => { addToBatch(modal, sel); close(); }}>
                Add {sel.length || ""} to batch
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
