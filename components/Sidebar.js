"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClipboardCheck, GraduationCap, LayoutDashboard, PanelLeftClose, PanelLeftOpen, Users, X } from "lucide-react";
import { ThemeToggle } from "./Theme";
import { BrandMark, BrandName } from "./Brand";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/students", label: "Students", icon: Users },
  { href: "/batches", label: "Batches", icon: GraduationCap },
  { href: "/attendance", label: "Attendance", icon: ClipboardCheck },
];

export default function Sidebar({ collapsed, open, onToggle, onClose }) {
  const path = usePathname();
  return (
    <aside
      className={cn(
        "sticky top-0 z-50 flex h-screen flex-col gap-5 overflow-y-auto border-r border-border bg-card px-3.5 py-5 text-card-foreground",
        "max-[860px]:fixed max-[860px]:inset-y-0 max-[860px]:left-0 max-[860px]:w-[264px] max-[860px]:shadow-2xl max-[860px]:transition-transform max-[860px]:duration-200",
        open ? "max-[860px]:translate-x-0" : "max-[860px]:-translate-x-full"
      )}
    >
      <div className="flex items-center gap-2">
        {/* Toggle stays pinned at the left; on mobile the drawer uses the close button instead. */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          aria-label={collapsed ? "Open sidebar" : "Close sidebar"}
          aria-expanded={!collapsed}
          title={collapsed ? "Open sidebar" : "Close sidebar"}
          className="h-8 w-8 shrink-0 text-muted-foreground hover:bg-accent hover:text-accent-foreground max-[860px]:hidden"
        >
          {collapsed ? <PanelLeftOpen className="h-[18px] w-[18px]" /> : <PanelLeftClose className="h-[18px] w-[18px]" />}
        </Button>

        <Link
          href="/"
          onClick={onClose}
          aria-label="EduTrack home"
          className={cn("flex min-w-0 items-center gap-2.5", collapsed && "hidden max-[860px]:flex")}
        >
          <BrandMark className="h-9 w-9" />
          <BrandName />
        </Link>

        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          aria-label="Close menu"
          className="ml-auto hidden h-8 w-8 shrink-0 text-muted-foreground hover:bg-accent hover:text-accent-foreground max-[860px]:inline-flex"
        >
          <X className="h-[18px] w-[18px]" />
        </Button>
      </div>

      <nav aria-label="Main" className={cn("flex flex-col gap-1", collapsed && "hidden max-[860px]:flex")}>
        {links.map((l) => {
          const active = l.href === "/" ? path === "/" : path.startsWith(l.href);
          const Icon = l.icon;
          return (
            <Link
              key={l.href}
              href={l.href}
              title={l.label}
              onClick={onClose}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors",
                active
                  ? "bg-primary text-primary-foreground shadow-[0_10px_20px_-12px_hsl(var(--primary))]"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={2.1} />
              <span className="truncate">{l.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className={cn("mt-auto flex items-center justify-between gap-2 px-1 text-xs text-muted-foreground", collapsed && "hidden max-[860px]:flex")}>
        <span className="flex items-center gap-2 whitespace-nowrap">
          <span className="h-2 w-2 rounded-full bg-success" />
          ISO 9001 certified
        </span>
        <ThemeToggle className="h-8 w-8" />
      </div>
    </aside>
  );
}
