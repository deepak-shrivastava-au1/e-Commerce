import ScrollToTop from "@common/ScrollToTop";
import YouMayLike from "@pages/Promotions/Promotion/YouMayLike";
import { respondTo } from "@utilities/styled-components";
import styled from "styled-components";
import CartSection from "./CartSection";
import SummarySection from "./SummarySection";

const ShoppingCartContainer = styled.div`
  display: flex;
  gap: 25px;
  margin-top: 5px;
  margin-left: -15px;
  margin-right: -15px;
 

  ${respondTo.xs`
    flex-direction:column;    
    
  `}
  ${respondTo.lg`
    flex-direction:row;
  `}
`;

function ShoppingCart() {
  return (
    <>
      <ScrollToTop />

      <ShoppingCartContainer>
        {/* INFO 1st Section */}
        <CartSection />
        {/* INFO 2nd Section */}
        <SummarySection />
      </ShoppingCartContainer>
      {/* Promotional Section */}
      <YouMayLike page='ShoppingCart' />
    </>
  );
}

export default ShoppingCart;
