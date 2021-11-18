import * as React from "react";

function Badge(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0)">
    <path d="M10.0003 12.4997C13.222 12.4997 15.8337 9.888 15.8337 6.66634C15.8337 3.44468 13.222 0.833008 10.0003 0.833008C6.77866 0.833008 4.16699 3.44468 4.16699 6.66634C4.16699 9.888 6.77866 12.4997 10.0003 12.4997Z" stroke="#FFDD07" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M10.0027 8.86066L7.94244 9.99967L8.336 7.58721L6.66699 5.87886L8.97022 5.52785L10.0003 3.33301L11.0304 5.52785L13.3337 5.87886L11.6647 7.58721L12.0582 9.99967L10.0027 8.86066Z" fill="#FFDD07"/>
    <path d="M6.84134 11.5747L5.83301 19.1664L9.99967 16.6664L14.1663 19.1664L13.158 11.5664" stroke="#FFDD07" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    <defs>
    <clipPath id="clip0">
    <rect width="20" height="20" fill="white"/>
    </clipPath>
    </defs>
    </svg>
  );
}

const MemoPrint = React.memo(Badge);
export default MemoPrint;
