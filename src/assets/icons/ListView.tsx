import * as React from "react";

function ListView(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 6.66919H21"
        fill="none"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8 12.6692H21"
        fill="none"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8 18.6692H21"
        fill="none"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M3 6.66919H3.01"
        fill="none"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M3 12.6692H3.01"
        fill="none"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M3 18.6692H3.01"
        fill="none"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

const MemoListView = React.memo(ListView);
export default MemoListView;
