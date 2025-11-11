import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import UserProfile from "./UserProfile";
import type { User } from "./UserForm";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
  onSave: (u: User) => Promise<void> | void;
  onCancel?: () => void;
};

export default function ViewUser({
  open,
  onOpenChange,
  user,
  onSave,
  onCancel,
}: Props) {
  return (
    // Use the Radix Dialog when available, but fallback to SimpleModal to avoid cases
    // where Radix doesn't open due to ref issues or environment differences.
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{user ? user.name : "Profile"}</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              {user ? user.email : "User profile"}
            </DialogDescription>
          </DialogHeader>
          {user && (
            <UserProfile user={user} onSave={onSave} onCancel={onCancel} />
          )}
        </DialogContent>
      </Dialog>

      {/* No fallback: rely on Radix Dialog (Button now forwards ref). */}
    </>
  );
}
