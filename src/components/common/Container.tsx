import React from 'react'
import styled from "styled-components";


function Container() {
    return (
      <div>
        <StyledContainer>
            
        </StyledContainer>
        </div>
    )
}


const StyledContainer = styled.section`
  @media (max-width: 768px) {
    justify-items: center;
    justify-content: center;
    align-items: center;
    height: 455px;
    top: 54px;
    background: var(--white);
    padding: 10px 20px;
    width: 100%;
  }
  top: 24px;
  background: var(--white);
  border-radius: var(--border-radius);
  padding: 10px 30px;
  width: 358px;
  height: calc(100% - 20px);
`;

export default Container
