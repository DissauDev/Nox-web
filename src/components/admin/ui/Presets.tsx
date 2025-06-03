// src/components/ui/Presets.tsx
import React, { useMemo } from "react";
import {
  startOfWeek,
  startOfMonth,
  startOfQuarter,
  startOfYear,
  endOfWeek,
  endOfMonth,
  endOfQuarter,
  endOfYear,
  subDays,
  subMonths,
  subYears,
  subQuarters,
} from "date-fns";
import { DateRange, PresetOption } from "../DateRangeSelector";

const presetOptions: Record<string, PresetOption[]> = {
  current: [
    {
      label: "Today",
      getValue: () => {
        const today = new Date();
        return { startDate: today, endDate: today };
      },
    },
    {
      label: "Week to date",
      getValue: () => {
        const today = new Date();
        return {
          startDate: startOfWeek(today, { weekStartsOn: 1 }),
          endDate: today,
        };
      },
    },
    {
      label: "Month to date",
      getValue: () => {
        const today = new Date();
        return {
          startDate: startOfMonth(today),
          endDate: endOfMonth(today),
        };
      },
    },
    {
      label: "Quarter to date",
      getValue: () => {
        const today = new Date();
        return {
          startDate: startOfQuarter(today),
          endDate: endOfQuarter(today),
        };
      },
    },
    {
      label: "Year to date",
      getValue: () => {
        const today = new Date();
        return {
          startDate: startOfYear(today),
          endDate: today,
        };
      },
    },
  ],
  previous: [
    {
      label: "Yesterday",
      getValue: () => {
        const y = subDays(new Date(), 1);
        return { startDate: y, endDate: y };
      },
    },
    {
      label: "Last week",
      getValue: () => {
        const base = new Date();
        return {
          startDate: subDays(startOfWeek(base, { weekStartsOn: 1 }), 7),
          endDate: subDays(endOfWeek(base, { weekStartsOn: 1 }), 7),
        };
      },
    },
    {
      label: "Last month",
      getValue: () => {
        const base = subMonths(new Date(), 1);
        return {
          startDate: startOfMonth(base),
          endDate: endOfMonth(base),
        };
      },
    },
    {
      label: "Last quarter",
      getValue: () => {
        const base = subQuarters(new Date(), 1);
        return {
          startDate: startOfQuarter(base),
          endDate: endOfQuarter(base),
        };
      },
    },
    {
      label: "Last year",
      getValue: () => {
        const base = subYears(new Date(), 1);
        return {
          startDate: startOfYear(base),
          endDate: endOfYear(base),
        };
      },
    },
  ],
};

interface Props {
  selectedRange: DateRange;
  onSelect: (range: DateRange) => void;
}

const isSameRange = (a: DateRange, b: DateRange) => {
  return (
    a.startDate.getTime() === b.startDate.getTime() &&
    a.endDate.getTime() === b.endDate.getTime()
  );
};

const Presets: React.FC<Props> = ({ selectedRange, onSelect }) => {
  const evaluatedPresets = useMemo(() => {
    return Object.entries(presetOptions).map(([group, options]) => ({
      group,
      options: options.map((preset) => ({
        ...preset,
        range: preset.getValue(), // Memoize once on render
      })),
    }));
  }, []);

  return (
    <div className="grid grid-cols-2 gap-2">
      {evaluatedPresets.map(({ group, options }) => (
        <div key={group} className="space-y-2">
          {options.map(({ label, range }) => {
            const isSelected = isSameRange(range, selectedRange);
            return (
              <button
                key={label}
                className={`w-full text-left px-3 py-2 text-sm rounded font-semibold ${
                  isSelected
                    ? "bg-grape-800 text-white "
                    : "hover:bg-grape-100 text-gray-600"
                }`}
                onClick={() => onSelect(range)}
              >
                {label}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Presets;
