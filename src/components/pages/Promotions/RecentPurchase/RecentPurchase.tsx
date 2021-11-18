import { Fragment } from 'react';
import styled from 'styled-components';
import RecentTable from './RecentTable';
import RecentSearch from './RecentSearch';
import LeftNevigation from '@pages/Enquiry/Order/OrderHistory/LeftNevigation';
import { useMediaQuery } from '@material-ui/core';
import { breakpoints } from '@constants/styled-components';
import { useTranslation } from 'react-i18next';
import RecentSearchChips from './RecentSearchChips';
import './RecentPurchases.scss';
import Breadcrumb from '@fragments/Breadcrumb';

const RecentHistoryContainer = styled.aside`
  display: flex;
`;

const RecentHistorySection = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0px;
  flex-grow: 1;
  > :not(:last-child) {
    margin-bottom: 14px;
  }
`;

const ListContainer = styled.div`
  width: 100%;
`;

const OrderHistory = () => {
  const isMobile = useMediaQuery(`(min-width:${breakpoints.md})`);
  const { t, i18n } = useTranslation();
  return (
    <Fragment>
      <div className='content-area'>
        <Breadcrumb />
        <RecentHistoryContainer>
          <RecentHistorySection>
            <div className='row'>
              <RecentSearch />
              <RecentSearchChips />
            </div>
            <ListContainer>
              <RecentTable />
            </ListContainer>
          </RecentHistorySection>
        </RecentHistoryContainer>
      </div>
    </Fragment>
  );
};

export default OrderHistory;
