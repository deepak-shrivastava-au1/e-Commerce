import * as React from "react";

function Eye(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" fill="none"/>
    </svg>
  );
}

const MemoEye = React.memo(Eye);
export default MemoEye;
