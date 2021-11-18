import { BASE_URL } from "../../../routers/AppRoute";
import qs from "querystring";
import axios from "@utilities/api/httpService";
import { addToShoppingListActions } from "@slices/shoppingList/addToShoppingList";
import { internalServerErrorCode } from "@utilities/error/serviceErrorCodeUtil";

type addToListRequest = {
  itemCode: string;
  unitCode: string;
  quantity: number;
}[];

export const addItemInShoppingList = (
  sessionId: any,
  listData: addToListRequest
) => {
  return async (dispatch: any) => {
    /* Setting quantity of shopping list to 1*/
    listData[0].quantity = 1;
    dispatch(addToShoppingListActions.setCompleted(false));
    dispatch(addToShoppingListActions.setMessageCode(0));
    try {
      const URL = BASE_URL + `/AddItemsToList`;

      const response: any = await axios({
        method: "POST",
        url: URL,
        // headers: { 'Set-Cookie': 'JSESSIONID=' + `${sessionId}`, 'Access-Control-Allow-Credentials': 'true', 'Content-Type': "application/x-www-form-urlencoded" },

        data: qs.stringify({
          AddItemsToListDetails: `${JSON.stringify(listData)}`,
        }),
      });
      if (response?.data?.messageCode != null) {
        dispatch(addToShoppingListActions.setCompleted(true));
        dispatch(
          addToShoppingListActions.setMessageCode(response?.data?.messageCode)
        );
      } else {
        //dispatch(shoppingListActions.addShoppingList(response?.data));
        dispatch(addToShoppingListActions.setCompleted(true));
        dispatch(addToShoppingListActions.setMessageCode(0));
      }
    } catch (error) {
      console.log(error);
      dispatch(addToShoppingListActions.setCompleted(true));
      dispatch(
        addToShoppingListActions.setMessageCode(internalServerErrorCode)
      );
    }
  };
};
