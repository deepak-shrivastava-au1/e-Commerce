import ScrollToTop from '@common/ScrollToTop';
import { getproductsSuccess } from '@slices/Products/productSearch';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import RequestSubmitProvider from './CtxProvider'
import { requestSubmitSelector } from '@slices/Request/getRequestFilters'
import RequestSubmit from './RequestSubmit'
import RequestConfirmation from './RequestConfimation';
import { respondTo } from '@utilities/styled-components';

const MainContainer = styled.div`
  margin-top: 75px;
  min-height: 100vh;
  padding: 40px;

  .form-group{
    margin-bottom:0;
  }

  .title{
    font-weight: var(--font-weight-bold);
    font-size: calc(var(--base-font-size) + 8px);
  }
  .new_request_title{
    font-weight: var(--font-weight-bold);
    font-size: calc(var(--base-font-size) + 16px);

    ${respondTo.xs`
      font-size: calc(var(--base-font-size) + 8px);
    `}

    ${respondTo.sm`
      font-size: calc(var(--base-font-size) + 16px);
    `}
  }
`

function Index() {

  const dispatch = useDispatch()

  const { screenStatus } = useSelector(requestSubmitSelector)

  // INFO hook to clear products reducer after component dismounts as productSearch depends on it
  useEffect(() => {
    return () => {
      dispatch(getproductsSuccess([]))
    }
  }, [])

  return (
    <MainContainer>
      <RequestSubmitProvider>
        <ScrollToTop />

        {
          screenStatus.requestSubmit ?
            <RequestSubmit /> :
            null
        }

        {
          screenStatus.requestConfirmation ?
            <RequestConfirmation /> :
            null
        }

      </RequestSubmitProvider>
    </MainContainer>
  )
}

export default Index
