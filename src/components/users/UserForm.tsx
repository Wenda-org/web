import React, { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { LoadingButton } from "../ui/loading-button";
import { cn } from "../ui/utils";

export type User = {
  id?: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer" | string;
  status?: "active" | "inactive" | string;
  lastLogin?: string;
};

type Props = {
  initial?: Partial<User>;
  onSubmit: (payload: User) => Promise<void> | void;
  submitLabel?: string;
  onCancel?: () => void;
  className?: string;
};

export default function UserForm({
  initial = {},
  onSubmit,
  submitLabel = "Save",
  onCancel,
  className,
}: Props) {
  const [name, setName] = useState(initial.name || "");
  const [email, setEmail] = useState(initial.email || "");
  const [role, setRole] = useState<User["role"]>(initial.role || "viewer");
  const [status, setStatus] = useState<User["status"]>(
    initial.status || "active"
  );

  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [loading, setLoading] = useState(false);

  function validate() {
    const e: { name?: string; email?: string } = {};
    if (!name || !name.trim()) e.name = "Name is required";
    const emailRe = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!email || !emailRe.test(email)) e.email = "Please enter a valid email";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await onSubmit({
        id: initial.id,
        name: name.trim(),
        email: email.trim(),
        role,
        status,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className={cn("space-y-4", className)} onSubmit={handleSubmit}>
      <div>
        <Label>Name</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
        {errors.name && (
          <p className="text-destructive text-sm mt-1">{errors.name}</p>
        )}
      </div>

      <div>
        <Label>Email</Label>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        {errors.email && (
          <p className="text-destructive text-sm mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <Label>Role</Label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full rounded-md border px-3 py-2"
        >
          <option value="admin">Admin</option>
          <option value="editor">Editor</option>
          <option value="viewer">Viewer</option>
        </select>
      </div>

      <div>
        <Label>Status</Label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full rounded-md border px-3 py-2"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="flex items-center gap-2 justify-end">
        {onCancel && (
          <Button variant="ghost" onClick={onCancel} type="button">
            Cancel
          </Button>
        )}
        <LoadingButton type="submit" isLoading={loading}>
          {submitLabel}
        </LoadingButton>
      </div>
    </form>
  );
}
