import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  loading?: boolean;
  title?: string;
  description?: string;
  darkTheme?: boolean;
}

export default function ConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  loading = false,
  darkTheme = false,
  title = "Are you sure? 🎉",
  description = "This action cannot be undone.",
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={
          `sm:max-w-lg p-4 ` +
          (darkTheme
            ? "bg-gray-800 text-white"
            : "bg-white text-gray-900 shadow")
        }
      >
        <DialogHeader>
          <DialogTitle className={darkTheme ? "text-white" : "text-gray-900"}>
            {title}
          </DialogTitle>
          <DialogDescription
            className={darkTheme ? "text-gray-300" : "text-gray-500"}
          >
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="space-x-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
            className={
              darkTheme
                ? "border-gray-200 text-gray-800 hover:bg-gray-200"
                : undefined
            }
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={loading}
            className={
              darkTheme
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-red-600 hover:bg-red-700 text-white"
            }
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
