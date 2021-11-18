import {createSlice} from '@reduxjs/toolkit';

type addToShoppingList = {
   isCompleted : boolean,
   messageCode : number
}

const initialState : addToShoppingList = {
    
   isCompleted : false,
   messageCode : 0
}
const addToShoppingListSlice = createSlice({
    name:'shoppingList',
    initialState,
    reducers:{
        setCompleted : (state, action)=>{
           state.isCompleted = action.payload;
        },
        setMessageCode : (state, action)=>{
            state.messageCode = action.payload;
         }
    }
});

export const addToShoppingListActions = addToShoppingListSlice.actions;

export const addToShoppingListSelector = (state:any) => state?.addToShoppingList;


export default addToShoppingListSlice.reducer;





