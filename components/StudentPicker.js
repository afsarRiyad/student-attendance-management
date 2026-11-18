"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

// Search students and tick them. `students` = pool to choose from.
export default function StudentPicker({ students, selected, onChange }) {
  const [q, setQ] = useState("");
  const list = students.filter((s) => (s.fullName + s.studentId + s.email).toLowerCase().includes(q.toLowerCase()));
  const toggle = (id) => onChange(selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id]);

  return (
    <div className="space-y-3">
      <Input placeholder="Search by name, ID or email" value={q} onChange={(e) => setQ(e.target.value)} />

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {selected.map((id) => {
            const s = students.find((x) => x._id === id);
            return s && (
              <button type="button" key={id} onClick={() => toggle(id)}
                className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-2.5 py-1 text-xs font-semibold text-primary transition-colors hover:bg-primary/25">
                {s.fullName}<X className="h-3 w-3" />
              </button>
            );
          })}
        </div>
      )}

      <ul className="max-h-60 divide-y divide-border overflow-auto rounded-lg border border-border">
        {list.length === 0 && <li className="px-4 py-6 text-center text-sm text-muted-foreground">No students match &quot;{q}&quot;</li>}
        {list.map((s) => (
          <li key={s._id}>
            <label htmlFor={"pick-" + s._id} className="flex cursor-pointer items-center gap-3 px-3 py-2.5 text-sm transition-colors hover:bg-accent">
              <Checkbox id={"pick-" + s._id} checked={selected.includes(s._id)} onCheckedChange={() => toggle(s._id)} />
              <span className="min-w-0">
                <b className="block truncate font-semibold">{s.fullName}</b>
                <span className="block truncate text-xs text-muted-foreground">ID {s.studentId} · {s.batchName || "No batch"}</span>
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
