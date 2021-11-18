import * as React from "react";

function Close(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M15 5L5 15M5 5l10 10"        
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const MemoClose = React.memo(Close);
export default MemoClose;
