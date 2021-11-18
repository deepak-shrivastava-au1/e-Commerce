import * as React from "react";

function Search(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fill="none" d="M14.6667 25.3333C20.5577 25.3333 25.3333 20.5577 25.3333 14.6667C25.3333 8.77563 20.5577 4 14.6667 4C8.77563 4 4 8.77563 4 14.6667C4 20.5577 8.77563 25.3333 14.6667 25.3333Z"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path fill="none" d="M28.0002 28L22.2002 22.2"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const MemoSearch = React.memo(Search);
export default MemoSearch;
