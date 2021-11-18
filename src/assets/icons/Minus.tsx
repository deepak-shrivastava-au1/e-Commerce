import * as React from "react";

function Minus(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 32 32" fill="none" {...props}>
      <g>
        <rect
          x={0.5}
          y={0.5}
          width={30.875}
          height={31}
          rx={3.5}
          fill="none"
          
        />
        <rect
          x={7.969}
          y={15}
          width={15.938}
          height={1}
          rx={1}
          fill="none"
        />
      </g>
    </svg>
  );
}

const MemoMinus = React.memo(Minus);
export default MemoMinus;