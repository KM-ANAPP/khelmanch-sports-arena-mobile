
import { ToastProps, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport, Toast } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

export function Toaster() {
  const { toasts, dismiss } = useToast();

  // Listen for custom toast events for the global toast function
  useEffect(() => {
    const handleToastEvent = (event: CustomEvent<ToastProps>) => {
      const { toast } = useToast();
      toast(event.detail);
    };

    // @ts-ignore - CustomEvent type definition issue
    document.addEventListener('toast', handleToastEvent);
    
    return () => {
      // @ts-ignore - CustomEvent type definition issue
      document.removeEventListener('toast', handleToastEvent);
    };
  }, []);

  return (
    <ToastProvider data-toast-container="true">
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose onClick={() => dismiss(id)} />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
