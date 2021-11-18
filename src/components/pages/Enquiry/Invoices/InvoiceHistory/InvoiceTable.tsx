import { useState, Fragment, useEffect,useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchinvoicehistory,
  invoicehistorySelector,
  invoicehistoryactions,
} from "@slices/Enquiry/Invoices/InvoiceHistory";
import { Link } from "react-router-dom";
import {
  ArrowUpSVG,
  ArrowDownSVG,
  Info_Order,
  LeftSVG,
  RightSVG,
  PreviousArrow
} from "@icons";
import { useGetLoggedInUserInfo } from "@hooks";
import NoData from "@common/NoData";
import styled from "styled-components";
import LoadingOverlay from "@common/LoadingOverlay";
import { WebSettingsContext } from "@providers/WebsettingsProvider";
import { useTranslation } from "react-i18next";
import {INVOICEDETAIL}  from "@constants/Routes";

const PaginationContainer = styled.div`
  float: right;
  margin-top: -55px;
  padding: 0px 18px;
`;

const InvoiceTable = () => {
  const sessionId = useGetLoggedInUserInfo()?.sessionId;
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1);
  const webSettings: any = useContext(WebSettingsContext);
  const { t, i18n } = useTranslation();
  

  const [currentinvoiceNumberSort, setCurrentinvoiceNumberSort] = useState(
    <a onClick={() => fetchASCsortorder("invoiceNumber")}>
      <ArrowDownSVG className="primary-icon-2"></ArrowDownSVG>
    </a>
  );
  const [currentinvoiceDateSort, setCurrentinvoiceDateSort] = useState(
    <a onClick={() => fetchDESCsortorder("invoiceDate")}>
      <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
    </a>
  );
  const [currentTypeSort, setCurrentTypeSort] = useState(
    <a onClick={() => fetchDESCsortorder("Type")}>
      <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
    </a>
  );
  const [currentCustomerSort, setCurrentCustomerSort] = useState(
    <a onClick={() => fetchDESCsortorder("Customer")}>
      <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
    </a>
  );
  const [currentAmountIncludingVATSort, setCurrentAmountIncludingVATSort] = useState(
    <a onClick={() => fetchDESCsortorder("AmountIncludingVAT")}>
      <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
    </a>
  );
  const [currentorderNumberSort, setCurrentorderNumberSort] = useState(
    <a onClick={() => fetchDESCsortorder("orderNumber")}>
      <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
    </a>
  );
  const [currentorderDateSort, setCurrentorderDateSort] = useState(
    <a onClick={() => fetchDESCsortorder("orderDate")}>
      <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
    </a>
  );
  const [currentsalesmanSort, setCurrentsalesmanSort] = useState(
    <a onClick={() => fetchDESCsortorder("salesman")}>
      <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
    </a>
  );
  const [currentyourReferrenceSort, setCurrentyourReferrenceSort] = useState(
    <a onClick={() => fetchDESCsortorder("yourReferrence")}>
      <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
    </a>
  );

  const [sortcolumn, setSortColumn] = useState({
    SortColumn: "invoiceNumber",
    orderBy: "DESC",
  });

  function fetchASCsortorder(type: string) {
    if (type == "invoiceNumber") {
      setCurrentinvoiceNumberSort(
        <a onClick={() => fetchDESCsortorder("invoiceNumber")}>
          <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
        </a>
      );
      setSortColumn({ SortColumn: "invoiceNumber", orderBy: "ASC" });
    } else if (type == "invoiceDate") {
      setCurrentinvoiceDateSort(
        <a onClick={() => fetchDESCsortorder("invoiceDate")}>
          <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
        </a>
      );
      setSortColumn({ SortColumn: "invoiceDate", orderBy: "ASC" });
    } else if (type == "Type") {
      setCurrentTypeSort(
        <a onClick={() => fetchDESCsortorder("Type")}>
          <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
        </a>
      );
      setSortColumn({ SortColumn: "Type", orderBy: "ASC" });
    } else if (type == "Customer") {
      setCurrentCustomerSort(
        <a onClick={() => fetchDESCsortorder("Customer")}>
          <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
        </a>
      );
      setSortColumn({ SortColumn: "Customer", orderBy: "ASC" });
    } else if (type == "AmountIncludingVAT") {
      setCurrentAmountIncludingVATSort(
        <a onClick={() => fetchDESCsortorder("AmountIncludingVAT")}>
          <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
        </a>
      );
      setSortColumn({ SortColumn: "AmountIncludingVAT", orderBy: "ASC" });
    } else if (type == "orderNumber") {
      setCurrentorderNumberSort(
        <a onClick={() => fetchDESCsortorder("orderNumber")}>
          <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
        </a>
      );
      setSortColumn({ SortColumn: "orderNumber", orderBy: "ASC" });
    } else if (type == "orderDate") {
      setCurrentorderDateSort(
        <a onClick={() => fetchDESCsortorder("orderDate")}>
          <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
        </a>
      );
      setSortColumn({ SortColumn: "orderDate", orderBy: "ASC" });
    }else if (type == "salesman") {
      setCurrentsalesmanSort(
        <a onClick={() => fetchDESCsortorder("salesman")}>
          <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
        </a>
      );
      setSortColumn({ SortColumn: "salesman", orderBy: "ASC" });
    }else if (type == "yourReferrence") {
      setCurrentyourReferrenceSort(
        <a onClick={() => fetchDESCsortorder("yourReferrence")}>
          <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
        </a>
      );
      setSortColumn({ SortColumn: "yourReferrence", orderBy: "ASC" });
    }
  }

  function fetchDESCsortorder(type: string) {
    if (type == "invoiceNumber") {
      setCurrentinvoiceNumberSort(
        <a onClick={() => fetchASCsortorder("invoiceNumber")}>
          <ArrowDownSVG className="primary-icon-2"></ArrowDownSVG>
        </a>
      );
      setSortColumn({ SortColumn: "invoiceNumber", orderBy: "DESC" });
    } else if (type == "invoiceDate") {
      setCurrentinvoiceDateSort(
        <a onClick={() => fetchASCsortorder("invoiceDate")}>
          <ArrowDownSVG className="primary-icon-2"></ArrowDownSVG>
        </a>
      );
      setSortColumn({ SortColumn: "invoiceDate", orderBy: "DESC" });
    } else if (type == "Type") {
      setCurrentTypeSort(
        <a onClick={() => fetchASCsortorder("Type")}>
          <ArrowDownSVG className="primary-icon-2"></ArrowDownSVG>
        </a>
      );
      setSortColumn({ SortColumn: "Type", orderBy: "DESC" });
    } else if (type == "Customer") {
      setCurrentCustomerSort(
        <a onClick={() => fetchASCsortorder("Customer")}>
          <ArrowDownSVG className="primary-icon-2"></ArrowDownSVG>
        </a>
      );
      setSortColumn({ SortColumn: "Customer", orderBy: "DESC" });
    } else if (type == "AmountIncludingVAT") {
      setCurrentAmountIncludingVATSort(
        <a onClick={() => fetchASCsortorder("AmountIncludingVAT")}>
          <ArrowDownSVG className="primary-icon-2"></ArrowDownSVG>
        </a>
      );
      setSortColumn({ SortColumn: "AmountIncludingVAT", orderBy: "DESC" });
    } else if (type == "orderNumber") {
      setCurrentorderNumberSort(
        <a onClick={() => fetchASCsortorder("orderNumber")}>
          <ArrowDownSVG className="primary-icon-2"></ArrowDownSVG>
        </a>
      );
      setSortColumn({ SortColumn: "orderNumber", orderBy: "DESC" });
    } else if (type == "orderDate") {
      setCurrentorderDateSort(
        <a onClick={() => fetchASCsortorder("orderDate")}>
          <ArrowDownSVG className="primary-icon-2"></ArrowDownSVG>
        </a>
      );
      setSortColumn({ SortColumn: "orderDate", orderBy: "DESC" });
    }else if (type == "salesman") {
      setCurrentsalesmanSort(
        <a onClick={() => fetchASCsortorder("salesman")}>
          <ArrowDownSVG className="primary-icon-2"></ArrowDownSVG>
        </a>
      );
      setSortColumn({ SortColumn: "salesman", orderBy: "DESC" });
    }else if (type == "yourReferrence") {
      setCurrentyourReferrenceSort(
        <a onClick={() => fetchASCsortorder("yourReferrence")}>
          <ArrowDownSVG className="primary-icon-2"></ArrowDownSVG>
        </a>
      );
      setSortColumn({ SortColumn: "yourReferrence", orderBy: "DESC" });
    }
  }

  const state = useSelector(invoicehistorySelector);
  const searchFilters = state?.invoiceHistory?.searchFilters;
  const loading = state?.invoiceHistory?.loading;

  const handleNextPage = () => {
    let prevstate = pageNumber;
    const currentpage = prevstate + 1;
    setPageNumber(currentpage);
  };

  const handlePrevPage = () => {
    let prevstate = pageNumber;
    const currentpage = prevstate - 1;
    setPageNumber(currentpage);
  };

  const handleFirstPage = () => {
    setPageNumber(1);
  };

  useEffect(() => {
    if (sessionId) {
      dispatch(invoicehistoryactions.intitalizeLoader());
      if (state?.invoiceHistory?.isFilterApply) {
        dispatch(
          fetchinvoicehistory(
            sessionId,
            sortcolumn.orderBy,
            sortcolumn.SortColumn,
            pageNumber,
            true,
            searchFilters.customerSearch,
            searchFilters.invoicenoSearch,
            searchFilters.ordernoSearch,
            searchFilters.orderrefSearch,
            searchFilters.yourordernoSearch,
            searchFilters.invoiceCustomerSearch,
            searchFilters.productSearch,
            searchFilters.descriptionSearch,
            searchFilters.addressSearch,
            searchFilters.serialnoSearch,
            searchFilters.invoiceTypeSearch,
            searchFilters.salesPersonSearch
         
          )
        );
      } else {
        dispatch(
          fetchinvoicehistory(
            sessionId,
            sortcolumn.orderBy,
            sortcolumn.SortColumn,
            pageNumber
          )
        );
      }
    }
  }, [sessionId, sortcolumn, state?.invoiceHistory?.searchFilters, pageNumber]);

  return (
    <Fragment>
      <PaginationContainer>
   
        {state?.invoiceHistory?.invoices?.invoiceHistoryBean?.length > 0 && (
          <div className="custom-pagination">
            <a
              onClick={handleFirstPage}
              className={`default ${pageNumber == 1 ? "disable" : ""}`}
            >
              <PreviousArrow className="icon-color" />
            
            </a>
            <a
              onClick={handlePrevPage}
              className={`default ${pageNumber == 1 ? "disable" : "default"}`}
            >
              <LeftSVG className="icon-color" />
            </a>
            <a
              onClick={handleNextPage}
              className={`default ${
                !state?.invoiceHistory?.invoices?.moreRecords ? "disable" : ""
              }`}
            >
              <RightSVG className="icon-color" />
            </a>
          </div>
        )}
      </PaginationContainer>
      <div className="card-table">
        <div className="card-thead">
          <div className="row">
            <div className="col">
              <div className="d-flex">
                <div className="col-title"> #{t("COH_INVOICE")}</div>
                <div className="col-sort">{currentinvoiceNumberSort}</div>
              </div>
            </div>

            <div className="col">
              <div className="d-flex">
                <div className="col-title"> {t("COH_DOCUMENT_DATE")}</div>
                <div className="col-sort">{currentinvoiceDateSort}</div>
              </div>
            </div>
            <div className="col">
              <div className="d-flex">
                <div className="col-title"> {t("COH_TYPE")}</div>
                <div className="col-sort">{currentTypeSort}</div>
              </div>
            </div>
            <div className="col">
              <div className="d-flex">
                <div className="col-title"> {t("COH_INVOICE_CUSTOMER")}</div>
                <div className="col-sort">{currentCustomerSort}</div>
              </div>
            </div>

            <div className="col">
              <div className="d-flex">
                <div className="col-title">{t("COH_AMOUNT_INCLUDING_VAT")}</div>
                <div className="col-sort">{currentAmountIncludingVATSort}</div>
              </div>
            </div>
           <div className="col">
              <div className="d-flex">
                <div className="col-title"> {t("COH_ORDER_NUMBER")}</div>
                <div className="col-sort">{currentorderNumberSort}</div>
              </div>
            </div>
            <div className="col">
              <div className="d-flex">
                <div className="col-title"> {t("COH_ORDER_DATE")}</div>
                <div className="col-sort">{currentorderDateSort}</div>
              </div>
            </div>
            <div className="col">
              <div className="d-flex">
                <div className="col-title"> {t("COH_SALESMAN")}</div>
                <div className="col-sort">{currentsalesmanSort}</div>
              </div>
            </div>
            <div className="col">
              <div className="d-flex">
                <div className="col-title"> {t("CON_YOUR_ORDER")}#</div>
                <div className="col-sort">{currentyourReferrenceSort}</div>
              </div>
            </div>
            
          </div>
        </div>
        <div className="card-tbody">
          {state?.invoiceHistory?.invoices?.invoiceHistoryBean?.length == 0 && (
            <NoData />
          )}
          {state?.invoiceHistory?.invoices?.invoiceHistoryBean?.map((items: any) => {
            return (
              <div className="row">
                <div className="col">
                  <div className="flex-container">
                    <div className="label"># {t("COH_INVOICE")}</div>
                    <div>
                    <Link to = {{
                          pathname: INVOICEDETAIL,
                          state :{invoicenumber: `${items.invoiceNumber}`, ordernumber: `${items.orderNumber}`,documenttype: `${items.documentType}`,invoicetype : `${items.typeCode}` ,invoiceyear :`${items.invoiceYear}`}
                    }}
                    >
                      ${items.invoiceNumber}
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="flex-container">
                    <div className="label">{t("COH_DOCUMENT_DATE")}</div>
                    <div>{items.invoiceDate}</div>
                  </div>
                </div>
                <div className="col">
                  <div className="flex-container">
                    <div className="label">{t("COH_TYPE")}</div>
                    <div>{items.typeDescription}</div>
                  </div>
                </div>
                <div className="col">
                  <div className="flex-container">
                    <div className="label">{t("COH_INVOICE_CUSTOMER")}</div>
                    <div>{items.invoiceCustomer}</div>
                  </div>
                </div>
                <div className="col">
                  <div className="flex-container">
                    <div className="label">{t("COH_AMOUNT_INCLUDING_VAT")}</div>
                   <div>{items.amount}</div>
                  </div>
                </div>
                  <div className="col order-value-position">
                  <div className="flex-container">
                    <div className="label">{t("COH_ORDER_NUMBER")}</div>
                    <div>{items.orderNumber}</div>
                  </div>
                </div>
                <div className="col">
                  <div className="flex-container">
                    <div className="label">{t("COH_ORDER_DATE")}#</div>
                    <div>{items.orderDate}</div>
                  </div>
                </div>
                <div className="col">
                  <div className="flex-container">
                    <div className="label">{t("COH_SALESMAN")}</div>
                    <div>{items.salesman}</div>
                  </div>
                </div>
                <div className="col">
                  <div className="flex-container">
                    <div className="label">{t("CON_YOUR_ORDER")}#</div>
                    <div>{items.yourReferrence}</div>
                  </div>
                </div>

                
              </div>
            );
          })}
        </div>
      </div>
      <LoadingOverlay active={loading} />
    </Fragment>
  );
};

export default InvoiceTable;
