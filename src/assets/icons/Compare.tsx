import * as React from "react";

function Compare(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24"  {...props}>
      <path
        d="M13 6.75a1 1 0 11-2 0 1 1 0 012 0zM13 1.5a1 1 0 11-2 0 1 1 0 012 0zM13 12a1 1 0 11-2 0 1 1 0 012 0zM13 17.25a1 1 0 11-2 0 1 1 0 012 0z"
       
      />
      <path
        d="M12 24a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM2 5.25v13.5a3 3 0 003 3h3a1 1 0 001-1v-.029a1 1 0 00-1-1H5a1 1 0 01-1-1V5.336a1 1 0 011-1h3a1 1 0 001-1V3.25a1 1 0 00-1-1H5a3 3 0 00-3 3zM19 2.25h-3a1 1 0 00-1 1v.044a1 1 0 001 1h3a1 1 0 011 1v13.457a1 1 0 01-1 1h-3a1 1 0 000 1.999h3a3 3 0 003-3V5.25a3 3 0 00-3-3z"
        stroke="none"
      />
    </svg>
  );
}

const MemoCompare = React.memo(Compare);
export default MemoCompare;
