import { useState, useContext, Fragment } from "react";
import Quantity from "@common/Quantity";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Button from "@common/Button";
import { CartSVG, HeartSVG, Mail, Close, CheckCircleForModalSVG } from "@icons";
import { useDispatch,useSelector } from "react-redux";
import { useGetLoggedInUserInfo } from "@hooks";
import SendEnquiry from "@fragments/SendEnquiry";
import { WebSettingsContext } from "@providers/WebsettingsProvider";
import { addItemInShoppingList } from "@actions/shoppingList/addItemsToShoppingList";
import { addToCart } from "@actions/cart/addToCart";
import AddItemToCart from "@pages/Cart/ShoppingCart/AddItemToCart";
import Modal from "@common/Modal";
import { useMediaQuery } from "@material-ui/core";
import { breakpoints } from "@constants/styled-components";
import { respondTo } from "@utilities/styled-components";

const MoreActiondiv = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px;
  margin: 10px ;
  border-radius: var(--border-radius);
  background-color: var(--gray-3);

  ${respondTo.xs`
        margin: 10px 10px -9px 10px;
  width: calc(100% - 20px);
    `}
  ${respondTo.sm`
       margin: 10px 10px -9px 10px;
      width: calc(100% - 20px);
    `}
      ${respondTo.md`
     margin: 10px;
 
    `}



`;

interface Iprops {
  index: number;
  itemCode: string;
  unit: string;
  quantity: number;
  unitList: [];
  handleCartToggle: any;
  enquiryDetail: string;
  enquiryShow? : boolean;
  addtocartshow? : boolean;
}

const OrderAddCartLineItem = ({enquiryShow = true,addtocartshow = true,...props}: Iprops) => {
  const dispatch = useDispatch();
  const sessionId = useGetLoggedInUserInfo()?.sessionId;
  const [isEnquiryDrawerOpen, setIsEnquiryDrawerOpen] =
    useState<boolean>(false);
  const [sucessModalOpen, setSucessModalOpen] = useState<boolean>(false);
  const isMobile = useMediaQuery(`(min-width:${breakpoints.md})`);
  const [listItems, setListItems] = useState({
    itemCode: props.itemCode,
    unitCode: props.unit,
    quantity: props.quantity,
  });
  const webSettings: any = useContext(WebSettingsContext);
  const[isAddToCart, setIsAddToCart ] = useState<boolean>(false);
  

  const updateQty = (quantity: any) => {
    setListItems((prevState: any) => {
      return { ...prevState, quantity: quantity };
    });
  };


  const handleAddItemToCart = () => {
    const cartItems = {
      itemCode: listItems.itemCode,
      unitCode: listItems.unitCode,
      itemQty: listItems.quantity,
    };

    dispatch(addToCart(sessionId, cartItems));
    setIsAddToCart(true);
  };

  const { t, i18n } = useTranslation();
  return (
    <Fragment>
      <MoreActiondiv className="card-table-more-action">
        <span className="ml-auto">
          <Quantity
            showLabel={false}
            quantity={listItems.quantity}
            onChange={(quantity: any) => {
              updateQty(quantity);
            }}
          />
        </span>
        {(addtocartshow && webSettings?.buyEnabledForUser) && (
          <span className="m-l-15">
            <Button variant="solid" color="primary" onClick={handleAddItemToCart}>
              <CartSVG className="secondary-icon-2" />{" "}
              {isMobile && <span>{t("CON_ADD_TO_CART")}</span>}
            </Button>
          </span>
         
        )}
         <AddItemToCart status={isAddToCart} onClose={setIsAddToCart} />
        <span className="btn btn-outline-neutral icon-btn m-l-15 ">
          <HeartSVG
            className="primary-icon-4 icon-lg"
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
              setSucessModalOpen(true);
            }}
          />
        </span>
        <Modal
          isAlert
          icon={<CheckCircleForModalSVG />}
          title="Added to default list"
          message="Items has been added to your default list."
          isOpen={sucessModalOpen}
          onRequestClose={() => setSucessModalOpen(false)}
          hasCancelButton={false}
          secondaryActionText="ok"
          onSecondaryButtonClick={() => {
            setSucessModalOpen(false);
          }}
        />
       
        { (enquiryShow && webSettings?.sendMailOnRequest) && (
          <span className="btn btn-outline-neutral icon-btn m-l-15">
            <SendEnquiry
              status={isEnquiryDrawerOpen}
              email={webSettings?.userEmail}
              details={props.enquiryDetail}
              subject="NetStore Item Enquiry"
            />
            <Mail
              className="primary-icon-4 icon-lg"
              onClick={() => setIsEnquiryDrawerOpen((prevState) => !prevState)}
            />
          </span>
        )}
        
        {isMobile && (
          <span className="m-lr-15">
            <Close
              className="primary-icon-4 icon-lg"
              onClick={() => props.handleCartToggle(props.index)}
            />
          </span>
        )}
      </MoreActiondiv>
      {!isMobile && (
        <MoreActiondiv>
          <span
            className="m-lr-15 mx-auto"
            onClick={() => props.handleCartToggle(props.index)}
          >
            <Close className="primary-icon-4 icon-lg" />
            <label className="cust-label ">{t("CON_CANCEL")}</label>
          </span>
        </MoreActiondiv>
      )}
    </Fragment>
  );
};

export default OrderAddCartLineItem;
