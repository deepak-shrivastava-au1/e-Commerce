import React from 'react'
import { respondTo } from '@utilities/styled-components'
import styled from "styled-components"

import SummarySection from "@pages/Cart/ShoppingCart/SummarySection"
import PaymentSection from './PaymentSection'
import ScrollToTop from '@common/ScrollToTop'

const ShoppingCartContainer = styled.div`
  display: flex;
  gap:25px;
  margin-top:23px;
  margin-left:-15px;
  margin-right:-15px;
  
  ${respondTo.xs`
    flex-direction:column;
  `}
  ${respondTo.lg`
    flex-direction:row;
  `}
`

function ShoppingCart() {

  return (
    <>
      <ScrollToTop/>

      <ShoppingCartContainer>
        {/* INFO 1st Section */}
        <PaymentSection />
        {/* INFO 2nd Section */}
        <SummarySection style={{marginTop:'3rem'}} />
      </ShoppingCartContainer>

    </>
  )
}

export default ShoppingCart