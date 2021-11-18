import * as React from "react";

function Csv(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path fill="none" d="M9.33268 1.3335H3.99935C3.64573 1.3335 3.30659 1.47397 3.05654 1.72402C2.80649 1.97407 2.66602 2.31321 2.66602 2.66683V13.3335C2.66602 13.6871 2.80649 14.0263 3.05654 14.2763C3.30659 14.5264 3.64573 14.6668 3.99935 14.6668H11.9993C12.353 14.6668 12.6921 14.5264 12.9422 14.2763C13.1922 14.0263 13.3327 13.6871 13.3327 13.3335V5.3335L9.33268 1.3335Z"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path fill="none" d="M9.33398 1.3335V5.3335H13.334"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path fill="none" d="M10.6673 8.6665H5.33398"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path fill="none" d="M10.6673 11.3335H5.33398"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path fill="none" d="M6.66732 6H6.00065H5.33398"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    
    
    
  );
}

const MemoCsv = React.memo(Csv);
export default MemoCsv;
