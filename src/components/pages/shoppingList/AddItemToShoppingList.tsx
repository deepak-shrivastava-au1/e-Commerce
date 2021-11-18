import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { addToShoppingListActions } from '@slices/shoppingList/addToShoppingList';
import { addToShoppingListSelector } from '@slices/shoppingList/addToShoppingList';
import Modal from "@common/Modal";
import {SHOPPINGLISTS}  from '@constants/Routes';
import { useHistory } from "react-router-dom";
import {CloseSVG, CheckSVG, CheckCircleForModalSVG} from "@icons";
import {getErrorMsgForShoppingList} from "@utilities/error/serviceErrorCodeUtil";
import { useTranslation } from "react-i18next";

const AddItemToShoppingList : React.FC = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const isAddedIntoShoppingList = useSelector(addToShoppingListSelector)?.isCompleted;
    const shoppingListErrorEode = useSelector(addToShoppingListSelector)?.messageCode;
    
    const { t } = useTranslation();
    const [showSuccess, setShowSucces] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);
    const navigateToShoppingListPage = () =>{
       history.push(SHOPPINGLISTS)
    }
    useEffect(()=>{
        if(isAddedIntoShoppingList){
            if(shoppingListErrorEode !== 0 && shoppingListErrorEode !== 2258)
                setShowError(true);
            else
                setShowSucces(true);
        }
       
    },[shoppingListErrorEode, isAddedIntoShoppingList])
    return(
        <React.Fragment>
            {isAddedIntoShoppingList && showError && <Modal
                isAlert
                icon={<div className="icon-fail"><CloseSVG  className="icon"/></div>}
                title={t(getErrorMsgForShoppingList(shoppingListErrorEode))}
                message={t('MSG_ITEM_ADDED_FAIL')}
                isOpen={showError}
                hasCancelButton={false}
                onRequestClose={()=>{
                    setShowError(false);
                dispatch(addToShoppingListActions.setCompleted(false));
                dispatch(addToShoppingListActions.setMessageCode(0));
                }}
                secondaryActionText={'ok'}
                onSecondaryButtonClick={() => {
                    setShowError(false);
                    dispatch(addToShoppingListActions.setCompleted(false));
                    dispatch(addToShoppingListActions.setMessageCode(0));
                    navigateToShoppingListPage()
                  }}
            />}
            {isAddedIntoShoppingList && showSuccess && <Modal
                isAlert
                icon={<CheckCircleForModalSVG/>}
                title={t('MSG_ITEM_ADDED_SUCCESSFULLY')}
                message={t('MSG_ITEM_ADDED_SUCCESSFULLY_IN_LIST')}
                isOpen={showSuccess}
                hasCancelButton={false}
                onRequestClose={()=>{
                    setShowSucces(false);
                    dispatch(addToShoppingListActions.setCompleted(false));
                    dispatch(addToShoppingListActions.setMessageCode(0));
                }}
                secondaryActionText={'ok'}
                onSecondaryButtonClick={() => {
                    setShowSucces(false);
                    dispatch(addToShoppingListActions.setCompleted(false));
                    dispatch(addToShoppingListActions.setMessageCode(0));
                  }}
            />}
        </React.Fragment>
    );

    
}

export default AddItemToShoppingList;