import { useState, Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  orderSelector,
  orderhistoryactions,
} from '@slices/Enquiry/Order/orderHistory';
import styled from 'styled-components';
import { CloseSVG } from '@icons';

const FilterChip = styled.span`
  display: flex;
  align-items: center;
  padding: 4px 11px;
  border-radius: 5px;
  background-color: var(--white);
  margin-left: 10px;
  font-size: calc(var(--base-font-size) - 2);
`;

const RecentSearchChips = () => {
  const [chipsSearchText, setChipsSearchText] = useState<any>({
    searchCustomer: '',
    searchStatus: '',
    searchHandler: '',
    searchSalesperson: '',
    searchOrderText: '',
  });
  const dispatch = useDispatch();
  const state = useSelector(orderSelector);
  const searchFilterslist = state?.orderHistory?.searchFilterslist;

  const ClearSearchChips = () => {
    setChipsSearchText({
      searchCustomer: '',
      searchStatus: '',
      searchHandler: '',
      searchSalesperson: '',
      searchOrderText: '',
    });
  };

  useEffect(() => {
    ClearSearchChips();
    const searchFilters = state?.orderHistory?.searchFilters;

    if (state?.orderHistory?.isFilterApply) {
      // alert(1);
      if (searchFilters.Customer != '') {
        const customername = searchFilterslist?.customerList?.find(
          (data: any) => data.code === searchFilters.Customer
        )?.description;
        setChipsSearchText((prevState: any) => {
          return { ...prevState, searchCustomer: customername };
        });
      }
      if (searchFilters.Status != '*ALL') {
        const statusname = searchFilterslist?.salesOrderStatusList?.find(
          (data: any) => data.code === searchFilters.Status
        )?.description;

        setChipsSearchText((prevState: any) => {
          return { ...prevState, searchStatus: statusname };
        });
      }
      if (searchFilters.Handler != '*ALL') {
        const handlername = searchFilterslist?.handlerList?.find(
          (data: any) => data.code === searchFilters.Handler
        )?.description;
        setChipsSearchText((prevState: any) => {
          return { ...prevState, searchHandler: handlername };
        });
      }
      if (searchFilters.Salesperson != '*ALL') {
        const personname = searchFilterslist?.handlerList?.find(
          (data: any) => data.code === searchFilters.Salesperson
        )?.description;
        setChipsSearchText((prevState: any) => {
          return { ...prevState, searchSalesperson: personname };
        });
      }
      if (searchFilters.OrderTextSearch != '') {
        setChipsSearchText((prevState: any) => {
          return {
            ...prevState,
            searchOrderText: searchFilters.OrderTextSearch,
          };
        });
      }
    }
  }, [state?.orderHistory?.searchFilters]);

  const handleDelete = () => {
    ClearSearchChips();
    dispatch(orderhistoryactions.clearSearchFilter());
  };

  return (
    <span className='d-flex'>
      {state?.orderHistory?.isFilterApply && (
        <FilterChip>
          {chipsSearchText.searchCustomer != '' && (
            <span style={{ paddingRight: '10px' }}>
              <span
                className='font-weight-bold'
                style={{ paddingRight: '5px' }}
              >
                Customer :
              </span>
              {chipsSearchText.searchCustomer}
            </span>
          )}
          {chipsSearchText.searchStatus != '' && (
            <span style={{ paddingRight: '10px' }}>
              <span
                className='font-weight-bold'
                style={{ paddingRight: '5px' }}
              >
                Status :
              </span>

              {chipsSearchText.searchStatus}
            </span>
          )}
          {chipsSearchText.searchHandler != '' && (
            <span style={{ paddingRight: '10px' }}>
              <span
                className='font-weight-bold'
                style={{ paddingRight: '5px' }}
              >
                Handler:
              </span>

              {chipsSearchText.searchHandler}
            </span>
          )}
          {chipsSearchText.searchSalesperson != '' && (
            <span style={{ paddingRight: '10px' }}>
              <span
                className='font-weight-bold'
                style={{ paddingRight: '5px' }}
              >
                Sales Person:
              </span>

              {chipsSearchText.searchSalesperson}
            </span>
          )}
          {chipsSearchText.searchOrderText != '' && (
            <span style={{ paddingRight: '10px' }}>
              <span
                className='font-weight-bold'
                style={{ paddingRight: '5px' }}
              >
                Order Text :
              </span>

              {chipsSearchText.searchOrderText}
            </span>
          )}

          <span style={{ cursor: 'pointer', marginLeft: '3px' }}>
            <CloseSVG onClick={() => handleDelete()} width='13px' className="primary-icon-3 icon-md"/>
          </span>
        </FilterChip>
      )}
    </span>
  );
};

export default RecentSearchChips;
