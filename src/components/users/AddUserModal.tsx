import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import UserForm, { User } from "./UserForm";

type Props = {
  trigger?: React.ReactNode;
  onCreate: (u: User) => Promise<void> | void;
};

export default function AddUserModal({ trigger, onCreate }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger ?? <Button>Add user</Button>}
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
            await onCreate(payload);
          }}
        />
        <DialogFooter>
          <div />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
