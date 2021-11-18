import * as React from "react";

function Account(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 10 11" fill="none" {...props}>
      <path d="M5 9.5a4 4 0 100-8 4 4 0 000 8z" />
    </svg>
  );
}

const MemoAccount = React.memo(Account);
export default MemoAccount;
