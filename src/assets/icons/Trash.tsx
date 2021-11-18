import * as React from "react";

function Trash(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M2.5 5h15"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none" 
      />
      <path
        d="M6.666 5V3.334a1.667 1.667 0 011.667-1.667h3.333a1.667 1.667 0 011.667 1.667V5m2.5 0v11.667a1.667 1.667 0 01-1.667 1.667H5.833a1.667 1.667 0 01-1.667-1.667V5h11.667z"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none" 
      />
    </svg>
  );
}

const MemoTrash = React.memo(Trash);
export default MemoTrash;
