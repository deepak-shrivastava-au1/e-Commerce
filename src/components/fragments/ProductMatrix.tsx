import Button from "@common/Button";
import React from "react";
import { useState } from "react";

interface IProps {
  productDetails: any;
  options: any;
  selectProduct: Function;
  selectAttribute: Function;
  product: string;
  attribute: string;
}
export default function ProductMatrix(props: IProps) {
  var key1 = props.productDetails?.matrixItemDetailList[0]?.segmentationDesc2;
  var key2 = props.productDetails?.matrixItemDetailList[0]?.segmentationDesc3;
  console.log("matrix", props.product);
  return (
    <>
      <div className="container-fluid pl-0">
        <div className="row pt-3 pl-0">
          <div className="col-lg-12 pl-0">
            <p className="pb-2">{key1}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 pl-0">
            {props.productDetails.matrixTable[`${key1}`]?.map(
              (items: any, i: number) => {
                return (
                  <>
                    <span className="pl-1 pt-3">
                      <Button
                        onClick={() => props.selectProduct(items)}
                        variant={items === props.product ? "solid" : "outlined"}
                        color="primary"
                      >
                        <span className="matrixButton">{items}</span>
                      </Button>
                    </span>
                  </>
                );
              }
            )}
          </div>
        </div>

        <div className="row pt-4">
          <div className="col-lg-12 pl-0">
            <p className="pb-2">{key2}</p>
          </div>
        </div>
        <div className="row pt-1">
          <div className="col-lg-12 pl-0">
            {props.product ? (
              <>
                {props.productDetails.matrixItemDetailList[0]?.childMatrixList?.map(
                  (items: any) => {
                    return (
                      <>
                        {props.product === items.verticalTemplateName && (
                          <Button
                            className="ml-1 mt-1"
                            onClick={() =>
                              props.selectAttribute(items?.columnTemplateName)
                            }
                            variant={
                              items?.columnTemplateName === props.attribute
                                ? "solid"
                                : "outlined"
                            }
                            color="primary"
                          >
                            {props.product.length ? (
                              <span className="matrixButton">
                                {items?.columnTemplateName}
                              </span>
                            ) : (
                              <span className="matrixButton">
                                {props.productDetails.matrixTable[
                                  `${key2}`
                                ]?.map((item: any) => {
                                  <>{item}</>;
                                })}
                              </span>
                            )}
                          </Button>
                        )}
                      
                      </>
                    );
                  }
                )}
              </>
            ) : (
              <>
                {props.productDetails.matrixTable[`${key2}`]?.map(
                  (items: any, i: number) => {
                    return (
                      <>
                        <span className="pl-1 pt-3">
                          <Button
                            onClick={() => props.selectProduct(items)}
                            variant={
                              items === props.product ? "solid" : "outlined"
                            }
                            color="primary"
                          >
                            <span className="matrixButton">{items}</span>
                          </Button>
                        </span>
                      </>
                    );
                  }
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
