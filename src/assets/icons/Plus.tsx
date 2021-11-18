import * as React from "react";

function Plus(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 32 32" {...props}>
      <g>
        <rect
          x={0.625}
          y={0.5}
          width={30.875}
          height={31}
          rx={3.5}
          fill="none"
        />
        <rect
          x={8.592}
          y={15}
          width={15.938}
          height={2}
          rx={1}
        />
        <rect
          x={15.565}
          y={24}
          width={16}
          height={1.992}
          rx={0.996}
          transform="rotate(-90 15.565 24)"
             />
      </g>
    </svg>
  );
}

const MemoPlus = React.memo(Plus);
export default MemoPlus;
