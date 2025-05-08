import React from "react";
import { useNode } from "@craftjs/core";

export interface TextProps {
  text: string;
}

export const Text: React.FC<TextProps> & { craft?: any } = ({ text }) => {
  const {
    connectors: { connect },
  } = useNode();

  return (
    <p ref={connect} className="text-lg cursor-text">
      {text}
    </p>
  );
};

Text.craft = {
  displayName: "Text",
  props: {
    text: "This is an editable paragraph. Click to edit me!",
  },
};
