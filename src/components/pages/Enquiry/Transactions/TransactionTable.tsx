import { useState, Fragment, useEffect,useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchtransaction,
  transactionSelector,
  transactionactions,
} from "@slices/Enquiry/Transactions/transactions";
import { Link } from "react-router-dom";
import {
  ArrowUpSVG,
  ArrowDownSVG,
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

const PaginationContainer = styled.div`
  float: right;
  margin-top: -63px;
  padding: 0px 0px;
`;

const TransactionTable = () => {
  const sessionId = useGetLoggedInUserInfo()?.sessionId;
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1);
  const webSettings: any = useContext(WebSettingsContext);
  const { t, i18n } = useTranslation();

  const [currentCustomerSort, setCurrentCustomerSort] = useState(
    <a onClick={() => fetchASCsorttrans("Customer")}>
      <ArrowDownSVG className="primary-icon-2"></ArrowDownSVG>
    </a>
  );
  const [currentDocumentTypeSort, setCurrentDocumentTypeSort] = useState(
    <a onClick={() => fetchDESCsorttrans("DocumentType")}>
      <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
    </a>
  );
  const [currentDocumentDateSort, setCurrentDocumentDateSort] = useState(
    <a onClick={() => fetchDESCsorttrans("DocumentDate")}>
      <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
    </a>
  );
  const [currentdueDateSort, setCurrentdueDateSort] = useState(
    <a onClick={() => fetchDESCsorttrans("dueDate")}>
      <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
    </a>
  );
  const [currentCurrencySort, setCurrentCurrencySort] = useState(
    <a onClick={() => fetchDESCsorttrans("Currency")}>
      <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
    </a>
  );
  const [currentOriginalAmountSort, setCurrentOriginalAmountSort] = useState(
    <a onClick={() => fetchDESCsorttrans("OriginalAmount")}>
      <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
    </a>
  );
  const [currentremainingAmountSort, setCurrentremainingAmountSort] = useState(
    <a onClick={() => fetchDESCsorttrans("remainingAmount")}>
      <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
    </a>
  );
  const [currentdescriptionSort, setCurrentdescriptionSort] = useState(
    <a onClick={() => fetchDESCsorttrans("description")}>
      <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
    </a>
  );
  const [currentdebtorCodeSort, setCurrentdebtorCodeSort] = useState(
    <a onClick={() => fetchDESCsorttrans("debtorCode")}>
      <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
    </a>
  );

  const [sortcolumn, setSortColumn] = useState({
    SortColumn: "Customer",
    orderBy: "DESC",
  });

  function fetchASCsorttrans(type: string) {
    if (type == "Customer") {
      setCurrentCustomerSort(
        <a onClick={() => fetchDESCsorttrans("Customer")}>
          <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
        </a>
      );
      setSortColumn({ SortColumn: "OrderNumber", orderBy: "ASC" });
    } else if (type == "DocumentType") {
      setCurrentDocumentTypeSort(
        <a onClick={() => fetchDESCsorttrans("DocumentType")}>
          <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
        </a>
      );
      setSortColumn({ SortColumn: "DocumentType", orderBy: "ASC" });
    } else if (type == "DocumentDate") {
      setCurrentDocumentDateSort(
        <a onClick={() => fetchDESCsorttrans("DocumentDate")}>
          <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
        </a>
      );
      setSortColumn({ SortColumn: "OrderDate", orderBy: "ASC" });
    } else if (type == "dueDate") {
      setCurrentdueDateSort(
        <a onClick={() => fetchDESCsorttrans("dueDate")}>
          <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
        </a>
      );
      setSortColumn({ SortColumn: "dueDate", orderBy: "ASC" });
    } else if (type == "Currency") {
      setCurrentCurrencySort(
        <a onClick={() => fetchDESCsorttrans("Currency")}>
          <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
        </a>
      );
      setSortColumn({ SortColumn: "Currency", orderBy: "ASC" });
    } else if (type == "OriginalAmount") {
      setCurrentOriginalAmountSort(
        <a onClick={() => fetchDESCsorttrans("OriginalAmount")}>
          <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
        </a>
      );
      setSortColumn({ SortColumn: "OriginalAmount", orderBy: "ASC" });
    } else if (type == "remainingAmount") {
      setCurrentremainingAmountSort(
        <a onClick={() => fetchDESCsorttrans("remainingAmount")}>
          <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
        </a>
      );
      setSortColumn({ SortColumn: "remainingAmount", orderBy: "ASC" });
    }else if (type == "description") {
      setCurrentdescriptionSort(
        <a onClick={() => fetchDESCsorttrans("description")}>
          <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
        </a>
      );
      setSortColumn({ SortColumn: "description", orderBy: "ASC" });
    }else if (type == "debtorCode") {
      setCurrentdebtorCodeSort(
        <a onClick={() => fetchDESCsorttrans("debtorCode")}>
          <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
        </a>
      );
      setSortColumn({ SortColumn: "debtorCode", orderBy: "ASC" });
    }
  }

  function fetchDESCsorttrans(type: string) {
    if (type == "Customer") {
      setCurrentCustomerSort(
        <a onClick={() => fetchASCsorttrans("Customer")}>
          <ArrowDownSVG className="primary-icon-2"></ArrowDownSVG>
        </a>
      );
      setSortColumn({ SortColumn: "Customer", orderBy: "DESC" });
    } else if (type == "DocumentType") {
      setCurrentDocumentTypeSort(
        <a onClick={() => fetchASCsorttrans("DocumentType")}>
          <ArrowDownSVG className="primary-icon-2"></ArrowDownSVG>
        </a>
      );
      setSortColumn({ SortColumn: "DocumentType", orderBy: "DESC" });
    } else if (type == "DocumentDate") {
      setCurrentDocumentDateSort(
        <a onClick={() => fetchASCsorttrans("DocumentDate")}>
          <ArrowDownSVG className="primary-icon-2"></ArrowDownSVG>
        </a>
      );
      setSortColumn({ SortColumn: "DocumentDate", orderBy: "DESC" });
    } else if (type == "dueDate") {
      setCurrentdueDateSort(
        <a onClick={() => fetchASCsorttrans("dueDate")}>
          <ArrowDownSVG className="primary-icon-2"></ArrowDownSVG>
        </a>
      );
      setSortColumn({ SortColumn: "dueDate", orderBy: "DESC" });
    } else if (type == "Currency") {
      setCurrentCurrencySort(
        <a onClick={() => fetchASCsorttrans("Currency")}>
          <ArrowDownSVG className="primary-icon-2"></ArrowDownSVG>
        </a>
      );
      setSortColumn({ SortColumn: "Currency", orderBy: "DESC" });
    } else if (type == "OriginalAmount") {
      setCurrentOriginalAmountSort(
        <a onClick={() => fetchASCsorttrans("OriginalAmount")}>
          <ArrowDownSVG className="primary-icon-2"></ArrowDownSVG>
        </a>
      );
      setSortColumn({ SortColumn: "OriginalAmount", orderBy: "DESC" });
    } else if (type == "remainingAmount") {
      setCurrentremainingAmountSort(
        <a onClick={() => fetchASCsorttrans("remainingAmount")}>
          <ArrowDownSVG className="primary-icon-2"></ArrowDownSVG>
        </a>
      );
      setSortColumn({ SortColumn: "remainingAmount", orderBy: "DESC" });
    } else if (type == "description") {
      setCurrentdescriptionSort(
        <a onClick={() => fetchASCsorttrans("description")}>
          <ArrowDownSVG className="primary-icon-2"></ArrowDownSVG>
        </a>
      );
      setSortColumn({ SortColumn: "description", orderBy: "DESC" });
    } else if (type == "debtorCode") {
      setCurrentdebtorCodeSort(
        <a onClick={() => fetchASCsorttrans("debtorCode")}>
          <ArrowDownSVG className="primary-icon-2"></ArrowDownSVG>
        </a>
      );
      setSortColumn({ SortColumn: "debtorCode", orderBy: "DESC" });
    }
  }

  const state = useSelector(transactionSelector);
  const searchFilters = state?.transactions?.searchFilters;
  const loading = state?.transactions?.loading;

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
      dispatch(transactionactions.intitalizeLoader());
      if (state?.transactions?.isFilterApply) {
        dispatch(
          fetchtransaction(
            sessionId,
            sortcolumn.orderBy,
            sortcolumn.SortColumn,
            pageNumber,
            true,
            searchFilters.Customer,
            searchFilters.Currency,
            searchFilters.OrgAmtRel,
            searchFilters.OrgAmtVal1,
            searchFilters.OrgAmtVal2,
            searchFilters.RemAmtRel,
            searchFilters.RemAmtVal1,
            searchFilters.RemAmtVal2,
           searchFilters.DocDateRel,
            searchFilters.DocDateVal1,
            searchFilters.DocDateVal2,
            searchFilters.DueDateRel,
            searchFilters.DueDateVal1,
            searchFilters.DueDateVal2
          
         
          )
        );
      } else {
        dispatch(
          fetchtransaction(
            sessionId,
            sortcolumn.orderBy,
            sortcolumn.SortColumn,
            pageNumber
          )
        );
      }
    }
  }, [sessionId, sortcolumn, state?.transactions?.searchFilters, pageNumber]);

  //console.log(state?.orderHistory?.orders?.salesOrderBean?.filter((item: any) => item.shipmentTrackingDataAvailable == true));
  return (
    <Fragment>
      <PaginationContainer>
   
        {state?.transactions?.transactionslst?.transactionBean?.length > 0 && (
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
                !state?.transactions?.transactionslst?.moreRecords ? "disable" : ""
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
                <div className="col-title">{t("COH_CUSTOMER")}</div>
                <div className="col-sort">{currentCustomerSort}</div>
              </div>
            </div>

            <div className="col">
              <div className="d-flex">
                <div className="col-title"> {t("COH_DOCUMENT")}</div>
                <div className="col-sort">{currentDocumentTypeSort}</div>
              </div>
            </div>
            <div className="col">
              <div className="d-flex">
                <div className="col-title"> {t("CON_DOCUMENT_DATE")}</div>
                <div className="col-sort">{currentDocumentDateSort}</div>
              </div>
            </div>
            <div className="col">
              <div className="d-flex">
                <div className="col-title"> {t("COH_DUE_DATE")}</div>
                <div className="col-sort">{currentdueDateSort}</div>
              </div>
            </div>

            <div className="col">
              <div className="d-flex">
                <div className="col-title">{t("COH_CURRENCY")}</div>
                <div className="col-sort">{currentCurrencySort}</div>
              </div>
            </div>
            <div className="col">
              <div className="d-flex">
                <div className="col-title"> {t("COH_ORIGINAL_AMOUNT")}</div>
                <div className="col-sort">{currentOriginalAmountSort}</div>
              </div>
            </div>
            <div className="col">
              <div className="d-flex">
                <div className="col-title"> {t("COH_REMAINING_AMOUNT")}</div>
                <div className="col-sort">{currentremainingAmountSort}</div>
              </div>
            </div>
            <div className="col">
              <div className="d-flex">
                <div className="col-title"> {t("COH_DESCRIPTION")}</div>
                <div className="col-sort">{currentdescriptionSort}</div>
              </div>
            </div>
            <div className="col">
              <div className="d-flex">
                <div className="col-title"> {t("COH_DEBTOR")}</div>
                <div className="col-sort">{currentdebtorCodeSort}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-tbody">
          {state?.transactions?.transactionslst?.transactionBean?.length == 0 && (
            <NoData />
          )}
          {state?.transactions?.transactionslst?.transactionBean?.map((items: any) => {
            return (
              <div className="row">
                <div className="col">
                  <div className="flex-container">
                    <div className="label">{t("COH_CUSTOMER")}</div>
                    <div>
                     {items.customerCode}
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="flex-container">
                    <div className="label">{t("COH_DOCUMENT")}</div>
                    <div>{items.documentTypeCode}{items.documentNumber}</div>
                  </div>
                </div>
                <div className="col">
                  <div className="flex-container">
                    <div className="label">{t("CON_DOCUMENT_DATE")}</div>
                    <div>{items.documentDate}</div>
                  </div>
                </div>
                <div className="col">
                  <div className="flex-container">
                    <div className="label">{t("COH_DUE_DATE")}</div>
                    <div>{items.dueDate}</div>
                  </div>
                </div>
                 <div className="col order-value-position">
                  <div className="flex-container">
                    <div className="label">{t("COH_CURRENCY")}</div>
                    <div>{items.transactionCurrencyCode}</div>
                  </div>
                </div>
                <div className="col">
                  <div className="flex-container">
                    <div className="label">{t("COH_ORIGINAL_AMOUNT")}</div>
                    <div>{items.originalAmount}</div>
                  </div>
                </div>
                <div className="col">
                  <div className="flex-container">
                    <div className="label">{t("COH_REMAINING_AMOUNT")}</div>
                    <div>{items.remainingAmount}</div>
                  </div>
                </div>
                <div className="col">
                  <div className="flex-container">
                    <div className="label">{t("COH_DESCRIPTION")}</div>
                    <div>{items.description}</div>
                  </div>
                </div>
                <div className="col">
                  <div className="flex-container">
                    <div className="label">{t("COH_DEBTOR")}</div>
                    <div>{items.debtorCode}</div>
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

export default TransactionTable;
