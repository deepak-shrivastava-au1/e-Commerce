import * as React from "react";

function CartAdd(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24px" height="24px" viewBox="0 0 29 25" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clipPath="url(#clip0)">
        <path d="M9 22.0002C9.55228 22.0002 10 21.5525 10 21.0002C10 20.448 9.55228 20.0002 9 20.0002C8.44772 20.0002 8 20.448 8 21.0002C8 21.5525 8.44772 22.0002 9 22.0002Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 22.0002C20.5523 22.0002 21 21.5525 21 21.0002C21 20.448 20.5523 20.0002 20 20.0002C19.4477 20.0002 19 20.448 19 21.0002C19 21.5525 19.4477 22.0002 20 22.0002Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M1 1.00024H5L7.68 14.3902C7.77144 14.8506 8.02191 15.2642 8.38755 15.5585C8.75318 15.8529 9.2107 16.0092 9.68 16.0002H19.4C19.8693 16.0092 20.3268 15.8529 20.6925 15.5585C21.0581 15.2642 21.3086 14.8506 21.4 14.3902L23 6.00024H6" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <circle cx="22.5" cy="17.5002" r="6.5" stroke="none" />
      <path d="M21.8945 18.2913H19.5625V17.2483H21.8945V14.8577H22.9492V17.2483H25.2871V18.2913H22.9492V20.6702H21.8945V18.2913Z" fill="#fff" stroke="#fff" />
      <defs>
        <clipPath id="clip0">
          <rect width="24" height="24" fill="#fff" stroke="#fff" transform="translate(0 0.000244141)" />
        </clipPath>
      </defs>
    </svg>

  );
}

const MemoCartAdd = React.memo(CartAdd);
export default MemoCartAdd;
