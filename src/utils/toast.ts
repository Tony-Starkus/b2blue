import { toast, ToastOptions } from 'react-toastify';

/**
 * This function dispatch a toast
 * @param message The toast message
 * @param options Options for toast
 */
export const dispatchToast = (message: string, options?: ToastOptions<unknown> | undefined) => {
  toast(message, { style: { textAlign: 'left' }, ...options });
};
