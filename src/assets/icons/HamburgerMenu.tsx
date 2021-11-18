import * as React from "react";

function HamburgerMenu(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M3 12h18M3 6h18M3 18h18"
        strokeWidth={2} 
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const MemoHamburgerMenu = React.memo(HamburgerMenu);
export default MemoHamburgerMenu;
