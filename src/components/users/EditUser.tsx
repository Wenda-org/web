import React from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Loader2 } from "lucide-react";
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
  const { t } = useTranslation();
  const [isSaving, setIsSaving] = React.useState(false);
  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(val: boolean) => {
          // prevent closing while save in progress
          if (isSaving) return;
          onOpenChange(val);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isSaving ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="animate-spin w-4 h-4" aria-hidden />
                  {t("users.form.saving")}
                </span>
              ) : (
                t("users.form.edit_title")
              )}
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              {t("users.form.edit_description")}
            </DialogDescription>
          </DialogHeader>
          {initial && (
            <UserForm
              initial={initial}
              onSubmit={onSubmit}
              onCancel={onCancel}
              disabled={isSaving}
              onLoadingChange={(l) => setIsSaving(l)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* No fallback modal: rely on Radix Dialog now that Button forwards refs */}
    </>
  );
}
