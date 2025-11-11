import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { Eye, Edit3, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import ConfirmDialog from "../ui/confirm-dialog";
import { LoadingButton } from "../ui/loading-button";

type Props = {
  userId: string;
  onEdit?: (id: string) => void;
  onView?: (id: string) => void;
  // onDelete can be sync or async (returning a Promise)
  onDelete?: (id: string) => void | Promise<void>;
  className?: string;
};

export default function UserActions({
  userId,
  onEdit,
  onView,
  onDelete,
  className,
}: Props) {
  const { t } = useTranslation();
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);

  const handleConfirmDelete = async () => {
    if (!onDelete) return;
    try {
      setDeleting(true);
      await onDelete(userId);
    } finally {
      setDeleting(false);
    }
  };
  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        {onView ? (
          <Button
            variant="ghost"
            size="icon"
            className="rounded-lg"
            onClick={() => onView(userId)}
          >
            <Eye className="w-4 h-4" />
          </Button>
        ) : (
          <Link to={`/users/${userId}`}>
            <Button variant="ghost" size="icon" className="rounded-lg">
              <Eye className="w-4 h-4" />
            </Button>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="rounded-lg"
          onClick={() => onEdit && onEdit(userId)}
        >
          <Edit3 className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-lg"
          onClick={() => setConfirmOpen(true)}
        >
          <Trash2 className="w-4 h-4 text-destructive" />
        </Button>

        <ConfirmDialog
          open={confirmOpen}
          onOpenChange={setConfirmOpen}
          title={t("confirmations.delete_user_title")}
          description={t("confirmations.delete_user_description")}
          confirmLabel={t("confirmations.delete")}
          cancelLabel={t("confirmations.cancel")}
          intent="destructive"
          onConfirm={handleConfirmDelete}
        />
      </div>
    </div>
  );
}
