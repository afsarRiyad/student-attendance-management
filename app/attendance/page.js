"use client";
import { useMemo, useState } from "react";
import { CheckCheck } from "lucide-react";
import { useStore } from "@/components/Store";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

function StateSwitch({ checked, onChange, onLabel, offLabel, label }) {
  return (
    <div className="flex items-center gap-2.5">
      <Switch
        checked={checked}
        onCheckedChange={onChange}
        aria-label={label}
        className="data-[state=checked]:bg-success"
      />
      <span className={cn("text-xs font-semibold", checked ? "text-success" : "text-muted-foreground")}>
        {checked ? onLabel : offLabel}
      </span>
    </div>
  );
}

export default function Attendance() {
  const { students, batches, notify } = useStore();
  const [batchId, setBatchId] = useState(batches[0]?._id || "");
  const [classNo, setClassNo] = useState("1");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [marks, setMarks] = useState({}); // { studentId: { attendance, homeWork } }
  const batch = batches.find((b) => b._id === batchId);
  const rows = useMemo(() => students.filter((s) => s.batchName === batch?.batchName), [students, batch]);
  const get = (id) => marks[id] || { attendance: "absent", homeWork: "not done" };
  const put = (id, patch) => setMarks({ ...marks, [id]: { ...get(id), ...patch } });
  const present = rows.filter((r) => get(r._id).attendance === "present").length;
  const hw = rows.filter((r) => get(r._id).homeWork === "done").length;
  const markAll = () => { const m = { ...marks }; rows.forEach((r) => (m[r._id] = { ...get(r._id), attendance: "present" })); setMarks(m); };
  const save = () => {
    // Matches your attendance model
    const payload = { classNo, batch: batchId,
      students: rows.map((r) => ({ studentID: r._id, classDate: date, ...get(r._id) })) };
    console.log(payload); notify(`Attendance saved for class ${classNo}`);
  };

  return (
    <div className="space-y-5">
      <div>
        <h1>Attendance</h1>
        <p className="mt-1 text-muted-foreground">Mark presence and homework for one class.</p>
      </div>

      <Card>
        <CardContent className="space-y-4 p-5">
          <div className="grid items-end gap-3 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_auto]">
            <Label htmlFor="batch">Batch
              <Select value={batchId} onValueChange={(v) => { setBatchId(v); setMarks({}); }}>
                <SelectTrigger id="batch"><SelectValue placeholder="Select a batch" /></SelectTrigger>
                <SelectContent>
                  {batches.map((b) => <SelectItem key={b._id} value={b._id}>{b.batchName}</SelectItem>)}
                </SelectContent>
              </Select>
            </Label>
            <Label htmlFor="classNo">Class no<Input id="classNo" type="number" min={1} max={batch?.totalClass} value={classNo} onChange={(e) => setClassNo(e.target.value)} /></Label>
            <Label htmlFor="classDate">Class date<Input id="classDate" type="date" value={date} onChange={(e) => setDate(e.target.value)} /></Label>
            <Button variant="outline" onClick={markAll}><CheckCheck />Mark all present</Button>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <span><b className="text-lg text-foreground">{present}</b>/{rows.length} present</span>
            <span><b className="text-lg text-foreground">{hw}</b>/{rows.length} homework done</span>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Attendance</TableHead>
                <TableHead>Homework</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="py-10 text-center text-muted-foreground">
                    This batch has no students. Add some from Batches.
                  </TableCell>
                </TableRow>
              )}
              {rows.map((r) => {
                const m = get(r._id);
                return (
                  <TableRow key={r._id}>
                    <TableCell className="text-muted-foreground">{r.studentId}</TableCell>
                    <TableCell className="font-semibold">{r.fullName}</TableCell>
                    <TableCell>
                      <StateSwitch
                        checked={m.attendance === "present"}
                        onChange={(v) => put(r._id, { attendance: v ? "present" : "absent" })}
                        onLabel="Present"
                        offLabel="Absent"
                        label={`Attendance for ${r.fullName}`}
                      />
                    </TableCell>
                    <TableCell>
                      <StateSwitch
                        checked={m.homeWork === "done"}
                        onChange={(v) => put(r._id, { homeWork: v ? "done" : "not done" })}
                        onLabel="Done"
                        offLabel="Not done"
                        label={`Homework for ${r.fullName}`}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          <div className="flex justify-end">
            <Button onClick={save} disabled={!rows.length}>Save attendance</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
