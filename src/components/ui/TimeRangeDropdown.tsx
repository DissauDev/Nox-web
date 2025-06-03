// components/admin/TimeRangeDropdown.tsx
import { useState } from "react";

const ranges = ["Week", "Month", "6 Months", "Year"];

export default function TimeRangeDropdown({
  onChange,
}: {
  onChange: (range: string) => void;
}) {
  const [selected, setSelected] = useState("Month");

  const handleSelect = (range: string) => {
    setSelected(range);
    onChange(range);
  };

  return (
    <div className="ml-auto mb-4">
      <select
        className="bg-gray-800 text-white px-4 py-2 rounded-md border border-gray-700"
        value={selected}
        onChange={(e) => handleSelect(e.target.value)}
      >
        {ranges.map((range) => (
          <option key={range} value={range}>
            {range}
          </option>
        ))}
      </select>
    </div>
  );
}
