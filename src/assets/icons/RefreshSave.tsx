import * as React from "react";

function SaveRefresh(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path stroke="none" d="M17.6 3.5v12.7a2.1 2.1 0 01-.6 1l-.9.4H1.4A1.5 1.5 0 010 16V1.7A2.2 2.2 0 01.1.9 1.7 1.7 0 011.7 0h12.2l.5.2 2.9 3zm-4-2.6v4.6a.7.7 0 01-.1.5 1.5 1.5 0 01-1.6 1.2c-2.3.1-4.7 0-7.1 0a1.4 1.4 0 01-1.3-.6 2 2 0 01-.3-1.1V1a10.8 10.8 0 00-1.8 0 .6.6 0 00-.6.6v14.7a.6.6 0 00.5.6h1.1V9.4c0-.4.1-.5.5-.5h11.7c.5 0 .6.1.6.5v7.5h.7a.8.8 0 00.9-.9V4c0-.1-.1-.2-.1-.3S14.8 1.9 13.9.9a.2.2 0 00-.3 0zM3.2 9.7v7.2h11.2V9.7zM12.8.9H4v4.6c0 .5.3.8.9.8h7.3a.8.8 0 00.6-.8V.9z" />
      <circle cx={14.7} cy={12.3} r={5.7} stroke="none" />
      <g>
        <path fill="#fff" stroke="none" d="M14.6 8l1.8 1.4c.2 0 .2.1 0 .1a10.9 10.9 0 01-1.7 1.3h-.1V10H14a2.3 2.3 0 00-1.7 1.6 2.5 2.5 0 00.3 2.1c.1.1.2.2.2.3a.4.4 0 01-.2.5.5.5 0 01-.6-.1l-.4-.6a2.9 2.9 0 01-.3-1.8 3.2 3.2 0 012.5-2.9h.8v-1zM14.8 14.9h.7a2.5 2.5 0 001.2-3.7.5.5 0 01-.2-.4c0-.2.1-.4.3-.4s.4-.1.5.1a2.1 2.1 0 01.4.6 3 3 0 01-.2 3.3 3.3 3.3 0 01-2.3 1.5h-.4v.9h-.2l-1.4-1-.3-.3c-.1 0-.1-.1 0-.1l1.7-1.3h.2z" />
      </g>
    </svg>
  );
}



const MemoSaveRefresh = React.memo(SaveRefresh);
export default MemoSaveRefresh;