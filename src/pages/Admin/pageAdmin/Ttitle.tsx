import React from "react";
import { useNode } from "@craftjs/core";

export interface TitleProps {
  text: string;
}

export const Title: React.FC<TitleProps> & { craft?: any } = ({ text }) => {
  const {
    connectors: { connect },
  } = useNode();

  return (
    <h1 ref={connect} className="text-5xl font-bold mb-6 cursor-text">
      {text}
    </h1>
  );
};

Title.craft = {
  displayName: "Title",
  props: {
    text: "Big Title",
  },
};
