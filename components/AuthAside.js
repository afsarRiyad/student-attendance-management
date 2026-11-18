import Link from "next/link";
import { Check } from "lucide-react";
import { BrandMark, BrandName } from "./Brand";

export default function AuthAside() {
  return (
    <aside className="relative hidden flex-col justify-between overflow-hidden bg-[linear-gradient(160deg,#191924_0%,#2b1822_55%,#3d1622_100%)] p-11 text-white min-[980px]:flex">
      <div aria-hidden className="pointer-events-none absolute -right-16 -top-28 h-80 w-80 rounded-full bg-[#e11d3a] opacity-40 blur-[90px]" />
      <div aria-hidden className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-[#12a150] opacity-25 blur-[90px]" />

      <Link href="/" className="relative flex items-center gap-2.5">
        <BrandMark className="h-9 w-9" />
        <BrandName />
      </Link>

      <div className="relative my-auto max-w-md py-10">
        <span className="mb-3.5 inline-block text-[11px] font-bold uppercase tracking-[0.16em] text-[#ff8fa1]">Student Manager</span>
        <h2 className="text-[34px] font-extrabold leading-[1.14] tracking-tight">Run every batch from one calm dashboard.</h2>
        <p className="mt-3.5 text-[15px] text-white/70">Enrol students, group them into batches and mark attendance without the spreadsheet shuffle.</p>
        <ul className="mt-6 space-y-3">
          {["Student records with batch assignment", "Attendance and homework in one pass", "Built to talk to your own API"].map((item) => (
            <li key={item} className="flex items-center gap-3 text-sm text-white/90">
              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-success/25 text-[#5ce09a]">
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative border-t border-white/10 pt-4 text-sm text-white/55">
        &ldquo;Everything our mentors need, on one screen.&rdquo;
        <b className="mt-2 block text-xs font-semibold text-white/85">EduTrack · Dhaka</b>
      </div>
    </aside>
  );
}
