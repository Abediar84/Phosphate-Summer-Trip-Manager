import { Toaster } from 'sonner';

export function Toast() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        className: 'bg-white dark:bg-gray-800',
      }}
    />
  );
}