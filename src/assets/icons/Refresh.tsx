import * as React from "react";

function Refresh(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M1.667 16.667v-5h5"        
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none" 
      />
      <path
        d="M1.667 11.667L5.534 15.3a7.5 7.5 0 0012.375-2.8M17.908 3.332v5h-5"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none" 
      />
      <path
        d="M17.908 8.332l-3.867-3.634a7.5 7.5 0 00-12.374 2.8"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none" 
      />
    </svg>
  );
}

const MemoRefresh = React.memo(Refresh);
export default MemoRefresh;
