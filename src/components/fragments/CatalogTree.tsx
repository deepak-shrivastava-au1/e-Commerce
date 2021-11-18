import React, { useState, useEffect } from "react";
import Divider from "@material-ui/core/Divider";
import { ArrowDownSVG, ArrowUpSVG } from "@icons";
import Collapse from "@material-ui/core/Collapse";
import { useDispatch, useSelector } from "react-redux";

import { FetchFilterValues } from "@slices/Products/productSearch";
import { useMediaQuery } from "@material-ui/core";
import { breakpoints } from "@constants/styled-components";
import CloseIcon from "@material-ui/icons/Close";
import { useTranslation } from "react-i18next";
import { CATALOG } from "@constants/Routes";
import { useHistory } from "react-router-dom";
import { getCatalogueMenuSelector } from "@slices/Catalog/Menu/getCatalogueMenu";
import { getCatalogueCategoryTreeSelector } from "@slices/Catalog/getCatalogueCategoryTree";
import "./CatalogCarousel.scss";
import altImage from "../../assets/images/awaited_image.png";

interface Iprops {
  catId: any;
}
const CatalogTree = (props: Iprops) => {
  const history = useHistory();
  const { t } = useTranslation();
  const [open, setOpen] = useState(true);
  const [showElementCount, setShowElementCount] = useState(5);
  const showMoreElements = () => {
    if (
      showElementCount >= catalogueTree?.catalogue?.subCatalogueMenuList.length
    ) {
      setShowElementCount(5);
    } else {
      setShowElementCount(showElementCount + 5);
    }
  };
  const catalogueTree: any = useSelector(
    getCatalogueCategoryTreeSelector
  ).catalogueCategoryTree;

  const handleClick = () => {
    setOpen((prevState) => !prevState);
  };
  const updateCatalogTree = (elementId: any) => {
    history.push(`${CATALOG}/${props.catId}/${elementId}`);
  };
  console.log("catalogueTree123", catalogueTree);
  return (
    <div className="container-fluid pl-0 pr-0">
      <div className="row overflow-hidden pl-0 pr-0">
        <div className="col-lg-12 pl-0 pr-0">
          <Collapse in={true} timeout="auto" unmountOnExit>
            <div>
              <p
                onClick={handleClick}
                className="d-flex align-items-center justify-content-between filter-val"
              >
                <span className="float-left">
                  <p className="catalogTreeHeading pt-2">
                    {catalogueTree?.catalogue?.description}
                  </p>
                </span>{" "}
                {open ? (
                  <ArrowDownSVG className="primary-icon-4 icon-md" />
                ) : (
                  <ArrowUpSVG className="primary-icon-4 icon-md" />
                )}
              </p>

              {/* Catalog Tree Items  */}

              <div className="d-flex align-items-center justify-content-between pl-2">
                <Collapse in={open} timeout="auto" unmountOnExit>
                  {catalogueTree?.parentCatalogueList?.map(
                    (item: any, index: number) => {
                      return (
                        <p
                          onClick={() => updateCatalogTree(item?.elementCode)}
                          className="subCatalogTree ml-2 pt-2"
                        >
                          {item?.description}
                        </p>
                      );
                    }
                  )}

                  {catalogueTree?.catalogue?.subCatalogueMenuList &&
                    catalogueTree?.catalogue.subCatalogueMenuList
                      ?.slice(0, showElementCount)
                      .map((items: any) => {
                        return (
                          <p
                            onClick={() =>
                              updateCatalogTree(items?.elementCode)
                            }
                            className="subCatalogTree ml-5 pt-2"
                          >
                            {items?.description}
                          </p>
                        );
                      })}
                  {catalogueTree?.catalogue?.subCatalogueMenuList?.length >
                    3 && (
                    <>
                      {showElementCount >=
                      catalogueTree?.catalogue?.subCatalogueMenuList.length ? (
                        <p
                          className="ml-3 pt-2 catalogTreeHeading"
                          onClick={showMoreElements}
                        >
                          . . . See Less{" "}
                        </p>
                      ) : (
                        <p
                          className="ml-3 pt-2 catalogTreeHeading"
                          onClick={showMoreElements}
                        >
                          . . . See More{" "}
                        </p>
                      )}
                    </>
                  )}
                </Collapse>
              </div>
            </div>
          </Collapse>
        </div>
      </div>
      <Divider />
    </div>
  );
};
export default CatalogTree;
