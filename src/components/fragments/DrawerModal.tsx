import React from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import FlyinContent from "./FlyinContent";
import MemoEye from "../../assets/icons/Eye";
import PriceCalculator from "./PriceCalculator";
import { CalculateSVG } from "@icons";

interface IProps {
  productDetails?: any;
  ListView?: boolean;
  QuickViewPOS?: boolean;
  className: string;
  actualPrice?: any;
  discountPercentage?: any;
  discountPrice?: any;
  imageUrl: string;
  productId: string;
  productDescription: string;
  itemStandardPrice: string;
  salesUnit: any;
  priceCalculator?: boolean;
  GridView?: boolean;
  onAddItemToCartHandler: Function;
}

export default function DrawerModal(props: IProps) {
  const [state, setState] = React.useState<any>({
    right: false,
  });

  // Open and Close Drawer Handler
  const toggleDrawer = (anchor: any, open: any) => (event: any) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <div>
      {["Click"].map((anchor) => (
        <React.Fragment key={anchor}>
          <>
            {props.priceCalculator && (
              <button
                className="calculator"
                onClick={toggleDrawer(anchor, true)}
              >
                <CalculateSVG className="calculatorIcon primary-icon-4 icon-lg" />
              </button>
            )}
          </>
          <>
            {props.QuickViewPOS && (
              <div>
                {/* <button
                  style={{
                    border: "none",
                    // height: "50px",
                    // width: "50px",
                    // borderRadius: "50px",
                  }}
                  onClick={toggleDrawer(anchor, true)}
                > */}
                <MemoEye
                  style={{
                    cursor: "pointer",
                    opacity: "var(--medium-opacity)",
                  }}
                  onClick={toggleDrawer(anchor, true)}
                  className="icon-lg primary-icon-2"
                />
                {/* </button> */}
              </div>
            )}
          </>
          <>
            {props.ListView && (
              <button
                className="listAction ml-3"
                onClick={toggleDrawer(anchor, true)}
              >
                <MemoEye className="iconSecondaryColorList" /> Quick View
              </button>
            )}
          </>
          <>
            {props.GridView && (
              <MemoEye
                onClick={toggleDrawer(anchor, true)}
                className="icon-lg primary-icon-2"
              />
            )}
          </>

          <SwipeableDrawer
            anchor={"right"}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {props.priceCalculator ? (
              <PriceCalculator
                productDetails={props.productDetails}
                actualPrice={props?.actualPrice}
                discountPrice={props.discountPrice}
                imageUrl={props.imageUrl}
                productID={props.productId}
                productDescription={props.productDescription}
                itemStandardPrice={props.itemStandardPrice}
                closeDrawer={toggleDrawer(anchor, false)}
                salesUnit={props.salesUnit}
                onAddItemToCartHandler={props.onAddItemToCartHandler}
              />
            ) : (
              <FlyinContent
                discountPrice={props.discountPrice}
                actualPrice={props?.actualPrice}
                discountPercentage={props?.discountPercentage}
                imageUrl={props.imageUrl}
                productID={props.productId}
                productDescription={props.productDescription}
                itemStandardPrice={props.itemStandardPrice}
                closeDrawer={toggleDrawer(anchor, false)}
                salesUnit={props.salesUnit}
                onAddItemToCartHandler={props.onAddItemToCartHandler}
              />
            )}

            {/* {list(anchor)} */}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
