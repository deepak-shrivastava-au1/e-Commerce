import { useState, Fragment, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchquotationsummary,
  quotationsummaryactions,
  quotationsummarySelector,
} from "@slices/Enquiry/Quotations/QuotationSummary";
import { Link, useHistory } from "react-router-dom";
import {
  ArrowUpSVG,
  ArrowDownSVG,
  LeftSVG,
  RightSVG,
  PreviousArrow,
} from "@icons";
import { useGetLoggedInUserInfo } from "@hooks";
import NoData from "@common/NoData";
import styled from "styled-components";
import LoadingOverlay from "@common/LoadingOverlay";
import { WebSettingsContext } from "@providers/WebsettingsProvider";
import { useTranslation } from "react-i18next";
import { QUOTATIONDETAIL } from "@constants/Routes";

const PaginationContainer = styled.div`
  float: right;
  margin-top: -47px;
  padding: 0px 0px;
`;

const QuotationTable = () => {
  const sessionId = useGetLoggedInUserInfo()?.sessionId;
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1);
  const webSettings: any = useContext(WebSettingsContext);
  const { t, i18n } = useTranslation();
const history = useHistory();
  const [currentQuotationNumberSort, setCurrentQuotationNumberSort] = useState(
    <a onClick={() => fetchASCsortorder("QuotationNumber")}>
      <ArrowDownSVG className="primary-icon-2"></ArrowDownSVG>
    </a>
  );
  const [currentCustomerSort, setCurrentCustomerSort] = useState(
    <a onClick={() => fetchDESCsortorder("Customer")}>
      <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
    </a>
  );
  const [currentValueSort, setCurrentValueSort] = useState(
    <a onClick={() => fetchDESCsortorder("Value")}>
      <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
    </a>
  );
  const [currentHandlerSort, setCurrentHandlerSort] = useState(
    <a onClick={() => fetchDESCsortorder("Handler")}>
      <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
    </a>
  );

  const [currentExpiryDateSort, setCurrentExpiryDateSort] = useState(
    <a onClick={() => fetchDESCsortorder("ExpiryDate")}>
      <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
    </a>
  );

  const [sortcolumn, setSortColumn] = useState({
    SortColumn: "QuotationNumber",
    orderBy: "DESC",
  });

  function fetchASCsortorder(type: string) {
    if (type == "QuotationNumber") {
      setCurrentQuotationNumberSort(
        <a onClick={() => fetchDESCsortorder("QuotationNumber")}>
          <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
        </a>
      );
      setSortColumn({ SortColumn: "QuotationNumber", orderBy: "ASC" });
    } else if (type == "Customer") {
      setCurrentCustomerSort(
        <a onClick={() => fetchDESCsortorder("Customer")}>
          <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
        </a>
      );
      setSortColumn({ SortColumn: "Customer", orderBy: "ASC" });
    } else if (type == "Value") {
      setCurrentValueSort(
        <a onClick={() => fetchDESCsortorder("Value")}>
          <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
        </a>
      );
      setSortColumn({ SortColumn: "Value", orderBy: "ASC" });
    } else if (type == "Handler") {
      setCurrentHandlerSort(
        <a onClick={() => fetchDESCsortorder("Handler")}>
          <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
        </a>
      );
      setSortColumn({ SortColumn: "Handler", orderBy: "ASC" });
    } else if (type == "ExpiryDate") {
      setCurrentExpiryDateSort(
        <a onClick={() => fetchDESCsortorder("ExpiryDate")}>
          <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
        </a>
      );
      setSortColumn({ SortColumn: "ExpiryDate", orderBy: "ASC" });
    }
  }

  function fetchDESCsortorder(type: string) {
    if (type == "QuotationNumber") {
      setCurrentQuotationNumberSort(
        <a onClick={() => fetchASCsortorder("QuotationNumber")}>
          <ArrowDownSVG className="primary-icon-2"></ArrowDownSVG>
        </a>
      );
      setSortColumn({ SortColumn: "QuotationNumber", orderBy: "DESC" });
    } else if (type == "Customer") {
      setCurrentCustomerSort(
        <a onClick={() => fetchASCsortorder("Customer")}>
          <ArrowDownSVG className="primary-icon-2"></ArrowDownSVG>
        </a>
      );
      setSortColumn({ SortColumn: "Customer", orderBy: "DESC" });
    } else if (type == "Value") {
      setCurrentValueSort(
        <a onClick={() => fetchASCsortorder("Value")}>
          <ArrowDownSVG className="primary-icon-2"></ArrowDownSVG>
        </a>
      );
      setSortColumn({ SortColumn: "Value", orderBy: "DESC" });
    } else if (type == "Handler") {
      setCurrentHandlerSort(
        <a onClick={() => fetchASCsortorder("Handler")}>
          <ArrowDownSVG className="primary-icon-2"></ArrowDownSVG>
        </a>
      );
      setSortColumn({ SortColumn: "Handler", orderBy: "DESC" });
    } else if (type == "ExpiryDate") {
      setCurrentExpiryDateSort(
        <a onClick={() => fetchASCsortorder("ExpiryDate")}>
          <ArrowDownSVG className="primary-icon-2"></ArrowDownSVG>
        </a>
      );
      setSortColumn({ SortColumn: "ExpiryDate", orderBy: "DESC" });
    }
  }

  const state = useSelector(quotationsummarySelector);
  const searchFilters = state?.quotationsummary?.searchFilters;
  const loading = state?.quotationsummary?.loading;

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
      dispatch(quotationsummaryactions.intitalizeLoader());
      if (state?.quotationsummary?.isFilterApply) {
        dispatch(
          fetchquotationsummary(
            sessionId,
            sortcolumn.orderBy,
            sortcolumn.SortColumn,
            pageNumber,
            true,
            searchFilters.customerSearch,
            searchFilters.QuotationNumber,
            searchFilters.ItemCode
          )
        );
      } else {
        dispatch(
          fetchquotationsummary(
            sessionId,
            sortcolumn.orderBy,
            sortcolumn.SortColumn,
            pageNumber
          )
        );
      }
    }
  }, [
    sessionId,
    sortcolumn,
    state?.quotationsummary?.searchFilters,
    pageNumber,
  ]);

 
  return (
    <Fragment>
      <PaginationContainer>
        {state?.quotationsummary?.quotationHistory?.quotationHistoryBean
          ?.length > 0 && (
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
                !state?.quotationsummary?.quotationHistory?.moreRecords
                  ? "disable"
                  : ""
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
                <div className="col-title"> {t("CON_QUOTATION")}</div>
                <div className="col-sort">{currentQuotationNumberSort}</div>
              </div>
            </div>

            <div className="col">
              <div className="d-flex">
                <div className="col-title"> {t("CON_VERSION")}</div>
              </div>
            </div>
            <div className="col">
              <div className="d-flex">
                <div className="col-title"> {t("CON_CUSTOMER")}</div>
                <div className="col-sort">{currentCustomerSort}</div>
              </div>
            </div>
            <div className="col">
              <div className="d-flex">
                <div className="col-title"> {t("CON_VALUE")}</div>
                <div className="col-sort">{currentValueSort}</div>
              </div>
            </div>

            <div className="col">
              <div className="d-flex">
                <div className="col-title">{t("CON_HANDLER")}</div>
                <div className="col-sort">{currentHandlerSort}</div>
              </div>
            </div>
            <div className="col">
              <div className="d-flex">
                <div className="col-title"> {t("COH_EXPIRE_DATE")}</div>
                <div className="col-sort">{currentExpiryDateSort}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-tbody">
          {state?.quotationsummary?.quotationHistory?.quotationHistoryBean
            ?.length == 0 && <NoData />}
          {state?.quotationsummary?.quotationHistory?.quotationHistoryBean?.map(
            (items: any) => {
              return (
                <div className="row">
                  <div className="col">
                    <div className="flex-container">
                      <div className="label">{t("CON_QUOTATION")}</div>
                      <div> 
                        <Link to = {{
                          
                          pathname: QUOTATIONDETAIL,
                          state: { qno : `${items.QuotationNumber}`,vno : `${items.VersionNumber}`,type : `${items.Type}` }
                          }}
                         >
                         {items.QuotationNumber}
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="flex-container">
                      <div className="label">{t("CON_VERSION")}</div>
                      <div>{items.VersionNumber}</div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="flex-container">
                      <div className="label">{t("CON_CUSTOMER")}</div>
                      <div>{items.CustomerDesc}</div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="flex-container">
                      <div className="label">{t("CON_VALUE")}</div>
                      <div>{items.OrderValue}</div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="flex-container">
                      <div className="label">{t("CON_HANDLER")}</div>

                      <div>{items.HandlerDesc}</div>
                    </div>
                  </div>

                  <div className="col">
                    <div className="flex-container">
                      <div className="label">{t("COH_EXPIRE_DATE")}#</div>
                      <div>{items.DueDate}</div>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
      <LoadingOverlay active={loading} />
    </Fragment>
  );
};

export default QuotationTable;
