import * as React from "react";

function HelpCircle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path fill="none" d="M8.00065 14.6663C11.6825 14.6663 14.6673 11.6816 14.6673 7.99967C14.6673 4.31778 11.6825 1.33301 8.00065 1.33301C4.31875 1.33301 1.33398 4.31778 1.33398 7.99967C1.33398 11.6816 4.31875 14.6663 8.00065 14.6663Z"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path fill="none" d="M6.06055 6.00038C6.21728 5.55482 6.52665 5.17912 6.93385 4.9398C7.34105 4.70049 7.81981 4.61301 8.28533 4.69285C8.75085 4.7727 9.17309 5.01473 9.47726 5.37606C9.78144 5.7374 9.94792 6.19473 9.94721 6.66705C9.94721 8.00038 7.94721 8.66705 7.94721 8.66705"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path fill="none" d="M8 11.333H8.00667"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    
  );
}

const MemoHelpCircle = React.memo(HelpCircle);
export default MemoHelpCircle;