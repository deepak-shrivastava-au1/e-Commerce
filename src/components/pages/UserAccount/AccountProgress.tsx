import React, { ReactNode, ReactElement } from "react";
import styled, { css } from "styled-components";
import { respondTo, alignCenter } from "@utilities/styled-components";
import { cssVar, rgba } from "polished";

interface IProps_ {
  for_: number;
  activeKey: number;
}

const AccountSteps = styled.div`
  ${() => css`
    position: relative;
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
`;
const ContentWrapper = styled.div`
  z-index: 1000;
`;
const PanelWrapper = styled.div`
  ${({ for_, activeKey }: IProps_) => css`
    margin-left: 20px;

    .marker {
      ${alignCenter}
      position:fixed;
      font-weight: var(--font-weight-bold);
      color: var(--white);
      width: 48px;
      height: 48px;
      cursor: pointer;
      line-height: 48px;
      font-size: calc(var(--base-font-size) + 10px);
      position: absolute;
      margin-left: -25px;
      border-radius: 50%;
      color: var(--primary-color-4);

      background-color: var(--white);
      border: var(--thicker-border) var(--primary-color-4);
    }

    .marker::after {
      display: flex;
      position: absolute;
      left: 0;
      width: max-content;

      color: ${cssVar("--primary-color-2")};

      ${respondTo.xs`
      margin-top:80px;
      margin-left:${activeKey === 3 ? "-110px" : "-20px"};
      margin-left:${activeKey === 1 ? "0px" : ""};
      font-size:${cssVar("--base-font-size")};
      font-weight:${cssVar("--font-weight-medium")};
    `}

      ${respondTo.md`
      margin-top:0px;
      margin-left:calc(20% + 100%);
      font-weight:${cssVar("--font-weight-regular")};
      content:attr(title-data);
      font-size:calc(${cssVar("--base-font-size")} + 2px);
    `}
    }

    .active {
      border: var(--thicker-border) var(--primary-color-1);
      /* needs a reference from theme.scss */
      background-color: #e9f9f9;
      font-weight: var(--font-weight-bold);
      color: var(--primary-color-1);
  
    }

    .active::after {
      color: ${cssVar("--primary-color-1")};
    }

    .mfirst {
      @media (max-width: 768px) {
        top: -35px;
        left: 20%;
      }
      position: relative;
      top: -15px;
      left: 40%;
    }

    .m2 {
      top: -25px;
      left: 30%;

      ${respondTo.xs`
      left:49%;
      

      /* &::before{
        content: "";
      } */
    `}

      ${respondTo.md`
      left:30%;

      &::before{
        position: absolute;
        width: 27.5px;
        right:0;
        margin-right: 47px;
        border-top: var(--thin-border) ${rgba(
          cssVar("--primary-color-4"),
          0.3
        )};
        content: "";
      }
    `}
    }

    .mlast {
      top: -25px;
      cursor: pointer;

      ${respondTo.xs`
        left:98.5%;
        &::before{
          content:"";
        }
      `}

      ${respondTo.md`
        left:52.5%;

        &::before{
          position: absolute;
          width: 30px;
          right:0;
          margin-right:47px;
          border-top: var(--thin-border) ${rgba(
            cssVar("--primary-color-4"),
            0.3
          )};
          content: "";
        }
      `}
    }
  `}
`;

interface IPanelProps {
  for_: number;
  activeKey: number;
  setActiveKey :  React.Dispatch<React.SetStateAction<number>>;
  children: Array<ReactElement> | ReactElement | ReactNode;
}

const AccountProgress = ({ for_, activeKey, setActiveKey, children, ...props }: IPanelProps) => {
  const markerClass: { [key: number]: string } = {
    1: "mfirst",
    2: "m2",
    3: "mlast",
  };


  return (
    <PanelWrapper  for_={for_} activeKey={activeKey} >
      <div onClick={() => setActiveKey(for_) } className={`marker ${markerClass[for_]} ${(for_===activeKey || for_ < activeKey) ? "active" : ""}`}>
        {children}
      </div>
    </PanelWrapper>
  );
};

interface IContent {
  for_: number;
  children: ReactNode;
}

const Content = ({ for_, children }: IContent) => {
  return (
    <>
      <ContentWrapper>{children}</ContentWrapper>
    </>
  );
};

interface IProps {
  children: ReactNode;
}

function Index(props: IProps) {
  const { children } = props;

  return (
    <AccountSteps>
      <div className="timeline"></div>
      {children}
    </AccountSteps>
  );
}

Index.Panel = AccountProgress;
Index.Content = Content;

export default Index;
