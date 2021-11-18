import React, { useEffect, useState } from 'react'
import Drawer from '@material-ui/core/Drawer';
import styled from "styled-components"
import { Close } from '@icons';
import { cssVar } from 'polished';

export const DrawerContent = styled.div`
  width:513px;
  display:flex;
  flex-direction: column;
  overflow:hidden;

  .header{
    display:flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 25px;
    border-bottom: var(--thin-border) var(--border-color);

    .title{
      font-size:calc(var(--base-font-size) + 4px);
      font-weight:var(--font-weight-medium);
    }
  }

  .terms_list{
    padding:17px 23px;
    overflow-y: scroll;
    color:var(--primary-color-3);

    >:not(:last-child){
      margin-bottom:20px;
    }

    .box{

      display:flex;
      flex-direction:column; 

      .title{
      font-weight:var(--font-weight-medium);
      text-transform: uppercase;
      margin-bottom:6px;
      }
      .message{
        display:flex;
        flex-direction: column;
        line-height: 24px;
     
        >:not(:last-child){
          margin-bottom:10px;
        }
      }
    }
  }
`

interface Props { status: boolean, handleStatus:React.Dispatch<React.SetStateAction<boolean>> }

function TermsAndCondn(props: Props) {

  const { status, handleStatus } = props

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    handleStatus(open);
  };

  return (
    <>
      <Drawer
        anchor={'right'}
        open={status}
        onClose={toggleDrawer(false)}
      >
        <DrawerContent>
          <div className="header">
            <p className='title'>Terms And Condition</p>
            <Close width='12px' height="12px"
              onClick={toggleDrawer(false)}
              stroke={`${cssVar('--primary-color-3')}`}
            />
          </div>

          <div className="terms_list">
            <div className="box">
              <span className="title">
                terms of usage:
              </span>
              <span className="message">
                All the material sold on NewTemaplateSample is copyrighted. The copyrights belong to NewTemaplateSample.
              </span>
            </div>
            <div className="box">
              <span className="title">
                1.) important information
              </span>
              <span className="message">
                You should carefully read the following Terms and Conditions. When you purchase or use our product(s) that means you have read and accepted these Terms and Conditions; releasing NewTemaplateSample of the obligation for issues that may spring up later.
              </span>
            </div>
            <div className="box">
              <span className="title">
                2.) license
              </span>
              <span className="message">
                NewTemaplateSample currently allows you non-exclusive limited license only. This effectively means that you can use the web templates and other products sold through our web site by independent content providers (the "products") in conformity with these Terms of Use and Conditions (the "license") issued by NewTemaplateSample.
              </span>
            </div>
            <div className="box">
              <span className="title">
                MODIFICATIONS
              </span>
              <span className="message">
                You are empowered to make all necessary change(s) to the products to suit your designs.
              </span>
            </div>
            <div className="box">
              <span className="title">
                UNAUTHORIZED USE
              </span>
              <span className="message">
                <p>
                  CD, DISKETTE & OTHERS Please do NOT place any of our products on a diskette, CD, website or any other medium and offer them for redistribution or resale, without prior penned/written consent from our company.
                </p>
                <p>
                  DANGERS The authorities in charge of NewTemaplateSample have filed its works with various copyright offices throughout the world. If any misuse or distribution of our templates/content is reported or hinted, then it might result in serious penalties. Our work is original. We will do everything to protect our rights as well as the work(s). NewTemaplateSample will engage legal action for whatever losses resulting from your abuse of our content.
                </p>
                <p>
                  Word of caution: NewTemaplateSample does NOT grant exclusive rights for the items downloaded from our website.
                </p>
              </span>
            </div>
            <div className="box">
              <span className="title">
                TRANSFERABILITY TERMS
              </span>
              <span className="message">
                In absence of written/penned permission from NewTemaplateSample, you may not sub-license, assign, or transfer this license to anyone else.
              </span>
            </div>
            <div className="box">
              <span className="title">
                OWNERSHIP CONDITIONS
              </span>
              <span className="message">
                <p>
                  All the products displayed in this website are property of NewTemaplateSample.
                </p>
                <p>
                  You understand that NewTemaplateSample is not responsible for the content, quality or state of any information, product or service offered in this website.
                </p>
                <p>
                  NewTemaplateSample formally and explicitly denies any and all warranties, communicated and or understood, including (but not limited to) any warranties of accuracy, reliability, state or worthiness for a particular purpose by any vendor, customer, or associate offering information, products, any services linked to the NewTemaplateSample website.
                </p>
              </span>
            </div>
            <div className="box">
              <span className="title">
                DENIAL OF SERVICE
              </span>
              <span className="message">
                NewTemaplateSample formally and explicitly denies any and all warranties, communicated and or understood, including (but not limited to) any warranties of accuracy, reliability, state or worthiness for a particular purpose by any vendor, customer, or associate offering information, products, any services linked to the NewTemaplateSample website.

              </span>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default TermsAndCondn
