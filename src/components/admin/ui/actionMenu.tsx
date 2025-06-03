// components/ActionsMenu.tsx
"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export interface ActionsMenuProps {
  onEdit: () => void;
  onDelete: () => void;
  onToggleStatus: () => void;
  isAvailable: boolean;
  isDeleting: boolean; // ← añadida la prop
}

export default function ActionsMenu({
  onEdit,
  onDelete,
  onToggleStatus,
  isAvailable,
  isDeleting, // ← desestructurada
}: ActionsMenuProps) {
  // Mientras isDeleting sea true, mostramos el spinner
  if (isDeleting) {
    return (
      <div className="p-1">
        <AiOutlineLoading3Quarters className="h-5 w-5 text-gray-300 animate-spin" />
      </div>
    );
  }

  // En el caso normal, mostramos el dropdown
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-1 rounded-full hover:bg-gray-700">
          <HiOutlineDotsVertical className="h-5 w-5 text-gray-300" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={4}>
        <DropdownMenuItem onSelect={onEdit}>Edit</DropdownMenuItem>
        <DropdownMenuItem onSelect={onDelete}>Delete</DropdownMenuItem>
        <DropdownMenuItem onSelect={onToggleStatus}>
          {isAvailable ? "Mark as Disabled" : "Mark as Available"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
