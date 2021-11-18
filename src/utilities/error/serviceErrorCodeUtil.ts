const defautlMsgCode = 'MSG_SOME_THING_WENT_WRONG';
export const internalServerErrorCode = 500;
export const getErrorMsgForShoppingList = (errorCode:number) : string =>{
    let msg = '';
	switch (errorCode){
        case 2258 :
            msg='';
            break;
        case 2257 :
            msg='NO_LIST_FOR_THE_USER_CREATE_NEW_LIST';
            break;
        case 2256 :
            msg ='MSG_LINE_IN_ERROR_ADDING_ITEM_TO_LIST';
            break;
        case 2267 :
            msg = 'MSG_NO_LINES_HAVE_ADDED_TO_LIST';
            break; 
        case 114 :
            msg = 'MSG_INVALID_ITEM';
            break; 
        case 3102 :
            msg = 'MSG_ITEM_QUANTITY_ZERO';
            break; 
        case 3316 :
            msg = 'MSG_BUY_NOT_ALLOWED';
            break;
        default :
            msg = defautlMsgCode;
    }
    return msg;
}

export const getErrorMsgForShoppingCart = (errorCode : number) : string=>{
    let msg ='';
    switch (errorCode){
        case 3014 :
            // on successfull addtion to cart do not show message
            break;
        case 3013 :
        case 3003 :
            //unable to add item to cart
            msg = 'MSG_UNABLE_TO_ADD_ITEM_TO_CART';
            break;
        case 3101 :
            msg = 'MSG_ITEM_IS_NOT_AVAILABLE';
            break;
        case 3102 :
            msg = 'MSG_ITEM_QUANTITY_ZERO';
            break;
        case 3103 :
            msg = 'MSG_NEGATIVE_QUANTITY';
            break;
        case 3104 :
            msg = 'MSG_QUANTITY_EXCEEDS_LIMIT';
            break;
        case 3105 :
            msg = 'MSG_INVALID_DATE';
            break;
        case 3106 :
            msg = 'MSG_INVALID_DATE';
            break;
        case 3107 :
            msg = 'MSG_NOT_WORK_DAY';
            break;
        case 3113 :
            msg = 'MSG_DELIVERY_NOT_POSSIBLE';
            break;
        case 3114 :
            msg = 'MEX_CUSTOMER_HAS_SALES_RESTRICTIONS';
            break;
        case 3109 :
            msg = 'MSG_NO_ITEM_FOUND_FOR_CODE';
            break;
        case 3110 :
            msg = 'MSG_ITEM_INVALID_UNIT';
            break;
        case 3111 :
            msg = 'MSG_ITEM_NOT_ALLOWED_UNIT';
            break;
        case 3112 :
            msg = 'MSG_ITEM_PRICE_NOT_AVAILABLE';
            break;
        case 3116 :
            msg = 'MSG_ITEM_PRICE_NOT_AVAILABLE';
            break;
        case 3121 :
            msg = 'MSG_INVALID_QUANTITY';
            break;
        case 3122 :
            msg = 'MSG_DELIVERY_DATE_NOT_POSSIBLE';
            break;
        case 5001 :
            msg = 'MSG_UNEXPECTED_BUY_ERROR';
            break;
        case 3117 :
            msg = 'MSG_BUY_NOT_ALLOWED';
            break;
        case 3334 :
            msg = 'MSG_SHIPMENT_LENGTH_EXCEEDS';
            break;
        case 3234 :
            msg = 'MSG_SP_MISSING_FOR_SOURCING_INFO';
            break;
        case 3316 :
            msg = 'MSG_BUY_NOT_ALLOWED';
            break;
        case 111 :
            msg = 'CON_NO_DATA_FOUND';
            break;
        default :
            msg = defautlMsgCode;

            
    }
    return msg;

}

export const getErrorMsgForDeleteOrders = (errorCode : number) : string=>{
    let msg ='';
    switch (errorCode){
        case 4000 :
            // DEL_SUCCESSFULL
            break;
        case 4001:
            msg = 'DEL_NOT_FOUND ';
            break;
        case 4003 :
            msg = 'DEL_NOT_ALLOWED';
            break;
        case 4004 :
            msg = 'DEL_ERROR';
            break;
        default :
            msg = defautlMsgCode;

            
    }
    return msg;

}

export const getErrorMsgForShoppingLists = (errorCode: number): string => {
    let msg = '';
    switch (errorCode) {
        case 2266:
            msg = 'MSG_NEW_LIST_CREATED_SUCCESSFULLY'
            break;
        case 2251:
            msg = 'MSP_LIST_ID_ALREADY_EXIST'
            break;
        case 2255:
            msg = 'MAX_NUM_OF_LIST_HAS_EXCEEDED'
            break;
        case 2254:
            msg = 'ERROR_IN_SAVING_NEW_LIST'
            break;
        case 2263:
            msg = 'SUCCCESSFULLY_SET_DEFAULT_LIST'
            break;
        case 2260:
            msg = 'SUCCESSFULLY_LIST_DELETED'
            break;
        case 111:
            msg= 'NO_OBJECTS_FOUND_FOR_THIS_SELECTION'
            break;
        default:
            msg = defautlMsgCode;
    }
    return msg;

}