import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import UserForm, { User } from "./UserForm";

type Props = {
  trigger?: React.ReactNode;
  onCreate: (u: User) => Promise<void> | void;
};

export default function AddUserModal({ trigger, onCreate }: Props) {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  return (
    <Dialog open={open} onOpenChange={(v: boolean) => {
      // debug open changes
      // eslint-disable-next-line no-console
      console.debug("AddUserModal.onOpenChange", { value: v, saving });
      if (saving) return;
      setOpen(v);
    }}>
      <DialogTrigger asChild>
        {trigger ? (
          // if trigger is a React element, render it as child of DialogTrigger
          React.isValidElement(trigger) ? (
            React.cloneElement(trigger as React.ReactElement<any>, {
              // ensure existing onClick still runs
              onClick: (e: any) => {
                try {
                  // debug: log cloned trigger click
                  // eslint-disable-next-line no-console
                  console.debug("AddUserModal.cloned-trigger clicked", { event: e });
                  const existing = (trigger as any)?.props?.onClick;
                  if (typeof existing === "function") existing(e);
                } finally {
                  setOpen(true);
                }
              },
            })
          ) : (
            <span onClick={(e:any) => {
              // eslint-disable-next-line no-console
              console.debug("AddUserModal.span-trigger clicked", { event: e });
              setOpen(true);
            }} style={{ display: "inline-block" }}>
              {trigger}
            </span>
          )
        ) : (
          <Button onClick={(e:any) => {
            // eslint-disable-next-line no-console
            console.debug("AddUserModal.default-button clicked", { event: e });
            setOpen(true);
          }}>Add user</Button>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add user</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Create a new user
          </DialogDescription>
        </DialogHeader>

        <UserForm
          submitLabel="Create"
          onSubmit={async (payload) => {
            try {
              setSaving(true);
              await onCreate(payload);
              // close modal after successful creation
              setOpen(false);
            } finally {
              setSaving(false);
            }
          }}
          onLoadingChange={(l) => setSaving(l)}
          disabled={saving}
        />

        <DialogFooter>
          <div />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// log open state changes for debugging when component mounts
// (non-blocking, removed in production later)
function __debugHook(open: boolean | undefined) {
  // noop placeholder to allow easy search
}
