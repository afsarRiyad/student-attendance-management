"use client";
import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, ArrowUpDown, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useStore } from "@/components/Store";
import Modal from "@/components/Modal";
import StudentForm from "@/components/StudentForm";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const columns = [
  { key: "studentId", label: "ID" },
  { key: "fullName", label: "Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "batchName", label: "Batch" },
  { key: "city", label: "City", get: (s) => s.address.city },
];

const valueOf = (student, key) => {
  const column = columns.find((c) => c.key === key);
  return column?.get ? column.get(student) : student[key];
};

export default function Students() {
  const { students, deleteStudent } = useStore();
  const [q, setQ] = useState("");
  const [modal, setModal] = useState(null); // null | "new" | student
  const [sort, setSort] = useState({ key: null, dir: "asc" });

  const list = useMemo(() => {
    const filtered = students.filter((s) =>
      (s.fullName + s.studentId + s.email + s.batchName).toLowerCase().includes(q.toLowerCase())
    );
    if (!sort.key) return filtered;
    return [...filtered].sort((a, b) => {
      const av = valueOf(a, sort.key);
      const bv = valueOf(b, sort.key);
      const cmp =
        typeof av === "number" && typeof bv === "number"
          ? av - bv
          : String(av ?? "").localeCompare(String(bv ?? ""), undefined, { numeric: true, sensitivity: "base" });
      return sort.dir === "asc" ? cmp : -cmp;
    });
  }, [students, q, sort]);

  const toggleSort = (key) =>
    setSort((s) => (s.key === key ? { key, dir: s.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" }));

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1>Students</h1>
          <p className="mt-1 text-muted-foreground">Create, update and find students. Click a column to sort.</p>
        </div>
        <Button onClick={() => setModal("new")}><Plus />New student</Button>
      </div>

      <Card>
        <CardContent className="space-y-3 p-5">
          <div className="relative max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-9" placeholder="Search students" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((c) => {
                  const active = sort.key === c.key;
                  return (
                    <TableHead
                      key={c.key}
                      aria-sort={active ? (sort.dir === "asc" ? "ascending" : "descending") : "none"}
                    >
                      <button
                        type="button"
                        onClick={() => toggleSort(c.key)}
                        className="inline-flex items-center gap-1.5 rounded text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
                        title={`Sort by ${c.label.toLowerCase()}`}
                      >
                        {c.label}
                        {active ? (
                          sort.dir === "asc" ? <ArrowUp className="h-3.5 w-3.5" /> : <ArrowDown className="h-3.5 w-3.5" />
                        ) : (
                          <ArrowUpDown className="h-3.5 w-3.5 opacity-40" />
                        )}
                      </button>
                    </TableHead>
                  );
                })}
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {list.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="py-10 text-center text-muted-foreground">
                    No students found. Try another search or add one.
                  </TableCell>
                </TableRow>
              )}
              {list.map((s) => (
                <TableRow key={s._id}>
                  <TableCell className="text-muted-foreground">{s.studentId}</TableCell>
                  <TableCell className="font-semibold">{s.fullName}</TableCell>
                  <TableCell className="text-muted-foreground">{s.email}</TableCell>
                  <TableCell className="text-muted-foreground">{s.phone}</TableCell>
                  <TableCell>
                    {s.batchName ? <Badge variant="success">{s.batchName}</Badge> : <Badge variant="muted">None</Badge>}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{s.address.city}</TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1.5">
                      <Button size="sm" variant="ghost" onClick={() => setModal(s)}><Pencil />Edit</Button>
                      <Button size="sm" variant="ghost"
                        className="text-primary hover:bg-primary/10 hover:text-primary"
                        onClick={() => confirm(`Delete ${s.fullName}?`) && deleteStudent(s._id)}>
                        <Trash2 />Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {modal && (
        <Modal title={modal === "new" ? "New student" : "Update student"} onClose={() => setModal(null)} wide>
          <StudentForm initial={modal === "new" ? null : modal} onDone={() => setModal(null)} />
        </Modal>
      )}
    </div>
  );
}
