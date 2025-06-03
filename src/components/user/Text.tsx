// Text.tsx
import { useNode } from "@craftjs/core";

export const Text = ({ text }: { text: string }) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  return (
    <p ref={(ref) => ref && connect(drag(ref))} className="text-gray-900">
      {text}
    </p>
  );
};

Text.craft = {
  displayName: "Text",
  props: { text: "Editable Text" },
};
