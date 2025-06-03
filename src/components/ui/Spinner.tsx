// src/components/ui/Spinner.tsx
import React from "react";

export const Spinner: React.FC<{ className?: string }> = ({ className }) => (
  <div
    className={
      `animate-spin rounded-full border-4 border-t-transparent border-white ` +
      (className ?? `w-6 h-6`)
    }
  />
);
