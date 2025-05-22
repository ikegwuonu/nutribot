import { toast } from "sonner";

export const showsuccess = (
  message: string,
  options: { duration?: number } = {}
) => {
  toast.success(message, {
    duration: options.duration || 2000,
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    onDismiss: (toast: any) => toast.dismiss(),
  });
};
//eslint-disable-next-line @typescript-eslint/no-explicit-any
export const showerror = (message: string, options: any = {}) => {
  toast.error(message, {
    duration: options.duration || 2000,
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    onDismiss: (toast: any) => toast.dismiss(),
  });
};
