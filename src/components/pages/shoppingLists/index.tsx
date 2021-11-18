import LeftNevigation from '@pages/Enquiry/Order/OrderHistory/LeftNevigation'
import AllLists from './AllLists'
import styled from 'styled-components'
import { respondTo } from '@utilities/styled-components'
import ShoppingListsCtxProvider from './CtxProvider'
import Breadcrumb from '@fragments/Breadcrumb'
import { useRouteMatch } from 'react-router'
import { SHOPPINGLISTS, LISTDETAILS, DEFAULTSHOPPINGLISTS } from '@constants/Routes'
import IndividualLists from './IndividualLists'
import { useMediaQuery } from '@material-ui/core'
import { breakpoints } from '@constants/styled-components'

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height:100vh;

  ${respondTo.xs`
    padding: 16px;
    margin-top: 144px;
    min-height: calc(100vh - 184px);
  `}

  ${respondTo.md`
    padding: 40px;
    margin-top: 0px;
  `}
`

const Container = styled.div`
  display: flex;
`

function Index() {

  const isMobile = useMediaQuery(`(max-width:${breakpoints.sm})`);

  let { path } = useRouteMatch();

  return (
    <MainContainer>
      <ShoppingListsCtxProvider>
        <Breadcrumb />
        <Container>
          {!isMobile ? <LeftNevigation /> : null}

          {path === SHOPPINGLISTS ? <AllLists /> : null}

          {path === LISTDETAILS || path === DEFAULTSHOPPINGLISTS ? <IndividualLists /> : null}
          
        </Container>
      </ShoppingListsCtxProvider>
    </MainContainer>
  )
}

export default Index
