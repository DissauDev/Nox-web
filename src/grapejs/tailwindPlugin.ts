// src/grapesjs/tailwindPlugin.ts
export default function tailwindPlugin(editor: any) {
    editor.on('load', () => {
      const doc = editor.Canvas.getDocument();
      const link = doc.createElement('link');
      link.rel = 'stylesheet';
      link.href = `${window.location.origin}/tailwind.css`;
      doc.head.appendChild(link);
    });
  }
  