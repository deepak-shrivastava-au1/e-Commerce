import * as React from "react";

function PreviousArrow(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="23" height="16" viewBox="0 0 23 16" fill="none" xmlns="http://www.w3.org/2000/svg"{...props}>
    <path fill="none" d="M10 4L6 8L10 12"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path fill="none" d="M17 4L13 8L17 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    
    
  );
}

const MemoPreviousArrow = React.memo(PreviousArrow);
export default MemoPreviousArrow;
