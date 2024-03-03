import * as React from "react";

function Icon6({ fill }) {
  return (
    <div className={`w-5 h-5 flex items-center justify-center`}>
      <svg viewBox="0 0 24 24" fill={fill}>
        <path d="M16.5 12c2.5 0 4.5 2 4.5 4.5 0 .88-.25 1.71-.69 2.4l3.08 3.1L22 23.39l-3.12-3.07c-.69.43-1.51.68-2.38.68-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5m0 2a2.5 2.5 0 00-2.5 2.5 2.5 2.5 0 002.5 2.5 2.5 2.5 0 002.5-2.5 2.5 2.5 0 00-2.5-2.5M10 2h4a2 2 0 012 2v2h4a2 2 0 012 2v5.03A6.492 6.492 0 0016.5 10a6.5 6.5 0 00-6.5 6.5c0 1.75.69 3.33 1.81 4.5H4a2 2 0 01-2-2V8c0-1.11.89-2 2-2h4V4c0-1.11.89-2 2-2m4 4V4h-4v2h4z" />
      </svg>
    </div>
  );
}

export default Icon6;
