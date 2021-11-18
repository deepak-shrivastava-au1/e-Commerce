import * as React from "react";

function Excel(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" stroke="none" height="1em" viewBox="0 0 24 24"  {...props}>
      <path
        d="M20.06 6.515L15.169 1.23A.7.7 0 0014.655 1H5.001c-.403 0-.728.351-.728.786v20.428c0 .435.325.786.728.786h14.545c.402 0 .727-.351.727-.786V7.072a.823.823 0 00-.213-.557zm-1.464.918H14.32v-4.62l4.277 4.62zm.041 13.8H5.91V2.767h6.863V8.07c0 .274.101.536.28.73a.92.92 0 00.675.302h4.91v12.13zm-6.316-7.56l-1.404-2.515a.27.27 0 00-.235-.143H9.81a.24.24 0 00-.146.047.308.308 0 00-.084.408l1.87 3.201-1.895 3.261a.313.313 0 00-.007.3.287.287 0 00.1.11c.042.028.09.042.14.042h.783a.27.27 0 00.232-.14l1.425-2.492 1.416 2.49c.05.088.139.14.232.14h.852a.27.27 0 00.148-.047.309.309 0 00.082-.408l-1.91-3.202 1.94-3.253a.313.313 0 00-.092-.412.258.258 0 00-.139-.042h-.81a.27.27 0 00-.235.142l-1.39 2.512z"
        stroke="none"
      />
    </svg>
  );
}

const MemoExcel = React.memo(Excel);
export default MemoExcel;