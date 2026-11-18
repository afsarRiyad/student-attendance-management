"use client";
import { createContext, useContext, useState } from "react";
import { initialBatches, initialStudents } from "@/lib/mock";
const Ctx = createContext(null);
export const useStore = () => useContext(Ctx);
export default function StoreProvider({ children }) {
  const [students, setStudents] = useState(initialStudents);
  const [batches, setBatches] = useState(initialBatches);
  const [toast, setToast] = useState("");
  const notify = (m) => { setToast(m); setTimeout(() => setToast(""), 2400); };
  const saveStudent = (s) => {
    setStudents((p) => s._id ? p.map((x) => (x._id === s._id ? s : x)) : [{ ...s, _id: "s" + Date.now() }, ...p]);
    notify(s._id ? "Student updated" : "Student created");
  };
  const deleteStudent = (id) => { setStudents((p) => p.filter((x) => x._id !== id)); notify("Student deleted"); };
  const createBatch = (b, studentIds) => {
    const nb = { ...b, _id: "b" + Date.now() };
    setBatches((p) => [nb, ...p]);
    setStudents((p) => p.map((s) => studentIds.includes(s._id) ? { ...s, batch: nb._id, batchName: nb.batchName } : s));
    notify("Batch created");
  };
  const addToBatch = (batch, studentIds) => {
    setStudents((p) => p.map((s) => studentIds.includes(s._id) ? { ...s, batch: batch._id, batchName: batch.batchName } : s));
    notify(`${studentIds.length} student(s) added to ${batch.batchName}`);
  };
  return (
    <Ctx.Provider value={{ students, batches, saveStudent, deleteStudent, createBatch, addToBatch, notify }}>
      {children}
      {toast && (
        <div role="status" className="fixed bottom-6 right-6 z-[70] rounded-xl bg-success px-4 py-3 text-sm font-semibold text-success-foreground shadow-lift">
          {toast}
        </div>
      )}
    </Ctx.Provider>
  );
}
