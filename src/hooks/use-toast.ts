
import { useToast as useToastOriginal } from "@/components/ui/toast";

export const useToast = useToastOriginal;

// Re-export the toast function directly to avoid circular imports
export const { toast } = useToastOriginal();
