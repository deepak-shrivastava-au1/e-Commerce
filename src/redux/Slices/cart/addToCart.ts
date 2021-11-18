import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    isCompleted : false,
    messageCode : 0
}
const addToCartSlice = createSlice({
    name:'addToCart',
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

export const addToCartActions = addToCartSlice.actions;

export const addToCartSelector = (state:any) => state?.addToCart;

export default addToCartSlice.reducer;





