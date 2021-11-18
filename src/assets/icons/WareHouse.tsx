import * as React from "react"

function Warehouse(props: React.SVGProps<SVGSVGElement>) {
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
        d="M1 21V9.288a2 2 0 011.172-1.82l9-4.092a2 2 0 011.656 0l9 4.091A2 2 0 0123 9.287V21"
        strokeWidth={1.5}
        fill="none"
      />
      <rect x={5} y={11} width={14} height={2} rx={1} stroke="none"/>
      <rect x={5} y={15} width={14} height={2} rx={1} stroke="none" />
      <rect x={5} y={19} width={14} height={2} rx={1} stroke="none" />
    </svg>
  )
}

const MemoWarehouse = React.memo(Warehouse);
export default MemoWarehouse;
