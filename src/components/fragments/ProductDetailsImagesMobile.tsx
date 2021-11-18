import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import * as Constants from "@constants/Constants";
import altImage from "@images/awaited_image.png";
import { BASE_URL_IMAGE } from "@routers/AppRoute";

const LargeImageView = styled.img`
  height: auto;
  width: 100%;
  margin-top: 0;
  padding-top: 15px;
  padding-left: 0px;
  border-radius: cal(var(--border-radius) + 4px);
  :hover {
    opacity: 0;
  }
`;
interface IProps {
  productDetails: any;
}
const ProductDetailsImagesMobile = (props: IProps) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
  };
  const productImages = () => {
    let NewImages:any = []
      props.productDetails?.resourceBeanList?.map((data: any) => {
      return data.resourceType === "IMAGE" && data?.listOfRT?.map((images: any) => {
          NewImages.push(images)
      });
    });
    return NewImages;
  };
  console.log("productImages", productImages());
  return (
    <React.Fragment>
      <div className="container-fluid pl-0 pr-0 mb-4 pb-4">
        <div className="row pl-0 pr-0">
          <div className="col-sm-12 pl-0 pr-0 mobile-slider">
            <Slider {...settings}>
              {productImages().map((items:any) => {
                return (
                  <LargeImageView
                    src={BASE_URL_IMAGE + items}
                    alt={""}
                  />
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductDetailsImagesMobile;
