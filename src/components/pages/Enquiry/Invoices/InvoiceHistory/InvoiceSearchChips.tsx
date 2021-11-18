import { useState, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  invoicehistorySelector,
  invoicehistoryactions,
} from "@slices/Enquiry/Invoices/InvoiceHistory";
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

const InvoiceSearchChips = () => {
  const { t, i18n } = useTranslation();
  const [chipsSearchText, setChipsSearchText] = useState<any>({
    invoicenoInput: "",
    ordernoInput: "",
    orderrefInput: "",
    yourordernoInput: "",
    invoiceCustomerInput: "",
    productInput: "",
    descriptionInput: "",
    addressInput: "",
    serialnoInput: "",
    customerSearch : "",
    invoiceTypeSearch : "",
    salesPersonSearch : ""
  });
  const dispatch = useDispatch();
  const state = useSelector(invoicehistorySelector);
  const searchFilterslist = state?.invoiceHistory?.searchFilterslist;

  const ClearSearchChips = () => {
    setChipsSearchText({
        invoicenoInput: "",
        ordernoInput: "",
        orderrefInput: "",
        yourordernoInput: "",
        invoiceCustomerInput: "",
        productInput: "",
        descriptionInput: "",
        addressInput: "",
        serialnoInput: "",
        customerSearch : "",
        invoiceTypeSearch : "",
        salesPersonSearch : ""
    });
  };

  useEffect(() => {
    ClearSearchChips();
    const searchFilters = state?.invoiceHistory?.searchFilters;

    if (state?.invoiceHistory?.isFilterApply) {
        setChipsSearchText((prevState: any) => {
            return { ...prevState,  invoicenoInput: searchFilters.invoicenoSearch,
            ordernoInput: searchFilters.ordernoSearch,
            orderrefInput: searchFilters.orderrefSearch,
            yourordernoInput:searchFilters.yourordernoSearch,
            invoiceCustomerInput: searchFilters.invoiceCustomerSearch,
            productInput: searchFilters.productSearch,
            descriptionInput: searchFilters.descriptionSearch,
            addressInput: searchFilters.addressSearch,
            serialnoInput: searchFilters.serialnoSearch };
          });
     if (searchFilters.customerSearch != "") {
        const customername = searchFilterslist?.customerList?.find(
          (data: any) => data.code === searchFilters.customerSearch
        )?.description;
        setChipsSearchText((prevState: any) => {
          return { ...prevState, customerSearch: customername };
        });
      }
     
      if (searchFilters.invoiceTypeSearch != 0) {
        const invoicetypename = searchFilterslist?.invoiceTypeList?.find(
          (data: any) => data.code == searchFilters.invoiceTypeSearch
        )?.description;
         setChipsSearchText((prevState: any) => {
          return { ...prevState, invoiceTypeSearch: invoicetypename };
        });
      }
      if (searchFilters.salesPersonSearch != "*ALL") {
        const salesPersonname = searchFilterslist?.salesmanList?.find(
          (data: any) => data.code === searchFilters.salesPersonSearch
        )?.description;
        setChipsSearchText((prevState: any) => {
          return { ...prevState, salesPersonSearch: salesPersonname };
        });
      }
     
    }
  }, [state?.invoiceHistory?.searchFilters]);

  const handleDelete = () => {
    ClearSearchChips();
    dispatch(invoicehistoryactions.clearSearchFilter());
  };

  return (
    <span className="d-flex">
      {state?.invoiceHistory?.isFilterApply && (
        <FilterChip>
          {chipsSearchText.invoicenoInput != "" && (
            <span style={{paddingRight:"10px"}}>
              <span className="font-weight-bold"  style={{paddingRight:"5px"}}>{t("CON_INVOICE_NUMBER")} :</span>
              {chipsSearchText.invoicenoInput}
            </span>
          )}
          {chipsSearchText.ordernoInput != "" && (
           <span style={{paddingRight:"10px"}}>
              <span className="font-weight-bold" style={{paddingRight:"5px"}}>{t("CON_ORDER_NUMBER")} :</span>
         
                    {chipsSearchText.ordernoInput}
            </span>
          )}
          {chipsSearchText.orderrefInput != "" && (
            <span style={{paddingRight:"10px"}} >
               <span className="font-weight-bold" style={{paddingRight:"5px"}} >{t("CON_ORDER_REFERENCE")}:</span>
            
              {chipsSearchText.orderrefInput}
            </span>
          )}
          {chipsSearchText.yourordernoInput != "" && (
            <span style={{paddingRight:"10px"}} >
               <span className="font-weight-bold" style={{paddingRight:"5px"}}>{t("CON_YOUR_ORDER_NUMBER")}:</span>
              
              {chipsSearchText.yourordernoInput}
            </span>
          )}
          {chipsSearchText.invoiceCustomerInput != "" && (
            <span style={{paddingRight:"10px"}}>
               <span className="font-weight-bold" style={{paddingRight:"5px"}} >{t("CON_INVOICE_CUSTOMER")} :</span>
            
              {chipsSearchText.invoiceCustomerInput}
            </span>
          )}
            {chipsSearchText.customerSearch != "" && (
            <span style={{paddingRight:"10px"}}>
               <span className="font-weight-bold" style={{paddingRight:"5px"}} >{t("CON_CUSTOMER")} :</span>
            
              {chipsSearchText.customerSearch}
            </span>
          )}

            {chipsSearchText.invoiceTypeSearch != "" && (
            <span style={{paddingRight:"10px"}}>
               <span className="font-weight-bold" style={{paddingRight:"5px"}} >{t("CON_INVOICE_TYPE")} :</span>
            
              {chipsSearchText.invoiceTypeSearch}
            </span>
          )}
           {chipsSearchText.salesPersonSearch != "" && (
            <span style={{paddingRight:"10px"}}>
               <span className="font-weight-bold" style={{paddingRight:"5px"}} >{t("CON_SALES_PERSON")} :</span>
            
              {chipsSearchText.salesPersonSearch}
            </span>
          )}
           {chipsSearchText.productInput != "" && (
            <span style={{paddingRight:"10px"}}>
               <span className="font-weight-bold" style={{paddingRight:"5px"}} >{t("CON_PRODUCT")} :</span>
            
              {chipsSearchText.productInput}
            </span>
          )}
   {chipsSearchText.descriptionInput != "" && (
            <span style={{paddingRight:"10px"}}>
               <span className="font-weight-bold" style={{paddingRight:"5px"}} >{t("CON_DESCRIPTION")} :</span>
            
              {chipsSearchText.descriptionInput}
            </span>
          )}
            {chipsSearchText.addressInput != "" && (
            <span style={{paddingRight:"10px"}}>
               <span className="font-weight-bold" style={{paddingRight:"5px"}} >{t("CON_ADDRESS")} :</span>
            
              {chipsSearchText.addressInput}
            </span>
          )}
            {chipsSearchText.serialnoInput != "" && (
            <span style={{paddingRight:"10px"}}>
               <span className="font-weight-bold" style={{paddingRight:"5px"}} >{t("CON_SERIAL_NUMBER")} :</span>
            
              {chipsSearchText.serialnoInput}
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

export default InvoiceSearchChips;
