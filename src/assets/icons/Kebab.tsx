import * as React from "react";

function Kebab(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 6 20" stroke="none" {...props}>
      <path
        d="M0 3a3 3 0 106 0 3 3 0 00-6 0zm3 1a1 1 0 110-2 1 1 0 010 2zm0 9a3 3 0 110-6 3 3 0 010 6zm-1-3a1 1 0 102 0 1 1 0 00-2 0zm1 10a3 3 0 110-6 3 3 0 010 6zm-1-3a1 1 0 102 0 1 1 0 00-2 0z"
        stroke="none"
      />
    </svg>
  );
}

const MemoKebab = React.memo(Kebab);
export default MemoKebab;
