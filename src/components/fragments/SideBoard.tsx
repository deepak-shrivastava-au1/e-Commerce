import React, { useEffect, useState, Fragment } from 'react'
import SwipeableDrawer from '@material-ui/core/Drawer';
import styled from "styled-components"
import { respondTo } from '@utilities/styled-components'
import CloseIcon from "@material-ui/icons/Close";

const DrawerContainer = styled.figure`
  width: 500px;
  ${respondTo.xs`
  width: 100vw;
  padding: 0 16px 16px 16px;
  
  `}
  ${respondTo.sm`
  width: 500px;
    
  `}
  
`;

const DrawerHeader = styled.h3`
  padding: 10px 0px 5px 5px;
  font-weight: var(--font-weight-medium);
`;



const SideBoard : React.FC<{status:boolean, drawerHeader:string, onClose:Function, anchor:'right'|'left'}> = (props) => {
  
    const { status } = props;
    const [show, setShow] = useState<boolean>(false)

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      
      return;
    }
    
    setShow(open);
    props.onClose(false)

    
  };

  useEffect(() => {
    setShow(status)
    
  }, [status])
  

  return (
    <Fragment>
      <SwipeableDrawer
        anchor={props.anchor}
        open={show}
        onClose={toggleDrawer(false)}
      >
        <DrawerContainer>
           <DrawerHeader className="p-3">
            {props.drawerHeader}
            <span className="float-right" style={{ cursor: "pointer" }}>
              <CloseIcon onClick={toggleDrawer(false)} className="primary-icon-3 icon-md"/>
            </span>
          </DrawerHeader> 
            {props.children}
        </DrawerContainer>
       </SwipeableDrawer>
    </Fragment>
  )
}

export default SideBoard;
