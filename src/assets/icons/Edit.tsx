import * as React from "react";

function Edit(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 16 16" fill="none" {...props}>
      <path
        d="M11.333 2A1.886 1.886 0 0114 4.666l-9 9-3.667 1 1-3.666 9-9z"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

const MemoEdit = React.memo(Edit);
export default MemoEdit;
