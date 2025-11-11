import { toast } from "sonner";

export function notifySuccess(message: string) {
  toast.success(message);
}

export function notifyError(message: string) {
  toast.error(message);
}

export function notify(message: string) {
  toast(message);
}

export default { notifySuccess, notifyError, notify };
