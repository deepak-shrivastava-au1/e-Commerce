import React, { useState, useContext, Fragment } from 'react';
import Units from '@common/Units';
import Quantity from '@common/Quantity';

import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { rgba, cssVar } from 'polished';
import Button from '@common/Button';
import { CartSVG, HeartSVG, Mail, Close, CheckCircleForModalSVG } from '@icons';
import { orderhistorydetailactions } from '@slices//Enquiry/Order/orderHistoryDetail';
import { useDispatch, useSelector } from 'react-redux';
import { useGetLoggedInUserInfo } from '@hooks';
import SendEnquiry from '@fragments/SendEnquiry';
import { WebSettingsContext } from '@providers/WebsettingsProvider';
import { addItemInShoppingList } from '@actions/shoppingList/addItemsToShoppingList';
import { addToCart } from '@actions/cart/addToCart';
import Modal from '@common/Modal';
import { useMediaQuery } from '@material-ui/core';
import { breakpoints } from '@constants/styled-components';
import AddItemToCart from '@pages/Cart/ShoppingCart/AddItemToCart';
import AddItemToShoppingList from '@pages/shoppingList/AddItemToShoppingList';

const MoreActiondiv = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border-radius: var(--border-radius);
  background-color: var(--gray-3);
`;

interface Iprops {
  index: number;
  itemCode: string;
  unit: string;
  quantity: number;
  unitList: [];
  handleCartToggle: any;
  enquiryDetail: string;
}

const RecentAddCartLineItem = (props: Iprops) => {
  const dispatch = useDispatch();
  const sessionId = useGetLoggedInUserInfo()?.sessionId;
  const [addToCartStatus, setAddToCartStatus] = useState<boolean>(false);
  const [isEnquiryDrawerOpen, setIsEnquiryDrawerOpen] =
    useState<boolean>(false);
  const [sucessModalOpen, setSucessModalOpen] = useState<boolean>(false);
  const isMobile = useMediaQuery(`(min-width:${breakpoints.md})`);
  const [listItems, setListItems] = useState({
    itemCode: props.itemCode,
    unitCode: props.unit,
    quantity: props.quantity,
    unitList: props.unitList,
  });
  const webSettings: any = useContext(WebSettingsContext);
  const updateQty = (quantity: any) => {
    setListItems((prevState: any) => {
      return { ...prevState, quantity: quantity };
    });
  };
  const updateUnit = (unit: any) => {
    setListItems((prevState: any) => {
      return { ...prevState, unitCode: unit };
    });
  };

  const AddItemsToCart = () => {
    const cartItems = {
      itemCode: listItems.itemCode,
      unitCode: listItems.unitCode,
      itemQty: listItems.quantity,
    };

    dispatch(addToCart(sessionId, cartItems));
    setAddToCartStatus(true);
  };

  const { t, i18n } = useTranslation();
  return (
    <>
      <AddItemToCart status={addToCartStatus} onClose={setAddToCartStatus} />
      <AddItemToShoppingList />
      <MoreActiondiv className='card-table-more-action'>
        <span className='ml-auto'>
          <Quantity
            showLabel={false}
            quantity={listItems.quantity}
            onChange={(quantity: any) => {
              updateQty(quantity);
            }}
          />
        </span>
        <span className='m-l-15 recent-purchase-units'>
          <Units
            labelText=''
            options={listItems?.unitList.map((address: any) => {
              return {
                label: address.salesUnit,
                value: address.salesUnitDesc,
                selected: address.salesUnit === listItems.unitCode,
              };
            })}
            showLabel={false}
            onChange={(selectedUnit: any) => {
              updateUnit(selectedUnit);
            }}
          />
        </span>

        <span className='m-l-15'>
          <Button variant='solid' color='primary' onClick={AddItemsToCart}>
            <CartSVG className='secondary-icon-2' />{' '}
            {isMobile && <span>{t('CON_ADD_TO_CART')}</span>}
          </Button>
        </span>
        <span className='btn btn-outline-neutral icon-btn m-l-15 '>
          <HeartSVG
            className='primary-icon-4 icon-lg'
            onClick={() => {
              const AddItemsToListDetails1 = [
                {
                  itemCode: listItems.itemCode,
                  unitCode: listItems.unitCode,
                  quantity: listItems.quantity,
                },
              ];
              dispatch(
                addItemInShoppingList(sessionId, AddItemsToListDetails1)
              );
            }}
          />
        </span>
        <Modal
          isAlert
          icon={<CheckCircleForModalSVG />}
          title='Added to default list'
          message='Items has been added to your default list.'
          isOpen={sucessModalOpen}
          onRequestClose={() => setSucessModalOpen(false)}
          hasCancelButton={false}
          secondaryActionText='ok'
          onSecondaryButtonClick={() => {
            setSucessModalOpen(false);
          }}
        />
        <span className='btn btn-outline-neutral icon-btn m-l-15'>
          <SendEnquiry
            status={isEnquiryDrawerOpen}
            email={webSettings.userEmail}
            details={props.enquiryDetail}
            subject='NetStore Item Enquiry'
          />
          <Mail
            className='primary-icon-4 icon-lg'
            onClick={() => setIsEnquiryDrawerOpen((prevState) => !prevState)}
          />
        </span>
        <span className='m-lr-15'>
          <Close
            className='primary-icon-4 icon-lg'
            onClick={() => props.handleCartToggle(props.index)}
          />
        </span>
      </MoreActiondiv>
    </>
  );
};

export default RecentAddCartLineItem;
