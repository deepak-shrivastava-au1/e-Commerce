import * as React from "react";

function TrashForModal(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle opacity="0.1" cx="50" cy="50" r="50" fill="#00A3A5" stroke="none" />
      <path d="M27.5 35H32.5H72.5" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path fill="none" d="M40 35V30C40 28.6739 40.5268 27.4021 41.4645 26.4645C42.4021 25.5268 43.6739 25 45 25H55C56.3261 25 57.5979 25.5268 58.5355 26.4645C59.4732 27.4021 60 28.6739 60 30V35M67.5 35V70C67.5 71.3261 66.9732 72.5979 66.0355 73.5355C65.0979 74.4732 63.8261 75 62.5 75H37.5C36.1739 75 34.9021 74.4732 33.9645 73.5355C33.0268 72.5979 32.5 71.3261 32.5 70V35H67.5Z"  strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>

  );
}

const MemoTrashForModal = React.memo(TrashForModal);
export default MemoTrashForModal;
