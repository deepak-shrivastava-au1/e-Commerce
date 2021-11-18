import * as React from "react";

function CartPause(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={29}
      height={24}
      viewBox="0 0 29 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9 22a1 1 0 100-2 1 1 0 000 2zM20 22a1 1 0 100-2 1 1 0 000 2zM1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"
        fill="none"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={22.5} cy={17.5} r={6.5} stroke="none"/>
      <rect x={23.5} y={14.5} width={1.5} height={6} rx={0.75} fill="#fff" stroke="none" />
      <rect x={20.5} y={14.5} width={1.5} height={6} rx={0.75} fill="#fff" stroke="none"/>
    </svg>
  );
}

const MemoCartPause = React.memo(CartPause);
export default MemoCartPause;