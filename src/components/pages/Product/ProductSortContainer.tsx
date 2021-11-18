import React, { useState, useContext } from "react";
import styled from "styled-components";
import { respondTo } from "../../../utilities/styled-components";
import Button from "../../common/Button";
import { Compare, FilterSVG } from "@icons";
import GridView from "../../../assets/icons/GridView";
import ListView from "../../../assets/icons/ListView";
import { breakpoints } from "../../../constants/styled-components";
import { useMediaQuery } from "@material-ui/core";
import {
  sortProducts,
  FetchFilterValues,
} from "@slices/Products/productSearch";
import { useDispatch, useSelector } from "react-redux";
import { useGetLoggedInUserInfo } from "@hooks";
import { useEffect } from "react";
import SidebarFilter from "./SidebarFilter";
import {
  productsSelector,
  intitalizeLoader,
  CurrentSearchString,
} from "@slices/Products/productSearch";
import { WebSettingsContext } from "@providers/WebsettingsProvider";
import FilterChips from "@fragments/FilterChips";
import { Link } from "react-router-dom";
import { COMPARE } from "@constants/Routes";
import "./productSortContainer.scss";
import { BASE_URL_IMAGE } from "@routers/AppRoute";
import altImage from "../../../assets/images/awaited_image.png";
import { sortCatalog, catalogSelector } from "@slices/Catalog/getCatalogData";
import LoadingOverlay from "@common/LoadingOverlay";
import { getCatalogueCategoryTreeSelector } from "@slices/Catalog/getCatalogueCategoryTree";
import { useTranslation } from "react-i18next";
const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  margin-top: 1rem;

  ${respondTo.md`margin-top:0px;`}
`;

const SortContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SortTitle = styled.p`
  flex-shrink: 0;
  margin: 0;
  font-weight: var(--font-weight-medium);
  font-size: calc(var(--base-font-size) + 2);
`;

const ViewSwitcher = styled.div`
  display: flex;
  height: 20px;
  width: 50px;
  margin-top: -18px;
  margin-right: 22px;
`;

const SortSelect = styled.select`
  margin-left: 5px;
`;

const FilterIconWrapper = styled.span`
  font-size: calc(var(--base-font-size) - 2);
`;
const CatalogBannerImage = styled.img`
  width: 100%;
  height: 250px;
`;

interface IProps {
  setListView: Function;
  compareItems: any;
  listView: boolean;
  bannerImage: any;
  catalog: boolean;
  catId: any;
  elementId: any;
  setshowFilter: Function;
}
function PriceSortContainer(props: IProps) {
  const isMobile = useMediaQuery(`(max-width:${breakpoints.sm})`);
  const [sortValue, setSortValue] = useState(1);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const sessionId = useGetLoggedInUserInfo();
  const state = useSelector(productsSelector);
  const webSettingsData = useContext(WebSettingsContext);
  var searchString = useSelector(CurrentSearchString);
  var filterValues = useSelector(FetchFilterValues);
  const catalogDetails = useSelector(catalogSelector);
  const { t, i18n } = useTranslation();
  const catalogueTree: any = useSelector(
    getCatalogueCategoryTreeSelector
  ).catalogueCategoryTree;
  const changeToListView = () => {
    props.setListView(true);
  };
  const changeToGridView = () => {
    props.setListView(false);
  };
  const sortByValue = (value: any) => {
    setSortValue(value);
    if (props.catalog) {
      setLoader(true);
      dispatch(
        sortCatalog(
          filterValues,
          sessionId.sessionId,
          1,
          "ID",
          props.catId,
          props.elementId,
          value
        )
      );
    } else {
      dispatch(intitalizeLoader());
      dispatch(
        sortProducts(
          value,
          sessionId.sessionId,
          webSettingsData?.languageCode,
          searchString.string,
          filterValues
        )
      );
    }
  };
  useEffect(() => {
    if (catalogDetails.isCompleted) {
      setLoader(false);
    }
  }, [catalogDetails.isCompleted]);

  const mobileShowFilter = () => {
    props.setshowFilter(true);
  };
  console.log("props.bannerImage", props.bannerImage);
  return (
    <>
      <LoadingOverlay active={loader} />
      {props.catalog && props.bannerImage && (
        <CatalogBannerImage
          src={BASE_URL_IMAGE + catalogueTree?.catalogue?.imageUrl}
          onError={(e: any) => {
            e.target.onerror = null;
            e.target.src = altImage;
          }}
          alt={altImage}
        />
      )}
      <MainContainer style={{ marginTop: `${isMobile && "0px"}` }}>
        {isMobile && (
          <ViewSwitcher className="filterBtn">
            <Button
              className="mobile-block"
              variant="solid"
              onClick={() => mobileShowFilter()}
            >
              <FilterIconWrapper className="display-flex">
                <FilterSVG width="45px" className="secondary-icon-2 icon-lg" />
                Filter
              </FilterIconWrapper>
            </Button>
          </ViewSwitcher>
        )}
        <SortContainer className="sortSelection">
          <SortTitle className="pl-2">
            {isMobile ? "" : `${t("CON_SORT_BY")}`}
          </SortTitle>
          <SortSelect
            style={{
              height: `${isMobile && "42px"}`,
              width: `${isMobile && "100%"}`,
            }}
            onChange={(e) => sortByValue(e.target.value)}
            value={sortValue}
            className="custom-select-sm"
          >
            <option value="none">{t("CON_NONE")}</option>
            <option value="description ascending">
              {t("COH_DESCRIPTION")} {t("CON_ASCENDING")}
            </option>
            <option value="description descending">
              {t("COH_DESCRIPTION")} {t("CON_DESCENDING")}
            </option>
            <option value="product ascending">
              {t("CON_PRODUCT")} {t("CON_ASCENDING")}
            </option>
            <option value="product descending">
              {t("CON_PRODUCT")} {t("CON_DESCENDING")}
            </option>
            <option value="price ascending">
              {t("CON_PRICE")} {t("CON_ASCENDING")}
            </option>
            <option value="price descending">
              {t("CON_PRICE")} {t("CON_DESCENDING")}
            </option>
          </SortSelect>
        </SortContainer>

        <div style={{ display: "flex" }}>
          {props.compareItems.length >= 2 && (
            <Link
              to={`${COMPARE}/${props.compareItems[0]}/${
                props.compareItems[1]
              }${props.compareItems[2] ? "/" + props.compareItems[2] : ""}${
                props.compareItems[3] ? "/" + props.compareItems[3] : ""
              }`}
            >
              <Button className="compare-btn" variant="solid">
                <div className="d-flex">
                  <div>
                    {" "}
                    <Compare className="secondary-icon-2 icon-lg pb-1" />
                  </div>
                  &nbsp;
                  <div>Compare</div>
                  &emsp;
                  <div>
                    <span>{props.compareItems?.length}</span>
                  </div>
                </div>
              </Button>{" "}
              &emsp;
            </Link>
          )}

          {!isMobile && (
            <>
              <div
                onClick={changeToListView}
                style={{ cursor: "pointer" }}
                className={!props.listView ? "GridIcon" : "ListIcon"}
              >
                <ListView className="primary-icon-2" />
              </div>
              <div
                onClick={changeToGridView}
                style={{ cursor: "pointer" }}
                className={props.listView ? "GridIcon" : "ListIcon"}
              >
                <GridView className="primary-icon-2" />
              </div>
            </>
          )}
        </div>

        {/* {isMobile && 
      <FilterChips />
      } */}
      </MainContainer>
    </>
  );
}

export default PriceSortContainer;
