import { Widget } from "@/components/atoms/home/HomeSection3";

export const TextEditorForm = ({
  widget,
  onChange,
}: {
  widget: Extract<Widget, { type: "text" }>;
  onChange: (w: Widget) => void;
}) => {
  return (
    <div>
      <label className="block mb-1">Texto</label>
      <textarea
        className="w-full p-2 border rounded mb-2"
        value={widget.content}
        onChange={(e) => onChange({ ...widget, content: e.target.value })}
      />

      <label className="block mb-1">Tag HTML</label>
      <select
        value={widget.tag}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange={(e) => onChange({ ...widget, tag: e.target.value as any })}
        className="w-full border p-2 rounded"
      >
        <option value="h1">h1</option>
        <option value="h3">h3</option>
        <option value="p">p</option>
      </select>
    </div>
  );
};
