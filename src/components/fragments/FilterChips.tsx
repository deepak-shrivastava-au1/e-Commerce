import React, { useContext} from "react";
import { useSelector, useDispatch } from "react-redux";
import {filterChipsSelector} from "../../redux/Slices/Products/filterChipsReducer";
import styled from "styled-components";
import { CloseSVG } from "../../assets/icons";
import Pagination from "@common/Pagination";
import {FetchFilterValues,CurrentSearchString,} from "@slices/Products/productSearch";
import { WebSettingsContext } from "../../redux/Providers/WebsettingsProvider";
import { useGetLoggedInUserInfo } from "@hooks";
import { useTranslation } from "react-i18next";
import { getCatalogueCategoryTreeSelector } from "@slices/Catalog/getCatalogueCategoryTree";


const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
  align-items: center;
`;

const PaginationContainer = styled.div`
  display: flex;
  > :not(:last-child) {
    margin-right: 5px;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: var(--base-font-size);
  font-weight: var(--font-weight-medium);
  .filtered-text {
    color: var(--primary-color-1);
  }
`;

const FilterChip = styled.span`
  display: flex;
  align-items: center;
  padding: 4px 11px;
  border-radius: 30px;
  background-color: var(--white);
  margin-left: 10px;
  font-size: calc(var(--base-font-size) - 2);
`;
const Pallet = styled.span`
  color: var(--primary-color-1);
`;

const FilterChips : React.FC<
            { totalItems: number; 
              updateDataValue: Function; 
              products: any; 
              pageNo : number;
              onFilterChange : Function;
              catalogDetails:any;
              catalog:boolean;
              elementId:any;
            }> = (props) => {

  const palletData = useSelector(filterChipsSelector);
  var searchString = useSelector(CurrentSearchString);
  const catalogueTree: any = useSelector(
    getCatalogueCategoryTreeSelector
  ).catalogueCategoryTree;
  const { t, i18n } = useTranslation();
  console.log("deepakC", palletData)
  
  return (
    <>
      <MainContainer className="pl-2">
        <FilterContainer>
          {props.catalog
          ?
          <span>{catalogueTree?.catalogue?.description} ({ props.catalogDetails?.totalRecordsFound })</span>
          :
          <span>
            {props.totalItems} Results
            &nbsp;<Pallet>{searchString?.string && `"${searchString?.string}"`}</Pallet>
            <span className="filtered-text"></span>
          </span>
        }

          <span className="d-flex">
            {palletData?.map((items: any, index: number) => {
              return (
                <FilterChip>
                  <span>{items.data}</span>
                  <span style={{ cursor: "pointer", marginLeft: "3px" }}>
                    <CloseSVG className="primary-icon-2 icon-lg"
                      onClick={() => props.onFilterChange(items.data, index, items.code, items.category, items.filterColumn, false)}
                      width="13px"
                    />
                  </span>
                </FilterChip>
              );
            })}
          </span>
        </FilterContainer>

        <PaginationContainer>
          <Pagination
            pageNo = {props.pageNo}
            totalItems={props.totalItems}
            updateDataValue={props.updateDataValue}
          />
        </PaginationContainer>
      </MainContainer>
    </>
  );
};
export default FilterChips;
