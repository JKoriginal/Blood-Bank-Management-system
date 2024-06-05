import React from "react";
import { SemiCircleProgress } from "react-semicircle-progressbar";

function SemiCircleProgressBar({ percentage }) {
  return (
    <div>
      <SemiCircleProgress
        percentage={percentage}
        size={{
          width: 220,
          height: 110,
        }}
        strokeWidth={10}
        strokeColor="#f00"
      />
    </div>
  );
}

export default SemiCircleProgressBar;
