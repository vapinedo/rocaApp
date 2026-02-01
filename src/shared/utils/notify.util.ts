import { toast } from 'react-hot-toast';
import type { ToastOptions } from 'react-hot-toast';

export type NotificationType = 'success' | 'error' | 'loading' | 'info';

export function notify(message: string, type: NotificationType = 'info', options?: ToastOptions) {
  switch (type) {
    case 'success':
      toast.success(message, options);
      break;

    case 'error':
      toast.error(message, options);
      break;

    case 'loading':
      toast.loading(message, options);
      break;
      
    default:
      toast(message, options);
  }
}
