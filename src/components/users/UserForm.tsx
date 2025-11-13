import React, { useState } from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const [name, setName] = useState(initial.name || "");
  const [email, setEmail] = useState(initial.email || "");
  const [phone, setPhone] = useState(initial.phone || "");
  const [role, setRole] = useState<User["role"]>(initial.role || "user");
  const [status, setStatus] = useState<User["status"]>(
    initial.status || "active"
  );

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
  }>({});
  const [loading, setLoading] = useState(false);

  function validate() {
    const e: { name?: string; email?: string; phone?: string } = {};
    if (!name || !name.trim())
      e.name = t("users.form.validation.name_required");
    if (name && name.trim().length > 100)
      e.name = t("users.form.validation.name_too_long");
    const emailRe = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!email || !emailRe.test(email))
      e.email = t("users.form.validation.email_invalid");
    if (email && email.length > 254)
      e.email = t("users.form.validation.email_too_long");
    // optional phone validation: allow digits, spaces, +, -, parentheses; require at least 6 digits when provided
    if (phone && phone.trim()) {
      if (phone.length > 20)
        e.phone = t("users.form.validation.phone_too_long");
      const digits = (phone.match(/\d/g) || []).length;
      if (digits < 6) e.phone = t("users.form.validation.phone_invalid");
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
        <Label>{t("users.form.name")}</Label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={disabled}
          maxLength={100}
          aria-label={t("users.form.name")}
        />
        {errors.name && (
          <p className="text-destructive text-sm mt-1">{errors.name}</p>
        )}
      </div>

      <div>
        <Label>{t("users.form.email")}</Label>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={disabled}
          type="email"
          maxLength={254}
          aria-label={t("users.form.email")}
        />
        {errors.email && (
          <p className="text-destructive text-sm mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <Label>{t("users.form.phone")}</Label>
        <Input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={disabled}
          type="tel"
          maxLength={20}
          placeholder="+244 12 345 6789"
          aria-label={t("users.form.phone")}
        />
        {errors.phone && (
          <p className="text-destructive text-sm mt-1">{errors.phone}</p>
        )}
      </div>

      <div>
        <Label>{t("users.form.role")}</Label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full rounded-md border px-3 py-2"
          disabled={disabled}
        >
          <option value="admin">{t("users.form.admin")}</option>
          <option value="user">{t("users.form.user")}</option>
        </select>
      </div>

      <div>
        <Label>{t("users.form.status")}</Label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full rounded-md border px-3 py-2"
          disabled={disabled}
        >
          <option value="active">{t("users.form.active")}</option>
          <option value="inactive">{t("users.form.inactive")}</option>
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
            {t("users.form.cancel")}
          </Button>
        )}
        <LoadingButton type="submit" isLoading={loading} disabled={disabled}>
          {submitLabel}
        </LoadingButton>
      </div>
    </form>
  );
}
