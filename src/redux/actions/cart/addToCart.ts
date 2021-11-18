import { BASE_URL } from "../../../routers/AppRoute";
import { getCartItemsSuccess } from "../../Slices/cart/getTemporaryOrderData";
import axios from "@utilities/api/httpService";
import { addToCartActions } from "@slices/cart/addToCart";
import qs from "querystring";
import { internalServerErrorCode } from "@utilities/error/serviceErrorCodeUtil";

interface IAddToCartRequest {
  itemCode: string;
  itemQty: number;
  unitCode: string;
  deliveryDate?: string;
  shipmentMark?: string;
  lineText?: string;
  quoPrice?: string;
}

export function addToCart(
  sessionId: any,
  data: IAddToCartRequest | any,
  isMultipleItems?: boolean
) {
  return async (dispatch: any) => {
    dispatch(addToCartActions.setCompleted(false));
    dispatch(addToCartActions.setMessageCode(0));

    try {
      const URL = !isMultipleItems
        ? BASE_URL + `/AddToCart`
        : BASE_URL + `/AddItemsToCart`;

      const tempData: any = await axios(
        !isMultipleItems
          ? {
              method: "GET",
              url: URL,
              params: {
                itemCode: `${data.itemCode}`,
                itemQty: `${data.itemQty}`,
                unitCode: `${data.unitCode}`,
              },
              // headers: { 'Set-Cookie': 'JSESSIONID=' + `${sessionId}`, 'Access-Control-Allow-Credentials': 'true', 'Content-Type': "application/x-www-form-urlencoded" }
            }
          : {
              method: "POST",
              url: URL,
              data: qs.stringify({
                inputItems: `${JSON.stringify(data)}`,
              }),
              //headers: { 'Set-Cookie': 'JSESSIONID=' + `${sessionId}`, 'Access-Control-Allow-Credentials': 'true', 'Content-Type': "application/x-www-form-urlencoded" }
            }
      );

      if (tempData?.data?.messageCode != null) {
        dispatch(addToCartActions.setMessageCode(tempData?.data?.messageCode));
        dispatch(addToCartActions.setCompleted(true));
      } else {
        if (isMultipleItems) {
          dispatch(getCartItemsSuccess(tempData?.data));
        } else {
          dispatch(getCartItemsSuccess(tempData?.data));
        }
        dispatch(addToCartActions.setCompleted(true));
      }
    } catch (error) {
      dispatch(addToCartActions.setCompleted(true));
      dispatch(addToCartActions.setMessageCode(internalServerErrorCode));
    }
  };
}
