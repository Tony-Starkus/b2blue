import { toast, ToastOptions } from 'react-toastify';

export const dispatchToast = (message: string, options?: ToastOptions<unknown> | undefined) => {
  toast(message, { style: { textAlign: 'left' }, ...options });
};
