import { GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

export const BRAND = { name: "EduTrack", tagline: "Student Manager" };

export function BrandMark({ className }) {
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center rounded-xl rounded-bl-sm bg-primary text-primary-foreground",
        className
      )}
    >
      <GraduationCap strokeWidth={2.4} className="h-[55%] w-[55%]" aria-hidden />
    </span>
  );
}

export function BrandName({ className, tagline = true }) {
  return (
    <span className={cn("min-w-0", className)}>
      <b className="block truncate text-[15px] font-extrabold leading-tight tracking-tight">{BRAND.name}</b>
      {tagline && <span className="block truncate text-[11.5px] font-medium opacity-60">{BRAND.tagline}</span>}
    </span>
  );
}
