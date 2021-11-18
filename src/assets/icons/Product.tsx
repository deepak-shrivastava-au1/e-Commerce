import * as React from "react"

function Product(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 11.5 12.7"
      {...props}
    >
      <g
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={0.75}
      >
        <path d="M8.4 4.7L3 1.6M11.1 8.7V3.9a1.4 1.4 0 00-.2-.6c-.1-.2-.3-.3-.4-.4L6.3.5 5.7.3l-.6.2L.9 2.9c-.1.1-.3.2-.4.4a1.4 1.4 0 00-.2.6v4.8a.8.8 0 00.2.5l.4.5 4.2 2.4h1.2l4.2-2.4.4-.5a.8.8 0 00.2-.5z" />
        <path d="M.5 3.3l5.2 3 5.2-3M5.7 12.3v-6" />
      </g>
    </svg>
  )
}
const MemoProduct = React.memo(Product);
export default MemoProduct;
