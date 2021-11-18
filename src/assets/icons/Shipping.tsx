import * as React from "react"

function Shipping(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2 8a3 3 0 013-3h6a3 3 0 013 3v8a1 1 0 01-1 1H9a1 1 0 010-2h3V8a1 1 0 00-1-1H5a1 1 0 00-1 1v6a1 1 0 001 1v2a3 3 0 01-3-3V8z"
        stroke="none"
      />
      <path
        d="M12 9a1 1 0 011-1h4a1 1 0 01.707.293l3.414 3.414A3 3 0 0122 13.828V14a3 3 0 01-3 3v-2a1 1 0 001-1v-.172a1 1 0 00-.293-.707L16.586 10H14v5h1a1 1 0 010 2h-2a1 1 0 01-1-1V9zm-5 6a1 1 0 100 2 1 1 0 000-2zm-3 1a3 3 0 116 0 3 3 0 01-6 0z"
        stroke="none"
      />
      <path
        d="M17 15a1 1 0 100 2 1 1 0 000-2zm-3 1a3 3 0 116 0 3 3 0 01-6 0z"
        stroke="none"
      />
    </svg>
  )
}

const MemoShipping = React.memo(Shipping);
export default MemoShipping;
