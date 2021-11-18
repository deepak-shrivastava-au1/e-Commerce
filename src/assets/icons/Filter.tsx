import * as React from "react";

function Filter(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 20 18"
      fill="none"
      {...props}
    >
      <path d="M18.334 1.5H1.667l6.667 7.883v5.45l3.333 1.667V9.383L18.334 1.5z" fill="none"/>
    </svg>
  );
}

const MemoFilter = React.memo(Filter);
export default MemoFilter;
