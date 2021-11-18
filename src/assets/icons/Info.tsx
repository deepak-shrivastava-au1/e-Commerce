import React from "react";
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

interface props {
  element?: React.SVGProps<SVGSVGElement>,
  title?: string
 }

function Info(props: props) {
  function renderTooltip(title:any) {
    return (
      <Tooltip id="button-tooltip" {...props}>
       {title}
      </Tooltip>
    );
  }
  return (
  
    <OverlayTrigger
    placement="bottom"
    delay={{ show: 250, hide: 400 }}
    overlay={renderTooltip(props.title)}
  >
    <svg
     
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        stroke="#6D899D"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 16V12"
        stroke="#6D899D"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 8H12.01"
        stroke="#6D899D"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    </OverlayTrigger>
   
   );
}

const MemoInfo = React.memo(Info);
export default MemoInfo;
