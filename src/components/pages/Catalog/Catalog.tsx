import MainContent from "@pages/Product/MainContent";
import ProductSearch from "@pages/Product/ProductSearch";
import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCatalogProducts,
  catalogSelector,
  catalogProductsSelector,
} from "@slices/Catalog/getCatalogData";
import LoadingOverlay from "@common/LoadingOverlay";
import {getCatalogueCategoriesTreeStructureForCataloguePage, getCatalogueMenuTree} from '@actions/catalog/getCatalogueCategoriesTree';
import {useGetLoggedInUserInfo} from '@hooks';
import { WebSettingsContext } from "@providers/WebsettingsProvider";
import ScrollToTop from "@common/ScrollToTop";

const Catalog = () => {
  let location = useLocation();
  var catalogCode = location.pathname.split("/");
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const catalogDetails = useSelector(catalogSelector);
  const sessionId = useGetLoggedInUserInfo()?.sessionId;
  const webSettingsData: any = useContext(WebSettingsContext);
  
  useEffect(() => {
    setLoader(true);
    dispatch(fetchCatalogProducts(catalogCode[2], 1, encodeURIComponent(catalogCode[3])));
  }, [catalogCode[2], catalogCode[3]]);
  
  useEffect(() => {
    if (catalogDetails.isCompleted) {
      setLoader(false);
    }
  }, [catalogDetails.isCompleted]);

  useEffect(() => {
    dispatch(
      getCatalogueCategoriesTreeStructureForCataloguePage(sessionId, {
        langCode: webSettingsData?.languageCode,
        catId: catalogCode[2],
        elementId:encodeURIComponent(catalogCode[3])
      }
    ))
    // dispatch(getCatalogueMenuTree(
    //   sessionId,
    //   {
    //     langCode:webSettingsData?.languageCode,
    //     catId: catalogCode[2],
    //     elementId:encodeURIComponent(catalogCode[3])
    //   }
    // ))
  },[catalogCode[2], catalogCode[3]])
  // console.log("deepakkk-catalog", props.catalogProducts);
  return (
    <>
      <LoadingOverlay active={loader} />
      <ScrollToTop />
      <ProductSearch
        catalogDetails={catalogDetails.products}
        catalog={true}
        catId={catalogCode[2]}
        elementId={catalogCode[3]}
      />
    </>
  );
};
export default Catalog;
