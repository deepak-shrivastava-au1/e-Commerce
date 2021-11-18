import styled from "styled-components";
import { respondTo } from "../../utilities/styled-components";

const GridContainer = styled.div`
  display: grid;
  gap: 0px;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  ${respondTo.md`
    grid-template-columns: repeat(3,minmax(0,1fr));
  `}

  ${respondTo.xl`
    grid-template-columns: repeat(4,minmax(0,1fr));
  `}
`;

export default GridContainer;

export const ListContainer = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(1, minmax(0, 1fr));
`;
