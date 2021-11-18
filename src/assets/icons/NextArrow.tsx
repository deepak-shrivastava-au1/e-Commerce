import * as React from "react";

function NextArrow(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path fill="none" d="M1 9L5 5L1 1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path fill="none" d="M8 9L12 5L8 1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    
  );
}

const MemoNextArrow = React.memo(NextArrow);
export default MemoNextArrow;