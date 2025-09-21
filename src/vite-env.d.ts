/// <reference types="vite/client" />

// Spline Viewer Types
declare namespace JSX {
  interface IntrinsicElements {
    'spline-viewer': {
      url: string;
      background?: string;
      className?: string;
      style?: React.CSSProperties;
    };
  }
}
