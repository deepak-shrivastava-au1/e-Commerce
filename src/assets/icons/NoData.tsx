import * as React from "react"

function NoData(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={80}
      height={106.5}
      {...props}
    >
      <path
       
        strokeWidth={3}
        fill="none"
        d="M4.5 21h50a3 3 0 013 3v73a3 3 0 01-3 3h-50a3 3 0 01-3-3V24a3 3 0 013-3z"
      />
      <path
        fillRule="evenodd"
        stroke="none"
        d="M9 53h40a1.5 1.5 0 010 3H9a1.5 1.5 0 010-3zM9 65h40a1.5 1.5 0 010 3H9a1.5 1.5 0 010-3zM9 76h40a1.5 1.5 0 010 3H9a1.5 1.5 0 010-3zM9 87h40a1.5 1.5 0 010 3H9a1.5 1.5 0 010-3zM9 31h22a1.5 1.5 0 010 3H9a1.5 1.5 0 010-3zM9 42h22a1.5 1.5 0 010 3H9a1.5 1.5 0 010-3z"
      />
 
 
     
      <path
        fillRule="evenodd"
        stroke="none"
        d="M55.5 67c10.493 0 19 8.507 19 19s-8.507 19-19 19-19-8.507-19-19 8.507-19 19-19z"
      />
      <path
        fillRule="evenodd"
        stroke="none"
        fill="#FFF"
        d="M48.146 77.515l15.839 15.839a.799.799 0 11-1.131 1.131L47.015 78.646a.799.799 0 111.131-1.131z"
      />
      <path
        fillRule="evenodd"
        stroke="none"
        fill="#FFF"
        d="M63.985 77.515a.799.799 0 010 1.131L48.146 94.485a.799.799 0 11-1.131-1.131l15.839-15.839a.799.799 0 011.131 0z"
      />
    </svg>
  )
}

const MemoNoData = React.memo(NoData);
export default MemoNoData;