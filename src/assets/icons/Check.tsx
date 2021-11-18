import * as React from "react";

function Check(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 10 8" fill="none"  {...props}>
      <path
        strokeLinecap="round"
        d="M.707 5.071l2.121 2.122M2.828 7.193L9.192.829"
      />
    </svg>
  );
}

const MemoCheck = React.memo(Check);
export default MemoCheck;