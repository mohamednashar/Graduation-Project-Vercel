import * as React from "react";

function Icon5({ fill }) {
  return (
    <div className={`w-5 h-5 flex items-center justify-center`}>
      <svg viewBox="0 0 24 24" fill={fill}>
        <path d="M15.5 12c2.5 0 4.5 2 4.5 4.5 0 .88-.25 1.71-.69 2.4l3.08 3.1L21 23.39l-3.12-3.07c-.69.43-1.51.68-2.38.68-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5m0 2a2.5 2.5 0 00-2.5 2.5 2.5 2.5 0 002.5 2.5 2.5 2.5 0 002.5-2.5 2.5 2.5 0 00-2.5-2.5M10 4a4 4 0 014 4c0 .91-.31 1.75-.82 2.43-.86.32-1.63.83-2.27 1.47L10 12a4 4 0 01-4-4 4 4 0 014-4M2 20v-2c0-2.12 3.31-3.86 7.5-4-.32.78-.5 1.62-.5 2.5 0 1.29.38 2.5 1 3.5H2z" />
      </svg>
    </div>
  );
}

export default Icon5;
