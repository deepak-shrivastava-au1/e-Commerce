import React, { useContext, ReactNode, ReactElement } from "react"
import TimelineContextProvider from "./TimelineContextProvider"
import { TimelineContext } from "./TimelineContextProvider"
import styled, { css } from "styled-components"
import { respondTo, alignCenter } from "@utilities/styled-components"
import { cssVar, rgba } from "polished"
import { cartSelector } from "@slices/cart/getTemporaryOrderData"
import { useSelector } from "react-redux"

interface IProps_ {
  for_: number,
  activeKey: number,
  cartItemsLineCount:number
}

const CartTimeLine = styled.div`
 ${() => css`

  position:relative;
  text-align: start;

  ${respondTo.xs`
  .timeline{
    border-bottom:var(--thicker-border) var(--primary-color-4);
  }
  `}
    
  ${respondTo.md`
    .timeline{
      display:none;
    }
  `}

 `} 
`
const ContentWrapper = styled.div`
  z-index:1000;
`
const PanelWrapper = styled.div`
${({ for_, activeKey, cartItemsLineCount }: IProps_) => css`

  
.marker{
    ${alignCenter}

    position:relative;
    font-weight:var(--font-weight-bold);

    color: var(--white);
    width: 50px;
    height: 50px;
    cursor:pointer;
    line-height: 50px;
    font-size: calc(var(--base-font-size) + 10px);
    position: absolute;
    margin-left: -25px;
    border-radius: 50%;
    color:var(--primary-color-4);

    background-color: var(--white);
    border:var(--thicker-border) var(--primary-color-4);
  }

  .marker::after{
    display: flex;
    position: absolute;
    left: 0;
    width:max-content;
   
    color: ${cssVar('--primary-color-2')};
    
    ${respondTo.xs`
      margin-top:80px;
      margin-left:${activeKey === 3 ? '-110px' : '-20px'};
      margin-left:${activeKey === 1 ? '0px' : ''};
      font-size:${cssVar('--base-font-size')};
      font-weight:${cssVar('--font-weight-medium')};
      content:${activeKey !== for_ ? '""' : 'attr(title-data)'};
    `}

    ${respondTo.md`
      margin-top:0px;
      margin-left:calc(20% + 100%);
      font-weight:${cssVar('--font-weight-regular')};
      content:attr(title-data);
      font-size:calc(${cssVar('--base-font-size')} + 2px);
    `}
  }

  .active{
    border:var(--thicker-border) var(--primary-color-1);
    /* needs a reference from theme.scss */
    background-color: #E9F9F9; 
    font-weight: var(--font-weight-bold);
    color:var(--primary-color-1);

    svg{
      stroke:var(--primary-icon-1);
    }
  }

  .active::after{
    color: ${cssVar('--primary-color-1')};
  }

  .mfirst{
    position: relative;
    left:35%;
    top:-25px;

    ${respondTo.xs`
      left:16px;
    `}

    ${respondTo.md`
      left:35%;
    `}
  }

  .m2{
    top:-25px;
    left:32.5%;
    cursor:${cartItemsLineCount>0 ? 'pointer' : 'not-allowed'};

    ${respondTo.xs`
      left:50%;
    `}

    ${respondTo.md`
      left:32.5%;

      &::before{
        position: absolute;
        width: 440%;
        right:0;
        margin-right: 47px;
        border-top: var(--thin-border) ${rgba(cssVar('--primary-color-4'), 0.3)};
        content: "";
      }
    `}
    }

  .mlast{
      top:-25px;
      cursor:${cartItemsLineCount>0 ? 'pointer' : 'not-allowed'};

      ${respondTo.xs`
        left:95.5%;
        &::before{
          content:"";
        }
      `}

      ${respondTo.md`
        left:66%;

        &::before{
          position: absolute;
          width: 350%;
          right:0;
          margin-right:47px;
          border-top: var(--thin-border) ${rgba(cssVar('--primary-color-4'), 0.3)};
          content: "";
        }
      `}
    }

`
  }
`


interface IPanelProps {
  for_: number,
  children: Array<ReactElement> | ReactElement | ReactNode
}

const Panel = ({ for_, children, ...props }: IPanelProps) => {

  const { activeKey, handleTab } = useContext(TimelineContext);

  const cartItemsLineCount = useSelector(cartSelector)?.cartItems?.lineCount;

  const markerClass: { [key: number]: string } = {
    1: "mfirst",
    2: "m2",
    3: "mlast"
  }


  return (
    <PanelWrapper {...{for_, activeKey, cartItemsLineCount}} >
      <div
        className={`marker ${markerClass[for_]} ${(for_ === activeKey || for_ < activeKey) ? 'active' : ''}`}
        onClick={() => {
          if(cartItemsLineCount===0 && (for_===3 || for_ ===2)){
            return;
          }
          handleTab(for_)
        }
        }
        {...props}
      >
        {children}
      </div>
    </PanelWrapper>
  );
}

interface IContent {
  for_: number,
  children: ReactNode
}

const Content = ({ for_, children }: IContent) => {

  const { activeKey } = useContext(TimelineContext);

  return (
    <>
      {
        for_ === activeKey &&
        <ContentWrapper>
          {children}
        </ContentWrapper>
      }
    </>
  );
}

interface IProps {
  children: ReactNode
}

function Index(props: IProps) {
  const { children } = props

  return (
    <TimelineContextProvider>
      <CartTimeLine>
        <div className="timeline"></div>
        {children}
      </CartTimeLine>
    </TimelineContextProvider>
  )
}

Index.Panel = Panel;
Index.Content = Content;

export default Index
