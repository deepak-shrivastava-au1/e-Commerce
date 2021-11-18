import * as React from "react";

function Invoice(props: React.SVGProps<SVGSVGElement>) {
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
      d="M15 4v4a1 1 0 001 1h4"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.714 23H7.286a2.32 2.32 0 01-1.617-.65A2.191 2.191 0 015 20.777V5.222c0-.59.24-1.154.67-1.571A2.32 2.32 0 017.285 3h8L21 8.556v12.222c0 .59-.24 1.154-.67 1.571-.428.417-1.01.651-1.616.651zM9 8h1M9 14h6M13 18h2"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>

  );
}

const MemoInvoice = React.memo(Invoice);
export default MemoInvoice;
