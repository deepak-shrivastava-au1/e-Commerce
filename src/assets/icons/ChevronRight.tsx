import * as React from 'react';

function ChevronRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width='24'
      height='80'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        fill='none' 
        d='M9 18L15 12L9 6'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

const MemoChevronRight = React.memo(ChevronRight);
export default MemoChevronRight;
