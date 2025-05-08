import React, { useEffect } from "react";
import { Editor, Frame, Element, useEditor } from "@craftjs/core";

import { Text } from "./Text";
import { Title } from "./Ttitle";

export interface EditorCanvasProps {
  pageData: any;
}

export default function EditorCanvas({ pageData }: EditorCanvasProps) {
  return (
    <Editor resolver={{ Title, Text }}>
      <CanvasContent pageData={pageData} />
    </Editor>
  );
}

function CanvasContent({ pageData }: EditorCanvasProps) {
  const { actions } = useEditor();

  // Si encontramos pageData, "deserializamos" el estado guardado
  useEffect(() => {
    if (pageData) {
      actions.deserialize(pageData);
    }
  }, [pageData, actions]);

  return (
    <Frame>
      <Element is="div" canvas>
        {/* Si no hay datos previos, mostramos el contenido por defecto */}
        {!pageData && (
          <>
            <Title text="Big Title" />
            <Text text="This is an editable paragraph. Click to edit me!" />
          </>
        )}
      </Element>
    </Frame>
  );
}
