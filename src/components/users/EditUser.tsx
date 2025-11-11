import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
// SimpleModal removed usage here; rely on Radix Dialog
import UserForm, { User } from "./UserForm";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initial: User | null;
  onSubmit: (u: User) => Promise<void> | void;
  onCancel?: () => void;
};

export default function EditUser({
  open,
  onOpenChange,
  initial,
  onSubmit,
  onCancel,
}: Props) {
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit user</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Edit user details
            </DialogDescription>
          </DialogHeader>
          {initial && (
            <UserForm
              initial={initial}
              onSubmit={onSubmit}
              onCancel={onCancel}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* No fallback modal: rely on Radix Dialog now that Button forwards refs */}
    </>
  );
}
