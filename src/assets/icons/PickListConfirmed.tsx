import * as React from "react"

function PickListConfirmed(props: React.SVGProps<SVGSVGElement>) {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.252 19.21l-.311-.316a2.6 2.6 0 00-2.84-.586V4.13h14.687v7.638l.04 1.233h1.99l-.018-2.298.089-6.573c0-1.176-.94-2.129-2.1-2.129H5.1C3.94 2 3 2.953 3 4.13v17.096c0 .294.235.532.525.532a.52.52 0 00.291-.09l1.977-1.334a.52.52 0 01.662.066l1.425 1.444a.52.52 0 00.743 0l1.358-1.376a.52.52 0 01.743 0l1.357 1.376a.52.52 0 00.743 0l.176-.178v-2.968a2.653 2.653 0 00-.303.264l-.244.247-.244-.247a2.601 2.601 0 00-3.713 0l-.244.247zM7 8h10V6H7v2zm5 5H7v-2h5v2z"
        stroke="none"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.5 24a6.5 6.5 0 100-13 6.5 6.5 0 000 13zm4.22-8.306a1 1 0 00-1.44-1.388l-4.093 4.252-1.467-1.524a1 1 0 00-1.44 1.387l2.187 2.273a1 1 0 001.441 0l4.813-5z"
        stroke="none"
      />
    </svg>
  )
}
const MemoPickListConfirmed = React.memo(PickListConfirmed);
export default MemoPickListConfirmed;