"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export default function Modal({ title, onClose, children, wide }) {
  return (
    <Dialog open onOpenChange={(value) => !value && onClose()}>
      <DialogContent className={cn(wide && "max-w-3xl")}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
