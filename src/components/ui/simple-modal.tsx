import React from "react";
import ReactDOM from "react-dom";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
};

export function SimpleModal({
  open,
  onOpenChange,
  children,
  className,
}: Props) {
  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onOpenChange(false);
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  if (!open) return null;

  const modal = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => onOpenChange(false)}
      />
      <div
        role="dialog"
        aria-modal="true"
        className={`relative z-10 max-w-lg w-full bg-background rounded-md p-6 shadow-lg ${
          className || ""
        }`}
      >
        {children}
      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, document.body);
}

export default SimpleModal;
