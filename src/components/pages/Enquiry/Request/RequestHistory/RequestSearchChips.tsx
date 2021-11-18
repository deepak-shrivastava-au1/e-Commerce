import { useState, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
 requestSelector,
 requesthistoryactions
} from "@slices/Enquiry/Request/RequestHistory";
import styled from "styled-components";
import { CloseSVG } from "@icons";
import { useTranslation } from 'react-i18next';

const FilterChip = styled.span`
  display: flex;
  align-items: center;
  padding: 4px 11px;
  border-radius: 5px;
  background-color: var(--white);
  margin-left: 10px;
  font-size: calc(var(--base-font-size) - 2);
`;

const RequestSearchChips = () => {
  const { t, i18n } = useTranslation();
  const [chipsSearchText, setChipsSearchText] = useState<any>({
    searchCustomer: "",
    searchStatus: "",
    searchRequestType: "",
    searchRequestNumber : "",
    searchReferenceNumber: "",
    searchYourReference: "",
  });
  const dispatch = useDispatch();
  const state = useSelector(requestSelector);
  const searchFilterslist = state?.requestHistory?.searchFilterslist;

  const ClearSearchChips = () => {
    setChipsSearchText({
        searchCustomer: "",
        searchStatus: "",
        searchRequestType: "",
        searchRequestNumber : "",
        searchReferenceNumber: "",
        searchYourReference: "",
    });
  };

  useEffect(() => {
    ClearSearchChips();
    const searchFilters = state?.requestHistory?.searchFilters;

    if (state?.requestHistory?.isFilterApply) {
        setChipsSearchText((prevState: any) => {
            return { ...prevState,  searchRequestNumber: searchFilters.RequestNumber,
                searchReferenceNumber: searchFilters.ReferenceNumber,
                searchYourReference: searchFilters.YourReference
            };
          });

      // alert(1);
      if (searchFilters.Customer != "") {
        const customername = searchFilterslist?.customerList?.find(
          (data: any) => data.code === searchFilters.Customer
        )?.description;
        setChipsSearchText((prevState: any) => {
          return { ...prevState, searchCustomer: customername };
        });
      }
      if (searchFilters.Status != "*ALL") {
        const statusname = searchFilterslist?.requestStatusList?.find(
          (data: any) => data.code === searchFilters.Status
        )?.description;

        setChipsSearchText((prevState: any) => {
          return { ...prevState, searchStatus: statusname };
        });
      }
      if (searchFilters.RequestType != "*ALL") {
        const handlername = searchFilterslist?.requestTypeList?.find(
          (data: any) => data.code === searchFilters.RequestType
        )?.description;
        setChipsSearchText((prevState: any) => {
          return { ...prevState, searchRequestType: handlername };
        });
      }
     
      
    }
  }, [state?.requestHistory?.searchFilters]);

  const handleDelete = () => {
    ClearSearchChips();
    dispatch(requesthistoryactions.clearSearchFilter());
  };

  return (
    <span className="d-flex">
      {state?.requestHistory?.isFilterApply && (
        <FilterChip>
          {chipsSearchText.searchCustomer != "" && (
            <span style={{paddingRight:"10px"}}>
              <span className="font-weight-bold"  style={{paddingRight:"5px"}}> {t("CON_CUSTOMER")} :</span>
              {chipsSearchText.searchCustomer}
            </span>
          )}
          {chipsSearchText.searchStatus != "" && (
           <span style={{paddingRight:"10px"}}>
              <span className="font-weight-bold" style={{paddingRight:"5px"}}>{t("CON_STATUS")} :</span>
         
                    {chipsSearchText.searchStatus}
            </span>
          )}
          {chipsSearchText.searchRequestType != "" && (
            <span style={{paddingRight:"10px"}} >
               <span className="font-weight-bold" style={{paddingRight:"5px"}} >{t("CON_REQUEST_TYPE")} :</span>
            
              {chipsSearchText.searchRequestType}
            </span>
          )}
            {chipsSearchText.searchReferenceNumber != "" && (
            <span style={{paddingRight:"10px"}} >
               <span className="font-weight-bold" style={{paddingRight:"5px"}}>{t("CON_REFERENCE_NUMBER")}:</span>
              
              {chipsSearchText.searchReferenceNumber}
            </span>
          )}
          {chipsSearchText.searchRequestNumber != "" && (
            <span style={{paddingRight:"10px"}} >
               <span className="font-weight-bold" style={{paddingRight:"5px"}}>{t("CON_REQUEST_NUMBER")}:</span>
              
              {chipsSearchText.searchRequestNumber}
            </span>
          )}
          {chipsSearchText.searchYourReference != "" && (
            <span style={{paddingRight:"10px"}}>
               <span className="font-weight-bold" style={{paddingRight:"5px"}} >{t("CON_YOUR_REFERENCE")}</span>
               {chipsSearchText.searchYourReference}
            </span>
          )}

          <span style={{ cursor: "pointer", marginLeft: "3px" }}>
            <CloseSVG onClick={() => handleDelete()} width="13px" className="primary-icon-3 icon-md" />
          </span>
        </FilterChip>
      )}
    </span>
  );
};

export default RequestSearchChips;
