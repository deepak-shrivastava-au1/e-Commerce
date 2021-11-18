import React, { useState, useEffect } from "react";
import Divider from "@material-ui/core/Divider";
import { ArrowDownSVG, ArrowUpSVG } from "@icons";
import Collapse from "@material-ui/core/Collapse";
import { useDispatch, useSelector } from "react-redux";
import Checkbox from "../common/Checkbox";
import {
  filterChipsSelector,
  UPDATE_CHIPS,
} from "../../redux/Slices/Products/filterChipsReducer";
import { FetchFilterValues } from "@slices/Products/productSearch";
import { useMediaQuery } from "@material-ui/core";
import { breakpoints } from "@constants/styled-components";
import CloseIcon from "@material-ui/icons/Close";
import CatalogTree from "./CatalogTree";

interface Iprops {
  catalogDetails: any;
  catId: any;
  filterData: any;
  mobileHideFilter: any;
  onFilterChange: Function;
  setshowFilter:Function;
}
const Filter = (props: Iprops) => {
  // fetching data from reducer
  const palletData = useSelector(filterChipsSelector);
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const [filterStatus, setFilterStatus] = useState([]);
  const isMobile = useMediaQuery(`(min-width:${breakpoints.sm})`);

  useEffect(() => {
    setFilterStatus(
      props.filterData?.reduce((acc: any, curr: any) => {
        const filterValueName = curr.filterValueName;
        if (!acc[filterValueName]) {
          acc[filterValueName] = false;
        }
        return acc;
      }, {})
    );
  }, [props.filterData]);

  // useEffect(() => {
  //   dispatch({
  //     type: UPDATE_CHIPS,
  //     payload: [],
  //   });
  // }, []);
  // set Collapse
  const expandMore = (value: any) => {
    setFilterStatus((prevState: any) => {
      return {
        ...prevState,
        [value]: prevState && !prevState[value], //toggling
      };
    });
  };
  const handleClick = () => {
    setOpen((prevState) => !prevState);
  };
  const mobileHideFilter = () => {
    props.setshowFilter(false);
  };

  // Select or Delete filter and dispatch to chips reducer

  // API call for filter
  return (
    <div className="container-fluid">
      {!isMobile && (
        <div className="row">
          <div className="col-sm-12">
            <div className="pt-3">
              <h3>
                {" "}
                Filter
                <span className="float-right" style={{ cursor: "pointer" }}>
                  <CloseIcon
                    onClick={mobileHideFilter}
                    primary-icon-2
                    icon-md
                  />
                </span>
              </h3>
            </div>
          </div>
          <Divider />
        </div>
      )}
      {props.catId && (
        <div className="row overflow-hidden">
          <div className="col-lg-12 p-1">
            <CatalogTree catId={props.catId} />
          </div>
        </div>
      )}
      <div className="row overflow-hidden">
        <div className="col-lg-12  p-1">
          <Collapse in={open} timeout="auto" unmountOnExit>
            {props.filterData?.map((item: any, index: number) => {
              return (
                // filter Head
                <div>
                  <p
                    onClick={() => expandMore(item?.filterValueName)}
                    className="d-flex align-items-center justify-content-between filter-val"
                  >
                    <span className="float-left">
                      <b className="filterHead">{item?.filterValueName}</b>{" "}
                    </span>{" "}
                    {filterStatus && filterStatus[item?.filterValueName] ? (
                      <ArrowDownSVG className="primary-icon-4 icon-md" />
                    ) : (
                      <ArrowUpSVG className="primary-icon-4 icon-md" />
                    )}
                  </p>

                  {/* filter Items  */}

                  <div className="d-flex align-items-center justify-content-between">
                    <Collapse
                      in={
                        !(filterStatus && filterStatus[item?.filterValueName])
                      }
                      timeout="auto"
                      unmountOnExit
                    >
                      {item?.searchFilterList.map(
                        (products: any, index: number) => {
                          return (
                            <p className="filter-val-checkbox">
                              <div className="float-left">
                                <Checkbox
                                  onChange={() =>
                                    props.onFilterChange(
                                      products?.desc,
                                      index,
                                      products.code,
                                      item?.filterParam,
                                      products?.filterColumn,
                                      true
                                    )
                                  }
                                  labelText={`${products?.desc} (${products.count})`}
                                  checked={
                                    palletData?.filter(
                                      (item: any) =>
                                        item?.code === products?.code
                                    ).length > 0
                                      ? true
                                      : false
                                  }
                                />
                              </div>
                              <br />
                            </p>
                          );
                        }
                      )}
                    </Collapse>
                  </div>
                  <hr className="sectionDevider" />
                </div>
              );
            })}
          </Collapse>
        </div>
      </div>
      <Divider />
    </div>
  );
};
export default Filter;
