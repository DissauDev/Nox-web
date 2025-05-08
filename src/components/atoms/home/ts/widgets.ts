 
 export type Widget =
  | {
      type: "image";
      src: string;
      alt: string;
      className?: string;
    }
  | {
      type: "text";
      tag: "h1" | "h3" | "p";
      content: string;
      className?: string;
    }
  | {
      type: "button";
      text: string;
      link: string;
      className?: string;
    }
  | {
      type: "spacer";
      size: "sm" | "md" | "lg";
    };
