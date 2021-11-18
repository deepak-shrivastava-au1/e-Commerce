import { useState, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    transactionSelector,
    transactionactions,
  } from "@slices/Enquiry/Transactions/transactions";
import styled from "styled-components";
import { CloseSVG } from "@icons";

const FilterChip = styled.span`
  display: flex;
  align-items: center;
  padding: 4px 11px;
  border-radius: 5px;
  background-color: var(--white);
  margin-left: 10px;
  font-size: calc(var(--base-font-size) - 2);
`;

const TransactionSearchChips = () => {
  const [chipsSearchText, setChipsSearchText] = useState<any>({
    searchCurrency: "",
    searchCustomer: "",
    searchOriginalAmt: "",
    searchRemainingAmt: "",
    searchDocDate: "",
    searchDueDate: "",
    
  });
  const dispatch = useDispatch();
  const state = useSelector(transactionSelector);
  const searchFilterslist = state?.transactions?.searchFilterslist;

  const ClearSearchChips = () => {
    setChipsSearchText({
        searchCurrency: "",
        searchCustomer: "",
        searchOriginalAmt: "",
        searchRemainingAmt: "",
        searchDocDate: "",
        searchDueDate: "",
        searchOriginalAmtText: "",
        searchRemainingAmtText: "",
        searchDocDateText: "",
        searchDueDateText: "",
    });
  };
  const DefaultSet = [
    {
      label: "ALL",
      value: "*ALL",
    },
    {
      label: "EQUALS",
      value: "*EQ",
    },
    {
      label: "LESS THAN",
      value: "*LT",
    },
    {
      label: "GREATER THAN",
      value: "*GT",
    },
    {
      label: "NOT EQUAL TO",
      value: "*NE",
    },
    {
      label: "LESS THAN OR EQUAL TO",
      value: "*LE",
    },
    {
      label: "GREATER THAN OR EQUAL TO",
      value: "*GE",
    },
    {
      label: "BETWEEN",
      value: "*BETWEEN",
    },
    {
      label: "NOT BETWEEN",
      value: "*NOT_BETWEEN",
    },
  ];
  useEffect(() => {
    ClearSearchChips();
    const searchFilters = state?.transactions?.searchFilters;

    if (state?.transactions?.isFilterApply) {
      // alert(1);
      if (searchFilters.Customer != "") {
        const customername = searchFilterslist?.customerList?.find(
          (data: any) => data.code === searchFilters.Customer
        )?.description;
        setChipsSearchText((prevState: any) => {
          return { ...prevState, searchCustomer: customername };
        });
      }
      if (searchFilters.Currency != "*ALL") {
        const currencyName = searchFilterslist?.currencyList?.find(
          (data: any) => data.code === searchFilters.Currency
        )?.description;

        setChipsSearchText((prevState: any) => {
          return { ...prevState, searchCurrency: currencyName };
        });
      }
      if (searchFilters.OrgAmtRel != "*ALL") {
        const OriginalAmt = DefaultSet?.find(
          (data: any) => data.value === searchFilters.OrgAmtRel
        )?.label;
        setChipsSearchText((prevState: any) => {
          return { ...prevState, searchOriginalAmt: OriginalAmt ,searchOriginalAmtText : handleSearchText(searchFilters.OrgAmtRel,searchFilters.OrgAmtVal1,searchFilters.OrgAmtVal2)};
        });
      }
      if (searchFilters.RemAmtRel != "*ALL") {
        const RemAmt = DefaultSet?.find(
            (data: any) => data.value === searchFilters.RemAmtRel
          )?.label;
        setChipsSearchText((prevState: any) => {
          return { ...prevState, searchRemainingAmt: RemAmt,searchRemainingAmtText : handleSearchText(searchFilters.RemAmtRel,searchFilters.RemAmtVal1,searchFilters.RemAmtVal2) };
        });
      }
      if (searchFilters.DueDateRel != "*ALL") {
        const DueDate = DefaultSet?.find(
            (data: any) => data.value === searchFilters.DueDateRel
          )?.label;
        setChipsSearchText((prevState: any) => {
          return { ...prevState, searchDueDate: DueDate ,searchDueDateText : handleSearchText(searchFilters.DueDateRel,searchFilters.DueDateVal1,searchFilters.DueDateVal2) };
        });
      }
      if (searchFilters.DocDateRel != "*ALL") {
        const DocDate = DefaultSet?.find(
            (data: any) => data.value === searchFilters.DocDateRel
          )?.label;
        setChipsSearchText((prevState: any) => {
          return { ...prevState, searchDocDate: DocDate,searchDocDateText : handleSearchText(searchFilters.DocDateRel,searchFilters.DocDateVal1,searchFilters.DocDateVal2) };
        });
      }
     
    }
  }, [state?.transactions?.searchFilters]);

  const handleDelete = () => {
    ClearSearchChips();
    dispatch(transactionactions.clearSearchFilter());
  };
  
  const handleSearchText = (code: string, val1 : string , val2 : string ) => {
    switch (code) {
      case "*EQ":
      case "*LT":
      case "*GT":
      case "*NE":
      case "*LE":
      case "*GE":
       return ` (${val1}) `;
      break;
      case "*BETWEEN":
      case "*NOT_BETWEEN":
       return `(${val1} - ${val2}) `;
        break;
      case "*ALL":
         return '';
        break;
    }
   
  };

  return (
    <span className="d-flex">
      {state?.transactions?.isFilterApply && (
        <FilterChip>
          {chipsSearchText.searchCustomer != "" && (
            <span style={{paddingRight:"10px"}}>
              <span className="font-weight-bold"  style={{paddingRight:"5px"}}>Customer :</span>
              {chipsSearchText.searchCustomer}
            </span>
          )}
          {chipsSearchText.searchCurrency != "" && (
           <span style={{paddingRight:"10px"}}>
              <span className="font-weight-bold" style={{paddingRight:"5px"}}>Currency :</span>
         
                    {chipsSearchText.searchCurrency}
            </span>
          )}
          {chipsSearchText.searchOriginalAmt != "" && (
            <span style={{paddingRight:"10px"}} >
               <span className="font-weight-bold" style={{paddingRight:"5px"}} >Original Amount:</span>
             {chipsSearchText.searchOriginalAmt}{chipsSearchText.searchOriginalAmtText}
            </span>
          )}
          {chipsSearchText.searchRemainingAmt != "" && (
            <span style={{paddingRight:"10px"}} >
               <span className="font-weight-bold" style={{paddingRight:"5px"}}>Remaining Amount:</span>
              
              {chipsSearchText.searchRemainingAmt}{chipsSearchText.searchRemainingAmtText}
            </span>
          )}
          {chipsSearchText.searchDocDate != "" && (
            <span style={{paddingRight:"10px"}}>
               <span className="font-weight-bold" style={{paddingRight:"5px"}} >Document Date:</span>
            
              {chipsSearchText.searchDocDate}  {chipsSearchText.searchDocDateText}
            </span>
          )}
            {chipsSearchText.searchDueDate != "" && (
            <span style={{paddingRight:"10px"}}>
               <span className="font-weight-bold" style={{paddingRight:"5px"}} >Due Date:</span>
            
              {chipsSearchText.searchDueDate} {chipsSearchText.searchDueDateText}
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

export default TransactionSearchChips;
