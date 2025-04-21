
// This file needs to import from the UI components, not from itself
import { Toast, ToastActionElement, ToastProps } from "@/components/ui/toast";
import { createContext, useContext } from "react";

// Define the types for our toast functionality
type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

// Define the context type
export interface ToastContextType {
  toast: (props: Omit<ToasterToast, "id">) => void;
  toasts: ToasterToast[];
  dismiss: (id: string) => void;
}

// Create the context with a default value
const ToastContext = createContext<ToastContextType>({
  toast: () => {},
  toasts: [],
  dismiss: () => {},
});

// Hook to use toast functionality
export function useToast() {
  const context = useContext(ToastContext);
  
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  
  return context;
}

// Export a utility function for direct toast access
export const toast = (props: Omit<ToasterToast, "id">) => {
  // This is a workaround for using toast outside of React components
  // In a real implementation, this would be properly connected to the toast system
  const existingToaster = document.querySelector('[data-toast-container="true"]');
  
  if (existingToaster) {
    // If we're in a React environment with the toast provider running,
    // we can dispatch a custom event that the provider listens for
    const event = new CustomEvent('toast', { detail: props });
    document.dispatchEvent(event);
  } else {
    // Fallback for when toast is called outside React or during SSR
    console.log('Toast:', props.title || props.description);
  }
};
