import React from 'react'
import { useTranslation } from 'react-i18next';
import styled from "styled-components"
import loaderGif from "../../assets/icons/loadinfo.gif";


const OverLayContainer = styled.div`
    display:flex;
    flex-direction: column;
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0px;
    left: 0px;
    align-items: center;
    justify-content: center;
    font-size: 1.2em;
    color: #FFF;
    background: rgba(0, 0, 0, 0.3);
    z-index: 800;
    -webkit-transition: opacity 150s ease-in-out;
    -moz-transition: opacity 150s ease-in-out;
    -ms-transition: opacity 150s ease-in-out;
    transition: opacity 150s ease-in-out;

    >p{
      margin-top:15px;
    }
`

interface Props {
  active: boolean
}

function LoadingOverlay(props: Props) {
  const { active } = props

  const { t } = useTranslation();

  return (
    <>
      {active ?
        <OverLayContainer>
          <img className='loader-gif' src={loaderGif} alt='loading...' />
          <p>{t('CON_LOADING')}</p>
        </OverLayContainer> : null
      }
    </>
  )
}

export default LoadingOverlay
