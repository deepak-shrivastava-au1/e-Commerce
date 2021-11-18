import * as React from "react";

function Copy(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M20 9h-9a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 002-2v-9a2 2 0 00-2-2z"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none" 
      />
      <path
        d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none" 
      />
    </svg>
  );
}

const MemoCopy = React.memo(Copy);
export default MemoCopy;