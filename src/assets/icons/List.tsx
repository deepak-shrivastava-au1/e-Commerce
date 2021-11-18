import * as React from "react";

function List(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="22" height="21" fill="none" viewBox="0 0 22 21" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fill="none" d="M11.0008 16.75L4.82881 19.995L6.00781 13.122L1.00781 8.25495L7.90781 7.25495L10.9938 1.00195L14.0798 7.25495L20.9798 8.25495L15.9798 13.122L17.1588 19.995L11.0008 16.75Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const MemoList = React.memo(List);
export default MemoList;
