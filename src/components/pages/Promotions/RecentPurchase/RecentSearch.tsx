import React, { useState, Fragment, useEffect } from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@common/Button';
import { SearchSVG } from '@icons';
import styled from 'styled-components';
import Input from '@common/Input';
import Select from '@common/Select';
import { useTranslation } from 'react-i18next';

import { useDispatch, useSelector } from 'react-redux';

import {
  recentPurchaseFilterDetails,
  recentPurchaseSelector,
  recentPurchaseactions,
} from '@slices/Promotions/recentPurchase';
import { useGetLoggedInUserInfo } from '@hooks';

const DrawerRight = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-around;
`;

const Drawer = styled.figure`
  width: 400px;
`;

const DrawerHeader = styled.h3`
  padding: 10px 0px 5px 15px;
  font-weight: var(--font-weight-medium);
`;

const DrawerCaption = styled.figcaption`
  padding: 0px 20px;
`;
const Filterdiv = styled.div`
  padding: 10px;
`;

export default function RecentSearch() {
  const { t, i18n } = useTranslation();
  const searchstate = useSelector(recentPurchaseSelector);
  const [state, setState] = React.useState<any>({
    right: false,
  });

  const sessionId = useGetLoggedInUserInfo()?.sessionId;
  const dispatch = useDispatch();

  useEffect(() => {
    if (sessionId) {
      dispatch(recentPurchaseFilterDetails(sessionId));
    }
  }, [sessionId]);

  const customerlist = searchstate?.searchFilterslist?.customerList?.filter(
    (data: any) =>
      typeof data.defaultCode == undefined ? '' : data.defaultCode
  );
  const defaultcode =
    customerlist?.length > 0
      ? customerlist?.find((data: any) => data.defaultCode).defaultCode
      : '';

  const [recentPurchaseInputValue, setRecentPurchaseInputValue] =
    useState<string>('');
  const [customerState, setCustomerState] = useState<any>(defaultcode);
  const [statusState, setStatusState] = useState<any>('*ALL');
  const [orderTypeState, setorderTypeState] = useState<any>('*ALL');

  useEffect(() => {
    setCustomerState(defaultcode);
  }, []);

  const filterSettings = searchstate?.searchFilterSettings;

  const onCustomerChange = (code: string) => {
    setCustomerState(code);
  };

  const onStatusChange = (code: string) => {
    setStatusState(code);
  };

  const onorderTypeChange = (code: string) => {
    setorderTypeState(code);
  };

  const onClearorderType = () => {
    dispatch(recentPurchaseactions.clearSearchFilter());
    setCustomerState(defaultcode);
    setStatusState('*ALL');
    setorderTypeState('*ALL');

    setRecentPurchaseInputValue('');
    setState(false);
  };

  useEffect(() => {
    if (!searchstate?.isFilterApply) {
      onClearorderType();
    }
  }, [searchstate?.isFilterApply]);
  // Open and Close Drawer orderType
  const toggleDrawer = (anchor: any, open: any) => (event: any) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const onSearchorderType = () => {
    dispatch(
      recentPurchaseactions.updateSearchFilter({
        customerSearch: customerState,
        orderTypeSearch: orderTypeState,
        statusSearch: statusState,
        requestInputSearch: recentPurchaseInputValue,
      })
    );
    setState(false);
  };

  return (
    <div>
      {['Click'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            variant='solid'
            style={{ padding: '7px 16px' }}
            onClick={toggleDrawer(anchor, true)}
          >
            <SearchSVG className='icon' />
            <span>Search</span>
          </Button>

          <SwipeableDrawer
            anchor={'right'}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            <div className='row'>
              <DrawerRight className='col-md-12'>
                <Drawer>
                  <DrawerHeader>
                    Recent Purchase
                    <span style={{ float: 'right', cursor: 'pointer' }}>
                      <CloseIcon onClick={toggleDrawer(anchor, false)} className="primary-icon-3 icon-md"/>
                    </span>
                    <hr />
                  </DrawerHeader>
                  <div>
                    <DrawerCaption>
                      <div>
                        <Input
                          type='text'
                          placeholder='Product or Description'
                          showLabel={true}
                          labelText=''
                          onChange={(value: any) =>
                            setRecentPurchaseInputValue(value)
                          }
                          value={recentPurchaseInputValue}
                        />
                      </div>
                      <p></p>
                      <hr />
                      <div>
                        <h3>Category</h3>
                      </div>
                      {filterSettings?.filterBeans?.filter(
                        (data: any) =>
                          data.filterName == 'CON_CUSTOMER' && data.isEnabled
                      ).length > 0 && (
                        <Filterdiv>
                          <Select
                            showLabel={true}
                            onChange={onCustomerChange}
                            options={searchstate?.searchFilterslist?.customerList?.map(
                              (item: any) => {
                                return {
                                  label: item.description,
                                  value: item.code,
                                };
                              }
                            )}
                            value={customerState}
                            labelText={t('CON_CUSTOMER')}
                          />
                        </Filterdiv>
                      )}
                      {filterSettings?.filterBeans?.filter(
                        (data: any) =>
                          data.filterName == 'CON_STATUS' && data.isEnabled
                      ).length > 0 && (
                        <Filterdiv>
                          <Select
                            showLabel={true}
                            onChange={onStatusChange}
                            options={searchstate?.searchFilterslist?.salesOrderStatusList?.map(
                              (item: any) => {
                                return {
                                  label: item.description,
                                  value: item.code,
                                };
                              }
                            )}
                            value={statusState}
                            labelText={t('CON_STATUS')}
                          />
                        </Filterdiv>
                      )}
                      {filterSettings?.filterBeans?.filter(
                        (data: any) =>
                          data.filterName == 'CON_ORDER_TYPE' && data.isEnabled
                      ).length > 0 && (
                        <Filterdiv>
                          <Select
                            showLabel={true}
                            onChange={onorderTypeChange}
                            options={searchstate?.searchFilterslist?.salesOrderTypeList?.map(
                              (item: any) => {
                                return {
                                  label: item.description,
                                  value: item.code,
                                };
                              }
                            )}
                            value={orderTypeState}
                            labelText={t('CON_ORDER_TYPE')}
                          />
                        </Filterdiv>
                      )}

                      <div
                        style={{
                          justifyContent: 'space-between',
                          marginTop: '24px',
                        }}
                        className='row'
                      >
                        <Button
                          style={{
                            width: '45%',
                            marginTop: '8px',
                            paddingRight: '20px',
                          }}
                          onClick={onClearorderType}
                        >
                          <span>{t('CON_CLEARALL')}</span>
                        </Button>
                        <Button
                          variant='solid'
                          style={{ width: '45%', marginTop: '8px' }}
                          onClick={onSearchorderType}
                        >
                          <span>{t('CON_SEARCH')}</span>
                        </Button>
                      </div>
                    </DrawerCaption>
                  </div>
                </Drawer>
              </DrawerRight>
            </div>
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
