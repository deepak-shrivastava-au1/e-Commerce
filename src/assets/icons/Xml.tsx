import * as React from "react";

function Xml(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24"  {...props}>
      <path
        d="M20.06 6.515L15.169 1.23A.7.7 0 0014.655 1H5.001c-.403 0-.728.351-.728.786v20.428c0 .435.325.786.728.786h14.545c.402 0 .727-.351.727-.786V7.072a.823.823 0 00-.213-.557zm-1.464.918H14.32v-4.62l4.277 4.62zm.041 13.8H5.91V2.767h6.863V8.07c0 .274.101.536.28.73a.92.92 0 00.675.302h4.91v12.13z"
        stroke="none"
      />
      <path
        d="M10 18l-2.5-2.5L10 13m4.5 0l2.5 2.5-2.5 2.5m-1.616-5.406l-1.29 6.022"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const MemoXml = React.memo(Xml);
export default MemoXml;
