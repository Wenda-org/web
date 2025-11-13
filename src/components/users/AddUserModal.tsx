import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import SimpleModal from "../ui/simple-modal";
import { X } from "lucide-react";
import UserForm, { User } from "./UserForm";

type Props = {
  trigger?: React.ReactNode;
  onCreate: (u: User) => Promise<void> | void;
};

export default function AddUserModal({ trigger, onCreate }: Props) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleOpen = (value: boolean) => {
    if (saving) return;
    setOpen(value);
  };

  const renderTrigger = () => {
    if (trigger) {
      if (React.isValidElement(trigger)) {
        return React.cloneElement(trigger as React.ReactElement<any>, {
          onClick: (e: any) => {
            const existing = (trigger as any)?.props?.onClick;
            if (typeof existing === "function") existing(e);
            handleOpen(true);
          },
        });
      }
      return (
        <span
          onClick={() => handleOpen(true)}
          style={{ display: "inline-block" }}
        >
          {trigger}
        </span>
      );
    }
    return <Button onClick={() => handleOpen(true)}>{t("users.add")}</Button>;
  };

  return (
    <>
      {renderTrigger()}
      <SimpleModal
        open={open}
        onOpenChange={handleOpen}
        className="max-w-md rounded-2xl p-6"
      >
        <div className="space-y-6">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold">
                {t("users.form.add_title")}
              </h2>
              <p className="text-sm text-muted-foreground">
                {t("users.form.add_description")}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleOpen(false)}
              disabled={saving}
              aria-label={t("users.form.close")}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <UserForm
            submitLabel={t("users.form.create")}
            onSubmit={async (payload) => {
              try {
                setSaving(true);
                await onCreate(payload);
                handleOpen(false);
              } finally {
                setSaving(false);
              }
            }}
            onLoadingChange={(l) => setSaving(l)}
            disabled={saving}
          />
        </div>
      </SimpleModal>
    </>
  );
}
