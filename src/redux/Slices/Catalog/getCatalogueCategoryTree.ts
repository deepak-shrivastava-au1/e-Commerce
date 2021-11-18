import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    isCompleted : false,
    messageCode : 0,
    catalogueCategoryTree: {}
}
const getCatalogueCategoryTreeSlice = createSlice({
    name:'getCatalogueCategoryTree',
    initialState,
    reducers:{
        setCompleted : (state, action)=>{
            state.isCompleted = action.payload;
        },
        setCatalogueCategoryTree : (state, action)=>{
            state.catalogueCategoryTree = action.payload;
        },
        setMessageCode : (state, action)=>{
            state.messageCode = action.payload;
        }
    }
});

export const getCatalogueCategoryTreeActions = getCatalogueCategoryTreeSlice.actions;

export const getCatalogueCategoryTreeSelector = (state:any) => state?.catalogueCategoryTree;

export default getCatalogueCategoryTreeSlice.reducer;





