// WidgetCanvas.tsx

import { HomeSection3, Widget } from "@/components/atoms/home/HomeSection3";

interface Props {
  widgets: Widget[];
  selectedIndex: number | null;
  onSelect: (index: number) => void;
}

export const WidgetCanvas = ({ widgets, selectedIndex, onSelect }: Props) => {
  return (
    <div className="border border-dashed rounded p-6 bg-slate-950 shadow">
      {widgets.map((w, i) => (
        <div
          key={i}
          onClick={() => onSelect(i)}
          className={`relative group cursor-pointer ${
            selectedIndex === i ? "ring-2 ring-blue-500" : ""
          }`}
        >
          {/* Reutilizamos el mismo renderer del frontend */}
          <HomeSection3 widgets={[w]} />
        </div>
      ))}
    </div>
  );
};
