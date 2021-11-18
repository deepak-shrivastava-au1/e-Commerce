import * as React from "react"

function PickList(props: React.SVGProps<SVGSVGElement>) {
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
        d="M7.94 18.895l.312.314.243-.247a2.601 2.601 0 013.714 0l.244.247.244-.247a2.601 2.601 0 013.713 0l.244.247.31-.314a2.6 2.6 0 012.824-.592V4.129H5.101v14.18a2.6 2.6 0 012.84.585zM6.456 20.4a.52.52 0 00-.662-.066l-1.977 1.335a.52.52 0 01-.29.09.529.529 0 01-.526-.533V4.129C3 2.953 3.94 2 5.1 2h14.688c1.16 0 2.101.953 2.101 2.13v17.093c0 .105-.03.209-.089.296a.52.52 0 01-.729.146l-1.958-1.33a.52.52 0 00-.663.066l-1.425 1.443a.52.52 0 01-.742 0l-1.358-1.376a.52.52 0 00-.743 0l-1.358 1.376a.52.52 0 01-.742 0l-1.358-1.376a.52.52 0 00-.743 0l-1.358 1.376a.52.52 0 01-.743 0L6.455 20.4z"
        stroke="none"
      />
      <path d="M7 8h10V6H7v2zM7 13h5v-2H7v2zM14 13h3v-2h-3v2z" stroke="none" />
    </svg>
  )
}

const MemoPickList = React.memo(PickList);
export default MemoPickList;
