import * as React from "react";

function CartForModal(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 100 100" fill="none" {...props}>
      <circle opacity={0.1} cx={50} cy={50} r={50} fill="#00A3A5" />
      <path
        d="M42.5 75a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM70 75a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM22.5 22.5h10l6.7 33.475a5 5 0 005 4.025h24.3a5 5 0 005-4.025L77.5 35H35"
        
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

const MemoCartForModal = React.memo(CartForModal);
export default MemoCartForModal;
