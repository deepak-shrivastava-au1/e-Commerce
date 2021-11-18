import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    isCompleted : false,
    messageCode : 0,
    catalogueMenuTree: {}
}
const getCatalogueMenuSlice = createSlice({
    name:'getCatalogueMenu',
    initialState,
    reducers:{
        setCompleted : (state, action)=>{
            state.isCompleted = action.payload;
        },
        setCatalogueMenuTree : (state, action)=>{
            state.catalogueMenuTree = action.payload;
        },
        setMessageCode : (state, action)=>{
            state.messageCode = action.payload;
        }
    }
});

export const getCatalogueMenuActions = getCatalogueMenuSlice.actions;

export const getCatalogueMenuSelector = (state:any) => state?.getCatalogueMenu;

export default getCatalogueMenuSlice.reducer;





