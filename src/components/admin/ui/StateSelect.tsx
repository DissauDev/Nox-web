"use client";

import { useState } from "react";

import { Controller } from "react-hook-form";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { US_STATES } from "@/utils/data/states";

interface StateSelectProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

export const StateSelect = ({
  control,
  name,
  label = "State",
  placeholder = "Select a state",
  required,
  className,
}: StateSelectProps) => {
  const [search, setSearch] = useState("");

  const filteredStates = US_STATES.filter((state) =>
    state.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {label && (
        <Label className="text-base">
          {label}
          {required && <span className="text-red-500">*</span>}
        </Label>
      )}

      <Controller
        control={control}
        name={name}
        rules={{ required }}
        render={({ field, fieldState }) => (
          <>
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                <div className="px-2 pb-2">
                  <Input
                    placeholder="Search state..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                {filteredStates.map((state) => (
                  <SelectItem key={state.value} value={state.value}>
                    {state.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldState?.error && (
              <span className="text-sm text-red-500">
                {fieldState.error.message}
              </span>
            )}
          </>
        )}
      />
    </div>
  );
};
