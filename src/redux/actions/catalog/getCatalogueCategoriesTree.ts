import { BASE_URL } from '../../../routers/AppRoute';
//import axios from 'axios';
import {getCatalogueMenuActions} from '@slices/Catalog/Menu/getCatalogueMenu';
import qs from 'querystring'
import {internalServerErrorCode} from '@utilities/error/serviceErrorCodeUtil';
import {getCatalogueCategoryTreeActions} from '@slices/Catalog/getCatalogueCategoryTree';
import axios from '@utilities/api/httpService';
interface ICatalogueCategories {
    catId?: string;
    elementId?: string;
    langCode : string;
}
  
export function getCatalogueMenuTree(sessionId: any, data: ICatalogueCategories) {
  
    return async (dispatch: any) => {
      getCatalogueMenuActions.setCompleted(false);
      
      try {
  
        const URL = BASE_URL + `/GetCatalogueCategories`;
  
        const response: any = await axios(
          {
            method: "GET",
            url: URL,
            params: {
                langCode: `${data.langCode}`
            },
            //headers: { 'Set-Cookie': 'JSESSIONID=' + `${sessionId}`, 'Access-Control-Allow-Credentials': 'true', 'Content-Type': "application/x-www-form-urlencoded" }
          });

        if(response?.data?.messageCode != null){
            dispatch(getCatalogueMenuActions.setCompleted(true));
            dispatch(getCatalogueMenuActions.setMessageCode(response?.data?.messageCode));
        } else {
            dispatch(getCatalogueMenuActions.setCompleted(true));
            dispatch(getCatalogueMenuActions.setCatalogueMenuTree(response.data));
        }
  
        
      } catch (error) {
        dispatch(getCatalogueMenuActions.setCompleted(true));
        dispatch(getCatalogueMenuActions.setMessageCode(internalServerErrorCode));
      }
    };
  }

  export function getCatalogueCategoriesTreeStructureForCataloguePage(sessionId: any, data: ICatalogueCategories) {
  
    return async (dispatch: any) => {
       getCatalogueCategoryTreeActions.setCompleted(false);
      
      try {
  
        const URL = BASE_URL + `/GetCatalogueCategoryTreeStructure`;
  
        const response: any = await axios(
          {
            method: "GET",
            url: URL,
            params: {
                langCode: `${data.langCode}`,
                catId: `${data.catId}`,
                elementId: `${data.elementId}`
            },
            //headers: { 'Set-Cookie': 'JSESSIONID=' + `${sessionId}`, 'Access-Control-Allow-Credentials': 'true', 'Content-Type': "application/x-www-form-urlencoded" }
          });

        if(response?.data?.messageCode != null){
            dispatch(getCatalogueCategoryTreeActions.setCompleted(true));
            dispatch(getCatalogueCategoryTreeActions.setMessageCode(response?.data?.messageCode));
        } else {
            dispatch(getCatalogueCategoryTreeActions.setCompleted(true));
            dispatch(getCatalogueCategoryTreeActions.setCatalogueCategoryTree(response.data));
        }
  
        
      } catch (error) {
        dispatch(getCatalogueCategoryTreeActions.setCompleted(true));
        dispatch(getCatalogueCategoryTreeActions.setMessageCode(internalServerErrorCode));
      }
    };
  }