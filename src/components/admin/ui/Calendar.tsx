import React, { useState, useEffect, useCallback } from "react";
import {
  format,
  isSameDay,
  isWithinInterval,
  addMonths,
  subMonths,
  parse,
  isValid,
  startOfMonth,
  isAfter,
  isBefore,
} from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { debounce } from "lodash";

type Props = {
  selectedDates: { from: Date | null; to: Date | null };
  onDateSelect: (from: Date | null, to: Date | null) => void;
};

const MIN_MONTH = new Date(2025, 0, 1);
const MAX_MONTH = startOfMonth(new Date());

const dateSchema = z.object({
  from: z
    .string()
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Formato debe ser dd/mm/yyyy")
    .refine(
      (val) => isValid(parse(val, "dd/MM/yyyy", new Date())),
      "Fecha inválida"
    ),
  to: z
    .string()
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Formato debe ser dd/mm/yyyy")
    .refine(
      (val) => isValid(parse(val, "dd/MM/yyyy", new Date())),
      "Fecha inválida"
    ),
});

type DateFormValues = z.infer<typeof dateSchema>;

const Calendar: React.FC<Props> = ({ selectedDates, onDateSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<DateFormValues>({
    resolver: zodResolver(dateSchema),
    mode: "onBlur",
    defaultValues: {
      from: selectedDates.from ? format(selectedDates.from, "dd/MM/yyyy") : "",
      to: selectedDates.to ? format(selectedDates.to, "dd/MM/yyyy") : "",
    },
  });

  const watchedFrom = watch("from");
  const watchedTo = watch("to");

  const debouncedUpdate = useCallback(
    debounce((fromStr: string, toStr: string) => {
      const fromDate = parse(fromStr, "dd/MM/yyyy", new Date());
      const toDate = parse(toStr, "dd/MM/yyyy", new Date());
      if (isValid(fromDate) && isValid(toDate)) {
        onDateSelect(fromDate, toDate);
        setCurrentMonth(fromDate);
      }
    }, 500),
    []
  );

  useEffect(() => {
    debouncedUpdate(watchedFrom, watchedTo);
  }, [watchedFrom, watchedTo, debouncedUpdate]);

  useEffect(() => {
    if (selectedDates.from)
      setValue("from", format(selectedDates.from, "dd/MM/yyyy"));
    if (selectedDates.to)
      setValue("to", format(selectedDates.to, "dd/MM/yyyy"));
  }, [selectedDates, setValue]);

  const handlePrevMonth = () => {
    const prevMonth = subMonths(currentMonth, 1);
    if (!isBefore(prevMonth, MIN_MONTH)) setCurrentMonth(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = addMonths(currentMonth, 1);
    if (!isAfter(nextMonth, MAX_MONTH)) setCurrentMonth(nextMonth);
  };

  const handleDateClick = (date: Date) => {
    if (!selectedDates.from || (selectedDates.from && selectedDates.to)) {
      onDateSelect(date, null);
    } else if (date < selectedDates.from) {
      onDateSelect(date, selectedDates.from);
    } else {
      onDateSelect(selectedDates.from, date);
    }
  };

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const monthDays = Array.from({ length: daysInMonth }, (_, i) => {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      i + 1
    );
    const isStart = selectedDates.from && isSameDay(date, selectedDates.from);
    const isEnd = selectedDates.to && isSameDay(date, selectedDates.to);
    const isInRange =
      selectedDates.from &&
      selectedDates.to &&
      isWithinInterval(date, {
        start: selectedDates.from,
        end: selectedDates.to,
      });

    const bgColor =
      isStart || isEnd
        ? "bg-purple-800 text-white"
        : isInRange
        ? "bg-purple-400 text-white"
        : "hover:bg-gray-100 text-gray-700";

    return (
      <div
        key={`day-${i}`}
        className={cn(
          "h-8 flex items-center justify-center text-sm cursor-pointer rounded",
          bgColor
        )}
        onClick={() => handleDateClick(date)}
      >
        {i + 1}
      </div>
    );
  });

  return (
    <div className="mt-2">
      <div className="flex flex-col items-center mb-4 text-gray-700">
        <div className="flex gap-4 items-center justify-center">
          <div className="relative flex items-center font-semibold">
            <CalendarIcon className="h-4 w-4 absolute left-2 text-gray-700" />
            <input
              type="text"
              placeholder="dd/mm/yyyy"
              {...register("from")}
              className={cn(
                "border rounded px-2 py-1 text-sm pl-8 w-36 text-center",
                errors.from ? "border-red-500" : "border-gray-300"
              )}
            />
          </div>

          <h1 className="text-sm font-semibold text-center">To</h1>

          <div className="relative flex items-center font-semibold">
            <CalendarIcon className="h-4 w-4 absolute left-2 text-gray-700" />
            <input
              type="text"
              placeholder="dd/mm/yyyy"
              {...register("to")}
              className={cn(
                "border rounded px-2 py-1 text-sm pl-8 w-36 text-center",
                errors.to ? "border-red-500" : "border-gray-300"
              )}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-2">
        <button
          onClick={handlePrevMonth}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <ChevronLeft className="h-5 w-5 text-gray-900" />
        </button>
        <div className="text-sm font-medium text-gray-700">
          {format(currentMonth, "MMMM yyyy")}
        </div>
        <button
          onClick={handleNextMonth}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <ChevronRight className="h-5 w-5 text-gray-900" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-1 font-semibold">
        {monthDays}
      </div>
    </div>
  );
};

export default Calendar;
