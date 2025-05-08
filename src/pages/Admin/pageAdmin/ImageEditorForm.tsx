import { Widget } from "@/components/atoms/home/HomeSection3";

export const ImageEditorForm = ({
  widget,
  onChange,
}: {
  widget: Extract<Widget, { type: "image" }>;
  onChange: (w: Widget) => void;
}) => {
  return (
    <div>
      <label className="block mb-1">URL Imagen</label>
      <input
        className="w-full p-2 border rounded mb-2"
        value={widget.src}
        onChange={(e) => onChange({ ...widget, src: e.target.value })}
      />
      <label className="block mb-1">Alt Text</label>
      <input
        className="w-full p-2 border rounded"
        value={widget.alt}
        onChange={(e) => onChange({ ...widget, alt: e.target.value })}
      />
    </div>
  );
};
