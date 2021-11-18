import { useState, Fragment, useEffect,useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchorderhistory,
  orderSelector,
  orderhistoryactions,
} from "@slices/Enquiry/Order/orderHistory";
import OrderStatus from "@pages/Enquiry/Order/OrderHistory/OrderStatus";
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
import "./CardTable.scss";
import LoadingOverlay from "@common/LoadingOverlay";
import { WebSettingsContext } from "@providers/WebsettingsProvider";
import { useTranslation } from "react-i18next";

const PaginationContainer = styled.div`
  float: right;
  margin-top: -50px;
  padding: 0px 0px;
`;

const OrderTable = () => {
  const sessionId = useGetLoggedInUserInfo()?.sessionId;
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1);
  const webSettings: any = useContext(WebSettingsContext);
  const { t, i18n } = useTranslation();

  const [currentOrderNumberSort, setCurrentOrderNumberSort] = useState(
    <a onClick={() => fetchASCsortorder("OrderNumber")}>
      <ArrowDownSVG className="primary-icon-2"></ArrowDownSVG>
    </a>
  );
  const [currentCustomerSort, setCurrentCustomerSort] = useState(
    <a onClick={() => fetchDESCsortorder("Customer")}>
      <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
    </a>
  );
  const [currentOrderDateSort, setCurrentOrderDateSort] = useState(
    <a onClick={() => fetchDESCsortorder("OrderDate")}>
      <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
    </a>
  );
  const [currentStatusSort, setCurrentStatusSort] = useState(
    <a onClick={() => fetchDESCsortorder("Status")}>
      <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
    </a>
  );
  const [currentOrderValueSort, setCurrentOrderValueSort] = useState(
    <a onClick={() => fetchDESCsortorder("OrderValue")}>
      <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
    </a>
  );
  const [currentHandlerSort, setCurrentHandlerSort] = useState(
    <a onClick={() => fetchDESCsortorder("Handler")}>
      <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
    </a>
  );
  const [currentYourOrderNumberSort, setCurrentYourOrderNumberSort] = useState(
    <a onClick={() => fetchDESCsortorder("YourOrderNumber")}>
      <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
    </a>
  );

  const [sortcolumn, setSortColumn] = useState({
    SortColumn: "OrderNumber",
    orderBy: "DESC",
  });

  function fetchASCsortorder(type: string) {
    if (type == "OrderNumber") {
      setCurrentOrderNumberSort(
        <a onClick={() => fetchDESCsortorder("OrderNumber")}>
          <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
        </a>
      );
      setSortColumn({ SortColumn: "OrderNumber", orderBy: "ASC" });
    } else if (type == "Customer") {
      setCurrentCustomerSort(
        <a onClick={() => fetchDESCsortorder("Customer")}>
          <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
        </a>
      );
      setSortColumn({ SortColumn: "Customer", orderBy: "ASC" });
    } else if (type == "OrderDate") {
      setCurrentOrderDateSort(
        <a onClick={() => fetchDESCsortorder("OrderDate")}>
          <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
        </a>
      );
      setSortColumn({ SortColumn: "OrderDate", orderBy: "ASC" });
    } else if (type == "Status") {
      setCurrentStatusSort(
        <a onClick={() => fetchDESCsortorder("Status")}>
          <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
        </a>
      );
      setSortColumn({ SortColumn: "Status", orderBy: "ASC" });
    } else if (type == "OrderValue") {
      setCurrentOrderValueSort(
        <a onClick={() => fetchDESCsortorder("OrderValue")}>
          <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
        </a>
      );
      setSortColumn({ SortColumn: "OrderValue", orderBy: "ASC" });
    } else if (type == "Handler") {
      setCurrentHandlerSort(
        <a onClick={() => fetchDESCsortorder("Handler")}>
          <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
        </a>
      );
      setSortColumn({ SortColumn: "Handler", orderBy: "ASC" });
    } else if (type == "YourOrderNumber") {
      setCurrentYourOrderNumberSort(
        <a onClick={() => fetchDESCsortorder("YourOrderNumber")}>
          <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
        </a>
      );
      setSortColumn({ SortColumn: "YourOrderNumber", orderBy: "ASC" });
    }
  }

  function fetchDESCsortorder(type: string) {
    if (type == "OrderNumber") {
      setCurrentOrderNumberSort(
        <a onClick={() => fetchASCsortorder("OrderNumber")}>
          <ArrowDownSVG className="primary-icon-2"></ArrowDownSVG>
        </a>
      );
      setSortColumn({ SortColumn: "OrderNumber", orderBy: "DESC" });
    } else if (type == "Customer") {
      setCurrentCustomerSort(
        <a onClick={() => fetchASCsortorder("Customer")}>
          <ArrowDownSVG className="primary-icon-2"></ArrowDownSVG>
        </a>
      );
      setSortColumn({ SortColumn: "Customer", orderBy: "DESC" });
    } else if (type == "OrderDate") {
      setCurrentOrderDateSort(
        <a onClick={() => fetchASCsortorder("OrderDate")}>
          <ArrowDownSVG className="primary-icon-2"></ArrowDownSVG>
        </a>
      );
      setSortColumn({ SortColumn: "OrderDate", orderBy: "DESC" });
    } else if (type == "Status") {
      setCurrentStatusSort(
        <a onClick={() => fetchASCsortorder("Status")}>
          <ArrowDownSVG className="primary-icon-2"></ArrowDownSVG>
        </a>
      );
      setSortColumn({ SortColumn: "Status", orderBy: "DESC" });
    } else if (type == "OrderValue") {
      setCurrentOrderValueSort(
        <a onClick={() => fetchASCsortorder("OrderValue")}>
          <ArrowDownSVG className="primary-icon-2"></ArrowDownSVG>
        </a>
      );
      setSortColumn({ SortColumn: "OrderValue", orderBy: "DESC" });
    } else if (type == "Handler") {
      setCurrentHandlerSort(
        <a onClick={() => fetchASCsortorder("Handler")}>
          <ArrowDownSVG className="primary-icon-2"></ArrowDownSVG>
        </a>
      );
      setSortColumn({ SortColumn: "Handler", orderBy: "DESC" });
    } else if (type == "YourOrderNumber") {
      setCurrentYourOrderNumberSort(
        <a onClick={() => fetchASCsortorder("YourOrderNumber")}>
          <ArrowDownSVG className="primary-icon-2"></ArrowDownSVG>
        </a>
      );
      setSortColumn({ SortColumn: "YourOrderNumber", orderBy: "DESC" });
    }
  }

  const state = useSelector(orderSelector);
  const searchFilters = state?.orderHistory?.searchFilters;
  const loading = state?.orderHistory?.loading;

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
      dispatch(orderhistoryactions.intitalizeLoader());
      if (state?.orderHistory?.isFilterApply) {
        dispatch(
          fetchorderhistory(
            sessionId,
            sortcolumn.orderBy,
            sortcolumn.SortColumn,
            pageNumber,
            true,
            searchFilters.Customer,
            searchFilters.Status,
            searchFilters.Handler,
            searchFilters.Salesperson,
            searchFilters.OrderTextSearch
          )
        );
      } else {
        dispatch(
          fetchorderhistory(
            sessionId,
            sortcolumn.orderBy,
            sortcolumn.SortColumn,
            pageNumber
          )
        );
      }
    }
  }, [sessionId, sortcolumn, state?.orderHistory?.searchFilters, pageNumber]);

  //console.log(state?.orderHistory?.orders?.salesOrderBean?.filter((item: any) => item.shipmentTrackingDataAvailable == true));
  return (
    <Fragment>
      <PaginationContainer>
   
        {state?.orderHistory?.orders?.salesOrderBean?.length > 0 && (
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
                !state?.orderHistory?.orders?.moreRecords ? "disable" : ""
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
                <div className="col-title"> #{t("CON_ORDER")}</div>
                <div className="col-sort">{currentOrderNumberSort}</div>
              </div>
            </div>

            <div className="col">
              <div className="d-flex">
                <div className="col-title"> {t("COH_CUSTOMER")}</div>
                <div className="col-sort">{currentCustomerSort}</div>
              </div>
            </div>
            <div className="col">
              <div className="d-flex">
                <div className="col-title"> {t("CON_ORDER_DATE")}</div>
                <div className="col-sort">{currentOrderDateSort}</div>
              </div>
            </div>
            <div className="col">
              <div className="d-flex">
                <div className="col-title"> {t("CON_STATUS")}</div>
                <div className="col-sort">{currentStatusSort}</div>
              </div>
            </div>

            <div className="col">
              <div className="d-flex">
                <div className="col-title">{t("CON_ORDER_VALUE")}</div>
                <div className="col-sort">{currentOrderValueSort}</div>
              </div>
            </div>
            { webSettings?.showHandlerOrder &&  <div className="col">
              <div className="d-flex">
                <div className="col-title"> {t("CON_HANDLER")}</div>
                <div className="col-sort">{currentHandlerSort}</div>
              </div>
            </div>}
            <div className="col">
              <div className="d-flex">
                <div className="col-title"> {t("CON_YOUR_ORDER")}#</div>
                <div className="col-sort">{currentYourOrderNumberSort}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-tbody">
          {state?.orderHistory?.orders?.salesOrderBean?.length == 0 && (
            <NoData />
          )}
          {state?.orderHistory?.orders?.salesOrderBean?.map((items: any) => {
            return (
              <div className="row">
                <div className="col">
                  <div className="flex-container">
                    <div className="label"># {t("CON_ORDER")}</div>
                    <div>
                       <Link to={`/orderhistory/${items.orderNumber}`}>{items.orderNumber}</Link>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="flex-container">
                    <div className="label">{t("COH_CUSTOMER")}</div>
                    <div>{items.customer}</div>
                  </div>
                </div>
                <div className="col">
                  <div className="flex-container">
                    <div className="label">{t("CON_ORDER_DATE")}</div>
                    <div>{items.orderDate}</div>
                  </div>
                </div>
                <div className="col">
                  <div className="flex-container">
                    <div className="label">{t("CON_STATUS")}</div>
                    <OrderStatus
                      orderstatus={items.status}
                      isOrderHeldFlag={items.isOrderHeldFlag}
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="flex-container">
                    <div className="label">{t("CON_ORDER_VALUE")}</div>
                    <div>
                      {items.isOrderValueFlag && (
                        <Info_Order title={items.orderValue} />
                      )}
                    </div>
                    <div>{!items.isOrderValueFlag && items.orderValue}</div>
                  </div>
                </div>
                { webSettings?.showHandlerOrder &&  <div className="col order-value-position">
                  <div className="flex-container">
                    <div className="label">{t("CON_HANDLER")}</div>
                    <div>{items.handler}</div>
                  </div>
                </div>}
                <div className="col">
                  <div className="flex-container">
                    <div className="label">{t("CON_YOUR_ORDER")}#</div>
                    <div>{items.yourOrderNo}</div>
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

export default OrderTable;
