import React, { useState } from 'react'
import Modal, { Props, Styles } from "react-modal"
import { Close, TrashForModalSVG } from "@icons"
import styled, { css } from 'styled-components'
import Button from "@common/Button"
import { useTranslation } from 'react-i18next'
import { cssVar } from 'polished'

Modal.setAppElement('#root');

const customStyles: Styles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zIndex : 888
  },
  overlay: {
    background: 'transparent'
  }
};

const ModalContentWrapper = styled.div`
${({ isPopUp }: { isPopUp: boolean, isAlert: boolean }) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  min-width: ${isPopUp ? '442px' : '444px'};
  min-height: ${isPopUp ? '283px' : '260px'};

  >svg{
    margin-bottom: 24px;
  }

  .close_button{
    position:absolute;
    right:0;
    top:0;
    margin-top:20px;
    margin-right:25px;
  }
`}
`

const ModalTitle = styled.p`
  font-weight:var(--font-weight-bold);
  font-size: calc(var(--base-font-size) + 10px);
  color:var(--primary-color-2);
`

const ModalMessage = styled.p`
  font-size: calc(var(--base-font-size) + 2px);
  margin-top: 16px;
  color:var(--primary-color-3);
`

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top:14px;
  >:last-child{
    margin-left: 18px;
  }
`

interface Props_ extends Props {
  // children:React.ReactNode,
  title?: string,
  message?: string,
  isAlert?: boolean,
  isPopUp?: boolean,
  icon?: React.ReactNode,
  onSecondaryButtonClick?: any,
  secondaryActionText?: string,
  hasCancelButton?: boolean
}

function Modal_(props: Props_) {
  const { isOpen, onRequestClose, style, title, hasCancelButton = true, message, icon, onSecondaryButtonClick, secondaryActionText, isAlert = true, isPopUp = false, ...rest } = props

  const { t } = useTranslation();

  return (
    <React.Fragment>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={customStyles}
        {...rest}
      >
        <ModalContentWrapper {...{ isPopUp, isAlert }} >
          
          {/* Close Button */}
          <Close
            className="close_button primary-icon-2"
            onClick={onRequestClose}
            width='22px'
            height='22px'
            style={{ cursor: "pointer" }}
          />

          {/* Icon Component */}
          {icon}

          {/* Title */}
          <ModalTitle>{title}</ModalTitle>
          
          {/* Message */}
          <ModalMessage>{message}</ModalMessage>
          
          {/* Action Buttons */}
          {!isPopUp && isAlert
            &&
            <ButtonsWrapper>
              {hasCancelButton ? <Button variant="outlined" onClick={onRequestClose} style={{ padding: "6px 20px" }}>{t('CON_CANCEL')}</Button> : null}
              <Button variant="solid" onClick={() => onSecondaryButtonClick()} style={{ padding: "6px 20px" }}>{secondaryActionText}</Button>
            </ButtonsWrapper>
          }
        </ModalContentWrapper>
      </Modal>
    </React.Fragment>
  )
}

export default Modal_;
