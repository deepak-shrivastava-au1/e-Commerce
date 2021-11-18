import { useState, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  quotationsummarySelector,
  quotationsummaryactions,
} from "@slices/Enquiry/Quotations/QuotationSummary";
import styled from "styled-components";
import { CloseSVG } from "@icons";
import { useTranslation } from "react-i18next";

const FilterChip = styled.span`
  display: flex;
  align-items: center;
  padding: 4px 11px;
  border-radius: 5px;
  background-color: var(--white);
  margin-left: 10px;
  font-size: calc(var(--base-font-size) - 2);
`;

const QuotationSearchChips = () => {
  const { t, i18n } = useTranslation();
  const [chipsSearchText, setChipsSearchText] = useState<any>({
    searchCustomer: "",
    searchQuotationNumber: "",
    searchItemCode: "",
  });
  const dispatch = useDispatch();
  const state = useSelector(quotationsummarySelector);
  const searchFilterslist = state?.quotationsummary?.searchFilterslist;

  const ClearSearchChips = () => {
    setChipsSearchText({
      searchCustomer: "",
      searchQuotationNumber: "",
      searchItemCode: "",
    });
  };

  useEffect(() => {
    ClearSearchChips();
    const searchFilters = state?.quotationsummary?.searchFilters;

    if (state?.quotationsummary?.isFilterApply) {
      setChipsSearchText((prevState: any) => {
        return {
          ...prevState,
          searchQuotationNumber: searchFilters.QuotationNumber,
          searchItemCode: searchFilters.ItemCode,
        };
      });
      if (searchFilters.customerSearch != "") {
        const customername = searchFilterslist?.customerList?.find(
          (data: any) => data.code === searchFilters.customerSearch
        )?.description;
        setChipsSearchText((prevState: any) => {
          return { ...prevState, searchCustomer: customername };
        });
      }
    }
  }, [state?.quotationsummary?.searchFilters]);

  const handleDelete = () => {
    ClearSearchChips();
    dispatch(quotationsummaryactions.clearSearchFilter());
  };

  return (
    <span className="d-flex">
      {state?.quotationsummary?.isFilterApply && ((chipsSearchText.searchCustomer != "All" && chipsSearchText.searchCustomer != "") || chipsSearchText.searchQuotationNumber != "" ||chipsSearchText.searchItemCode != "" ) &&(
        <FilterChip>
          {(chipsSearchText.searchCustomer != "All" && chipsSearchText.searchCustomer != "") && (
            <span style={{ paddingRight: "10px" }}>
              <span
                className="font-weight-bold"
                style={{ paddingRight: "5px" }}
              >
                {t("CON_CUSTOMER")} :
              </span>
              {chipsSearchText.searchCustomer}
            </span>
          )}
          {chipsSearchText.searchQuotationNumber != "" && (
            <span style={{ paddingRight: "10px" }}>
              <span
                className="font-weight-bold"
                style={{ paddingRight: "5px" }}
              >
                {t("CON_QUOTATION_NUMBER")} :
              </span>

              {chipsSearchText.searchQuotationNumber}
            </span>
          )}
          {chipsSearchText.searchItemCode != "" && (
            <span style={{ paddingRight: "10px" }}>
              <span
                className="font-weight-bold"
                style={{ paddingRight: "5px" }}
              >
                {t("CON_PRODUCT")}:
              </span>

              {chipsSearchText.searchItemCode}
            </span>
          )}
          <span style={{ cursor: "pointer", marginLeft: "3px" }}>
            <CloseSVG
              onClick={() => handleDelete()}
              width="13px"
              className="primary-icon-3 icon-md"
            />
          </span>
        </FilterChip>
      )}
    </span>
  );
};

export default QuotationSearchChips;
