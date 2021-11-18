import * as React from 'react';

function ChevronLeft(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        fill='none'
        d='M15 18L9 12L15 6'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

const MemoChevronLeft = React.memo(ChevronLeft);
export default MemoChevronLeft;
