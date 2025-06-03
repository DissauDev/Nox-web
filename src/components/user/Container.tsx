// Container.tsx
import { useNode } from "@craftjs/core";
import { ReactNode } from "react";

interface ContainerProps {
  children?: ReactNode; // <- OPCIONAL aquí
}

export const Container = ({ children }: ContainerProps) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <div
      ref={(ref) => ref && connect(drag(ref))}
      className="p-4 bg-white rounded shadow"
    >
      {children}
    </div>
  );
};

Container.craft = {
  displayName: "Container",
  props: {},
  rules: {
    canMoveIn: () => true,
  },
};
