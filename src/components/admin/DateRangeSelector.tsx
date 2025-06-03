// src/components/DateRangeSelector.tsx

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { format, subYears } from "date-fns";
import Presets from "./ui/Presets";
import Calendar from "./ui/Calendar";

export type DateRange = {
  sales?: unknown;
  startDate: Date;
  endDate: Date;
};

export type CompareType = "previous_period" | "previous_year";

export interface PresetOption {
  label: string;
  getValue: () => DateRange;
}

interface DateRangeSelectorProps {
  onUpdate?: (
    rangeText: string,
    compareText: string,
    selectedRange: DateRange,
    compareRange: DateRange
  ) => void;
}

export default function DateRangeSelector({
  onUpdate,
}: DateRangeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"presets" | "custom">("presets");
  const [selectedRange, setSelectedRange] = useState<DateRange>({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [compareType, setCompareType] = useState<CompareType>("previous_year");
  const [compareRange, setCompareRange] = useState<DateRange>({
    startDate: subYears(new Date(), 1),
    endDate: subYears(new Date(), 1),
  });
  const [selectedDates, setSelectedDates] = useState<{
    from: Date | null;
    to: Date | null;
  }>({ from: null, to: null });

  useEffect(() => {
    if (compareType === "previous_year") {
      const newCompare: DateRange = {
        startDate: subYears(selectedRange.startDate, 1),
        endDate: subYears(selectedRange.endDate, 1),
        sales: undefined,
      };
      setCompareRange(newCompare);
      onUpdate?.(
        getDisplayText().rangeText,
        getDisplayText().compareText,
        selectedRange,
        newCompare
      );
    } else {
      const duration =
        selectedRange.endDate.getTime() - selectedRange.startDate.getTime();
      const periodStartDate = new Date(
        selectedRange.startDate.getTime() - duration - 86400000
      );
      const periodEndDate = new Date(
        selectedRange.startDate.getTime() - 86400000
      );
      const newCompare: DateRange = {
        startDate: periodStartDate,
        endDate: periodEndDate,
        sales: undefined,
      };
      setCompareRange(newCompare);
      onUpdate?.(
        getDisplayText().rangeText,
        getDisplayText().compareText,
        selectedRange,
        newCompare
      );
    }
  }, [selectedRange, compareType]);

  const handleUpdate = () => {
    if (selectedDates.from && selectedDates.to) {
      setSelectedRange({
        startDate: selectedDates.from,
        endDate: selectedDates.to,
      });
    } else if (selectedDates.from) {
      setSelectedRange({
        startDate: selectedDates.from,
        endDate: selectedDates.from,
      });
    }
    setIsOpen(false);
  };

  const getDisplayText = () => {
    const formatStr = "MMM d, yyyy";
    const startFormatted = format(selectedRange.startDate, formatStr);
    const endFormatted = format(selectedRange.endDate, formatStr);
    const rangeText =
      startFormatted === endFormatted
        ? startFormatted
        : `${startFormatted} - ${endFormatted}`;
    const compareStart = format(compareRange.startDate, formatStr);
    const compareEnd = format(compareRange.endDate, formatStr);
    const compareText =
      compareStart === compareEnd
        ? compareStart
        : `${compareStart} - ${compareEnd}`;
    return { rangeText, compareText };
  };

  const { rangeText, compareText } = getDisplayText();

  return (
    <div className="relative w-full max-w-md">
      <button
        className="w-full border border-gray-300 rounded px-3 py-2 text-left bg-white flex flex-col text-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-semibold">{rangeText}</span>
          <ChevronDown
            className={`h-5 w-5 text-gray-600 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
        {compareText && (
          <span className="text-xs text-gray-800 font-semibold">
            vs.{" "}
            {compareType === "previous_year"
              ? "Previous year"
              : "Previous period"}{" "}
            ({compareText})
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded shadow-lg z-10 p-4">
          <h3 className="text-center text-sm font-medium text-gray-700 mb-4">
            SELECT A DATE RANGE
          </h3>
          <div className="flex border-b mb-4">
            <button
              className={`flex-1 text-center py-2 text-sm font-medium ${
                activeTab === "presets"
                  ? "text-grape-950 border-b-2 border-grape-900"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("presets")}
            >
              Presets
            </button>
            <button
              className={`flex-1 text-center py-2 text-sm font-medium ${
                activeTab === "custom"
                  ? "text-grape-950 border-b-2 border-grape-900"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("custom")}
            >
              Custom
            </button>
          </div>

          {activeTab === "presets" ? (
            <Presets
              selectedRange={selectedRange}
              onSelect={setSelectedRange}
            />
          ) : (
            <Calendar
              selectedDates={selectedDates}
              onDateSelect={(from, to) => setSelectedDates({ from, to })}
            />
          )}

          <div className="mt-6">
            <h4 className="text-center text-xs text-gray-500 mb-2 font-semibold">
              COMPARE TO
            </h4>
            <div className="flex gap-2">
              {(["previous_period", "previous_year"] as CompareType[]).map(
                (type) => (
                  <button
                    key={type}
                    className={`flex-1 text-center font-semibold py-1.5 text-sm border rounded ${
                      compareType === type
                        ? "bg-white border-grape-800 text-gray-700"
                        : "border-gray-300 text-gray-500"
                    }`}
                    onClick={() => setCompareType(type)}
                  >
                    {compareType === type && (
                      <span className="inline-block w-2 h-2 bg-grape-800 rounded-full mr-1"></span>
                    )}
                    {type === "previous_period"
                      ? "Previous period"
                      : "Previous year"}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            {activeTab === "custom" && (
              <button
                className="flex-1 py-2 text-sm border border-gray-300 rounded text-gray-700 hover:bg-slate-100 font-semibold"
                onClick={() => setSelectedDates({ from: null, to: null })}
              >
                Reset
              </button>
            )}
            <button
              className="flex-1 font-semibold py-2 text-sm bg-grape-800 text-white rounded hover:bg-grape-900"
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
