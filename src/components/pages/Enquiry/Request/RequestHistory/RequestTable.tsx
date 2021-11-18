import { useState, Fragment, useEffect,useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchrequesthistory,
  requestSelector,
  requesthistoryactions,
  deleterequest
} from "@slices/Enquiry/Request/RequestHistory";
import OrderStatus from "@pages/Enquiry/Order/OrderHistory/OrderStatus";
import { Link } from "react-router-dom";
import {
  ArrowUpSVG,
  ArrowDownSVG,
  Info_Order,
  LeftSVG,
  RightSVG,
  PreviousArrow,
  TrashForModalSVG
} from "@icons";
import Modal from '@common/Modal'
import { useGetLoggedInUserInfo } from "@hooks";
import NoData from "@common/NoData";
import styled from "styled-components";
import LoadingOverlay from "@common/LoadingOverlay";
import { WebSettingsContext } from "@providers/WebsettingsProvider";
import { useTranslation } from "react-i18next";
import Button from '@common/Button';
import { cssVar, rgba } from 'polished'

const PaginationContainer = styled.div`
  float: right;
  margin-top: -50px;
  padding: 0px 0px;
`;

const RequestTable = () => {
  const sessionId = useGetLoggedInUserInfo()?.sessionId;
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1);
  const webSettings: any = useContext(WebSettingsContext);
  const { t, i18n } = useTranslation();
  const [deleteDialogStatus, setDeleteDialogStatus] = useState(false);
  const [currentRequestNumberSort, setCurrentRequestNumberSort] = useState(
    <a onClick={() => fetchASCsortorder("RequestNumber")}>
      <ArrowDownSVG className="primary-icon-2"></ArrowDownSVG>
    </a>
  );
  const [currentstatusSort, setCurrentstatusSort] = useState(
    <a onClick={() => fetchDESCsortorder("status")}>
      <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
    </a>
  );
  const [currentRequestTypeSort, setCurrentRequestTypeSort] = useState(
    <a onClick={() => fetchDESCsortorder("RequestType")}>
      <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
    </a>
  );
  const [currentResolutionTypeSort, setCurrentResolutionTypeSort] = useState(
    <a onClick={() => fetchDESCsortorder("ResolutionType")}>
      <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
    </a>
  );
  const [currentReferenceTypeSort, setCurrentReferenceTypeSort] = useState(
    <a onClick={() => fetchDESCsortorder("ReferenceType")}>
      <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
    </a>
  );
  const [currentReferenceSort, setCurrentReferenceSort] = useState(
    <a onClick={() => fetchDESCsortorder("Reference")}>
      <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
    </a>
  );
  const [currentDateSort, setCurrentDateSort] = useState(
    <a onClick={() => fetchDESCsortorder("Date")}>
      <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
    </a>
  );
  const [currentHandlerSort, setCurrentHandlerSort] = useState(
    <a onClick={() => fetchDESCsortorder("Handler")}>
      <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
    </a>
  );
  const [currentYourReferenceSort, setCurrentYourReferenceSort] = useState(
    <a onClick={() => fetchDESCsortorder("YourReference")}>
      <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
    </a>
  );

  const [sortcolumn, setSortColumn] = useState({
    SortColumn: "RequestNumber",
    orderBy: "DESC",
  });

  function fetchASCsortorder(type: string) {
    if (type == "RequestNumber") {
      setCurrentRequestNumberSort(
        <a onClick={() => fetchDESCsortorder("RequestNumber")}>
          <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
        </a>
      );
      setSortColumn({ SortColumn: "RequestNumber", orderBy: "ASC" });
    } else if (type == "status") {
      setCurrentstatusSort(
        <a onClick={() => fetchDESCsortorder("status")}>
          <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
        </a>
      );
      setSortColumn({ SortColumn: "status", orderBy: "ASC" });
    } else if (type == "RequestType") {
      setCurrentRequestTypeSort(
        <a onClick={() => fetchDESCsortorder("RequestType")}>
          <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
        </a>
      );
      setSortColumn({ SortColumn: "RequestType", orderBy: "ASC" });
    } else if (type == "ResolutionType") {
      setCurrentResolutionTypeSort(
        <a onClick={() => fetchDESCsortorder("ResolutionType")}>
          <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
        </a>
      );
      setSortColumn({ SortColumn: "ResolutionType", orderBy: "ASC" });
    } else if (type == "ReferenceType") {
      setCurrentReferenceTypeSort(
        <a onClick={() => fetchDESCsortorder("ReferenceType")}>
          <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
        </a>
      );
      setSortColumn({ SortColumn: "ReferenceType", orderBy: "ASC" });
    } else if (type == "Reference") {
      setCurrentReferenceSort(
        <a onClick={() => fetchDESCsortorder("Reference")}>
          <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
        </a>
      );
      setSortColumn({ SortColumn: "Reference", orderBy: "ASC" });
    } else if (type == "Date") {
      setCurrentDateSort(
        <a onClick={() => fetchDESCsortorder("Date")}>
          <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
        </a>
      );
      setSortColumn({ SortColumn: "Date", orderBy: "ASC" });
    }else if (type == "Handler") {
      setCurrentHandlerSort(
        <a onClick={() => fetchDESCsortorder("Handler")}>
          <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
        </a>
      );
      setSortColumn({ SortColumn: "Handler", orderBy: "ASC" });
    }else if (type == "YourReference") {
      setCurrentYourReferenceSort(
        <a onClick={() => fetchDESCsortorder("YourReference")}>
          <ArrowUpSVG className="primary-icon-2"></ArrowUpSVG>
        </a>
      );
      setSortColumn({ SortColumn: "YourReference", orderBy: "ASC" });
    }
  }

  function fetchDESCsortorder(type: string) {
    if (type == "RequestNumber") {
      setCurrentRequestNumberSort(
        <a onClick={() => fetchASCsortorder("RequestNumber")}>
          <ArrowDownSVG className="primary-icon-2"></ArrowDownSVG>
        </a>
      );
      setSortColumn({ SortColumn: "RequestNumber", orderBy: "DESC" });
    } else if (type == "status") {
      setCurrentstatusSort(
        <a onClick={() => fetchASCsortorder("status")}>
          <ArrowDownSVG className="primary-icon-2"></ArrowDownSVG>
        </a>
      );
      setSortColumn({ SortColumn: "status", orderBy: "DESC" });
    } else if (type == "RequestType") {
      setCurrentRequestTypeSort(
        <a onClick={() => fetchASCsortorder("RequestType")}>
          <ArrowDownSVG className="primary-icon-2"></ArrowDownSVG>
        </a>
      );
      setSortColumn({ SortColumn: "RequestType", orderBy: "DESC" });
    } else if (type == "ResolutionType") {
      setCurrentResolutionTypeSort(
        <a onClick={() => fetchASCsortorder("ResolutionType")}>
          <ArrowDownSVG className="primary-icon-2"></ArrowDownSVG>
        </a>
      );
      setSortColumn({ SortColumn: "ResolutionType", orderBy: "DESC" });
    } else if (type == "ReferenceType") {
      setCurrentReferenceTypeSort(
        <a onClick={() => fetchASCsortorder("ReferenceType")}>
          <ArrowDownSVG className="primary-icon-2"></ArrowDownSVG>
        </a>
      );
      setSortColumn({ SortColumn: "ReferenceType", orderBy: "DESC" });
    } else if (type == "Reference") {
      setCurrentReferenceSort(
        <a onClick={() => fetchASCsortorder("Reference")}>
          <ArrowDownSVG className="primary-icon-2"></ArrowDownSVG>
        </a>
      );
      setSortColumn({ SortColumn: "Reference", orderBy: "DESC" });
    } else if (type == "Date") {
      setCurrentDateSort(
        <a onClick={() => fetchASCsortorder("Date")}>
          <ArrowDownSVG className="primary-icon-2"></ArrowDownSVG>
        </a>
      );
      setSortColumn({ SortColumn: "Date", orderBy: "DESC" });
    }else if (type == "Handler") {
      setCurrentHandlerSort(
        <a onClick={() => fetchASCsortorder("Handler")}>
          <ArrowDownSVG className="primary-icon-2"></ArrowDownSVG>
        </a>
      );
      setSortColumn({ SortColumn: "Handler", orderBy: "DESC" });
    }else if (type == "YourReference") {
      setCurrentYourReferenceSort(
        <a onClick={() => fetchASCsortorder("YourReference")}>
          <ArrowDownSVG className="primary-icon-2"></ArrowDownSVG>
        </a>
      );
      setSortColumn({ SortColumn: "YourReference", orderBy: "DESC" });
    }
  }

  const state = useSelector(requestSelector);
  const searchFilters = state?.requestHistory?.searchFilters;
  const loading = state?.requestHistory?.loading;

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
      dispatch(requesthistoryactions.intitalizeLoader());
      if (state?.requestHistory?.isFilterApply) {
        dispatch(
          fetchrequesthistory(
            sessionId,
            sortcolumn.orderBy,
            sortcolumn.SortColumn,
            pageNumber,
            true,
            searchFilters.Customer,
            searchFilters.Status,
            searchFilters.RequestType,
            searchFilters.RequestNumber,
            searchFilters.ReferenceNumber,
            searchFilters.YourReference
          )
        );
      } else {
        dispatch(
          fetchrequesthistory(
            sessionId,
            sortcolumn.orderBy,
            sortcolumn.SortColumn,
            pageNumber
          )
        );
      }
    }
  }, [sessionId, sortcolumn, state?.requestHistory?.searchFilters, pageNumber, state?.requestHistory?.isrequestDeleted]);

  //console.log(state?.orderHistory?.orders?.salesOrderBean?.filter((item: any) => item.shipmentTrackingDataAvailable == true));
  return (
    <Fragment>
      <PaginationContainer>
   
        {state?.requestHistory?.requests?.requestHistoryBean?.length > 0 && (
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
                !state?.requestHistory?.requests?.moreRecords ? "disable" : ""
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
                <div className="col-title">{t("COH_ID")}</div>
                <div className="col-sort">{currentRequestNumberSort}</div>
              </div>
            </div>

            <div className="col">
              <div className="d-flex">
                <div className="col-title"> {t("CON_STATUS")}</div>
                <div className="col-sort">{currentstatusSort}</div>
              </div>
            </div>
            <div className="col">
              <div className="d-flex">
                <div className="col-title"> {t("COH_REQUEST_TYPE")}</div>
                <div className="col-sort">{currentRequestTypeSort}</div>
              </div>
            </div>
            <div className="col">
              <div className="d-flex">
                <div className="col-title"> {t("CON_RESOLUTION_TYPE")}</div>
                <div className="col-sort">{currentResolutionTypeSort}</div>
              </div>
            </div>

            <div className="col">
              <div className="d-flex">
                <div className="col-title">{t("COH_REFERENCE_TYPE")}</div>
                <div className="col-sort">{currentReferenceTypeSort}</div>
              </div>
            </div>
            <div className="col">
              <div className="d-flex">
                <div className="col-title"> {t("COH_REFERENCE")}</div>
                <div className="col-sort">{currentReferenceSort}</div>
              </div>
            </div>
            <div className="col">
              <div className="d-flex">
                <div className="col-title"> {t("COH_DATE")}</div>
                <div className="col-sort">{currentDateSort}</div>
              </div>
            </div>
            <div className="col">
              <div className="d-flex">
                <div className="col-title"> {t("CON_HANDLER")}</div>
                <div className="col-sort">{currentHandlerSort}</div>
              </div>
            </div>
            <div className="col">
              <div className="d-flex">
                <div className="col-title"> {t("COH_YOUR_REFERENCE")}</div>
                <div className="col-sort">{currentYourReferenceSort}</div>
              </div>
            </div>
            <div className="col">
              <div className="d-flex">
                <div className="col-title"> Action</div>
                
              </div>
            </div>
          </div>
        </div>
        <div className="card-tbody">
          {state?.requestHistory?.requests?.requestHistoryBean?.length == 0 && (
            <NoData />
          )}
          {state?.requestHistory?.requests?.requestHistoryBean?.map((items: any) => {
            return (
              <div className="row">
                <div className="col">
                  <div className="flex-container">
                    <div className="label">{t("COH_ID")}</div>
                    <div>
                       <Link to={`/request/${items.requestId}`}>{items.requestId}</Link>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="flex-container">
                    <div className="label">{t("CON_STATUS")}</div>
                    <div>{items.status}</div>
                  </div>
                </div>
                <div className="col">
                  <div className="flex-container">
                    <div className="label">{t("COH_REQUEST_TYPE")}</div>
                    <div>{items.requestType}</div>
                  </div>
                </div>
                <div className="col">
                  <div className="flex-container">
                    <div className="label">{t("CON_RESOLUTION_TYPE")}</div>
                   <div> {items.resolutionType}</div>
                  </div>
                </div>
                <div className="col">
                  <div className="flex-container">
                    <div className="label">{t("COH_REFERENCE_TYPE")}</div>
                   
                    <div>{items.refType}</div>
                  </div>
                </div>
                <div className="col order-value-position">
                  <div className="flex-container">
                    <div className="label">{t("COH_REFERENCE")}</div>
                    <div>{items.reference}</div>
                  </div>
                </div>
                <div className="col">
                  <div className="flex-container">
                    <div className="label">{t("COH_DATE")}</div>
                    <div>{items.date}</div>
                  </div>
                </div>
                <div className="col">
                  <div className="flex-container">
                    <div className="label">{t("CON_HANDLER")}</div>
                    <div>{items.handler}</div>
                  </div>
                </div>
                <div className="col">
                  <div className="flex-container">
                    <div className="label">{t("COH_YOUR_REFERENCE")}</div>
                    <div>{items.yourReference}</div>
                  </div>
                </div>
                <div className="col">
                  <div className="flex-container">
                  <Button
                      iconOnly
                      color="neutral"
                      variant="outlined"
                      title={t('CON_DELETE')}
                      onClick={() => setDeleteDialogStatus(true)}
                      style={{ border: "0", width: "20%" }}
                    >
                     <u style={{
                        marginLeft: "7px",
                        color: `${cssVar('--primary-color-4')}`,
                        fontWeight: Number(cssVar('--font-weight-regular')),
                        fontSize: `${cssVar('--base-font-size')}`
                      }}
                      >{t('CON_DELETE')}</u>
                    </Button>
                  </div>
                  </div>
                  <div>
                  <Modal
                    isAlert
                    icon={<TrashForModalSVG className="primary-icon-1" />}
                    title="Want to Delete ?"
                    message="Are you sure you want to delete this ?"
                    isOpen={deleteDialogStatus}
                    onRequestClose={() => setDeleteDialogStatus(false)}
                    onSecondaryButtonClick={() => {
                       dispatch(deleterequest(sessionId,items.requestId))
                       setTimeout(() => {
                        setDeleteDialogStatus(false)
                      }, 500);
                    }}
                    secondaryActionText={t('CON_DELETE')}
                  />
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

export default RequestTable;
