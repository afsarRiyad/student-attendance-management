"use client";
import { useState } from "react";
import { Check } from "lucide-react";
import { useStore } from "./Store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const blank = { studentId: "", fullName: "", email: "", phone: "", batch: "", batchName: "",
  address: { disctrict: "", city: "", postCode: "", street: "", houseNo: "" }, dateOfBirth: "" };

export default function StudentForm({ initial, onDone }) {
  const { batches, saveStudent } = useStore();
  const [f, setF] = useState(initial || blank);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const setA = (k) => (e) => setF({ ...f, address: { ...f.address, [k]: e.target.value } });
  const pickBatch = (v) => {
    const b = batches.find((x) => x._id === v);
    setF({ ...f, batch: v === "none" ? "" : v, batchName: v === "none" ? "" : b?.batchName || "" });
  };
  const submit = (e) => { e.preventDefault(); saveStudent(f); onDone(); }; // POST/PUT here later

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Label htmlFor="studentId">Student ID<Input id="studentId" required type="number" value={f.studentId} onChange={set("studentId")} /></Label>
        <Label htmlFor="fullName">Full name<Input id="fullName" required minLength={2} value={f.fullName} onChange={set("fullName")} /></Label>
        <Label htmlFor="email">Email<Input id="email" required type="email" value={f.email} onChange={set("email")} /></Label>
        <Label htmlFor="phone">Phone<Input id="phone" required value={f.phone} onChange={set("phone")} /></Label>
        <Label htmlFor="dob">Date of birth<Input id="dob" required type="date" value={f.dateOfBirth} onChange={set("dateOfBirth")} /></Label>
        <Label htmlFor="batch">Batch
          <Select value={f.batch || "none"} onValueChange={pickBatch}>
            <SelectTrigger id="batch"><SelectValue placeholder="No batch yet" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No batch yet</SelectItem>
              {batches.map((b) => <SelectItem key={b._id} value={b._id}>{b.batchName}</SelectItem>)}
            </SelectContent>
          </Select>
        </Label>
      </div>

      <h4 className="pt-2 text-sm font-bold">Address</h4>
      <div className="grid gap-4 sm:grid-cols-3">
        <Label htmlFor="district">District<Input id="district" required value={f.address.disctrict} onChange={setA("disctrict")} /></Label>
        <Label htmlFor="city">City<Input id="city" required value={f.address.city} onChange={setA("city")} /></Label>
        <Label htmlFor="postCode">Post code<Input id="postCode" required type="number" value={f.address.postCode} onChange={setA("postCode")} /></Label>
        <Label htmlFor="street">Street<Input id="street" value={f.address.street} onChange={setA("street")} /></Label>
        <Label htmlFor="houseNo">House no<Input id="houseNo" type="number" value={f.address.houseNo} onChange={setA("houseNo")} /></Label>
      </div>

      <div className="flex justify-end gap-2.5 pt-2">
        <Button type="button" variant="outline" onClick={onDone}>Cancel</Button>
        <Button><Check />{initial ? "Save changes" : "Create student"}</Button>
      </div>
    </form>
  );
}
