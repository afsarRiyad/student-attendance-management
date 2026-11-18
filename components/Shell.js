"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import { ThemeToggle } from "./Theme";
import { BrandMark, BRAND } from "./Brand";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const AUTH_ROUTES = ["/login", "/signup"];

export default function Shell({ children }) {
  const path = usePathname();
  const isAuth = AUTH_ROUTES.includes(path);
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try { setCollapsed(localStorage.getItem("sm-side") === "min"); } catch (e) {}
  }, []);

  useEffect(() => { setOpen(false); }, [path]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const toggleSide = () => {
    setCollapsed((c) => {
      const next = !c;
      try { localStorage.setItem("sm-side", next ? "min" : "full"); } catch (e) {}
      return next;
    });
  };

  if (isAuth) return children;

  return (
    <div
      className={cn(
        "grid min-h-screen bg-background transition-[grid-template-columns] duration-200 max-[860px]:grid-cols-1",
        collapsed ? "grid-cols-[64px_1fr]" : "grid-cols-[260px_1fr]"
      )}
    >
      <Sidebar collapsed={collapsed} open={open} onToggle={toggleSide} onClose={() => setOpen(false)} />

      <button
        type="button"
        tabIndex={-1}
        aria-label="Close menu"
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 z-40 hidden bg-black/60 backdrop-blur-[1px] transition-opacity max-[860px]:block",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />

      <main className="app-glow min-w-0 px-9 pb-16 pt-8 max-[860px]:px-4 max-[860px]:pb-12 max-[860px]:pt-4">
        <div className="mb-4 hidden items-center gap-2.5 border-b border-border pb-3 max-[860px]:flex">
          <Button variant="ghost" size="icon" onClick={() => setOpen(true)} aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </Button>
          <BrandMark className="h-8 w-8 rounded-lg" />
          <b className="text-sm tracking-tight">{BRAND.name}</b>
          <ThemeToggle className="ml-auto" />
        </div>
        {children}
      </main>
    </div>
  );
}
