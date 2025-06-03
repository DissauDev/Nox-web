import { useEditor } from "@craftjs/core";
import { Text } from "./Text";

export const Toolbox = () => {
  const { connectors } = useEditor();
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-bold mb-2 text-white">Toolbox</h2>
      <div
        className="bg-gray-700 p-2 rounded cursor-move text-white"
        ref={(ref) =>
          ref && connectors.create(ref, <Text text="New text block" />)
        }
      >
        Text
      </div>
    </div>
  );
};
