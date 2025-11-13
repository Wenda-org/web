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
  phone?: string;
  role: "admin" | "user" | string;
  status?: "active" | "inactive" | string;
  lastLogin?: string;
};

type Props = {
  initial?: Partial<User>;
  onSubmit: (payload: User) => Promise<void> | void;
  submitLabel?: string;
  onCancel?: () => void;
  className?: string;
  // optional: notify parent when form is performing async submit
  onLoadingChange?: (loading: boolean) => void;
  // optional: externally disable the form (used to prevent closing while saving)
  disabled?: boolean;
};

export default function UserForm({
  initial = {},
  onSubmit,
  submitLabel = "Save",
  onCancel,
  className,
  onLoadingChange,
  disabled = false,
}: Props) {
  const [name, setName] = useState(initial.name || "");
  const [email, setEmail] = useState(initial.email || "");
  const [phone, setPhone] = useState(initial.phone || "");
  const [role, setRole] = useState<User["role"]>(initial.role || "user");
  const [status, setStatus] = useState<User["status"]>(
    initial.status || "active"
  );

  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({});
  const [loading, setLoading] = useState(false);

  function validate() {
    const e: { name?: string; email?: string; phone?: string } = {};
    if (!name || !name.trim()) e.name = "Name is required";
    if (name && name.trim().length > 100) e.name = "Name is too long (max 100 chars)";
    const emailRe = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!email || !emailRe.test(email)) e.email = "Please enter a valid email";
    if (email && email.length > 254) e.email = "Email is too long";
    // optional phone validation: allow digits, spaces, +, -, parentheses; require at least 6 digits when provided
    if (phone && phone.trim()) {
      if (phone.length > 20) e.phone = "Phone is too long (max 20 chars)";
      const digits = (phone.match(/\d/g) || []).length;
      if (digits < 6) e.phone = "Please enter a valid phone number";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    if (!validate()) return;
    setLoading(true);
    onLoadingChange?.(true);
    try {
      await onSubmit({
        id: initial.id,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        role,
        status,
      });
    } finally {
      setLoading(false);
      onLoadingChange?.(false);
    }
  }

  return (
    <form className={cn("space-y-4", className)} onSubmit={handleSubmit}>
      <div>
        <Label>Name</Label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={disabled}
          maxLength={100}
          aria-label="Name"
        />
        {errors.name && (
          <p className="text-destructive text-sm mt-1">{errors.name}</p>
        )}
      </div>

      <div>
        <Label>Email</Label>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={disabled}
          type="email"
          maxLength={254}
          aria-label="Email"
        />
        {errors.email && (
          <p className="text-destructive text-sm mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <Label>Phone</Label>
        <Input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={disabled}
          type="tel"
          maxLength={20}
          placeholder="+55 12 3456-7890"
          aria-label="Phone"
        />
        {errors.phone && (
          <p className="text-destructive text-sm mt-1">{errors.phone}</p>
        )}
      </div>

      <div>
        <Label>Role</Label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full rounded-md border px-3 py-2"
          disabled={disabled}
        >
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </div>

      <div>
        <Label>Status</Label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full rounded-md border px-3 py-2"
          disabled={disabled}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="flex items-center gap-2 justify-end">
        {onCancel && (
          <Button
            variant="ghost"
            onClick={onCancel}
            type="button"
            disabled={disabled}
          >
            Cancel
          </Button>
        )}
        <LoadingButton type="submit" isLoading={loading} disabled={disabled}>
          {submitLabel}
        </LoadingButton>
      </div>
    </form>
  );
}
