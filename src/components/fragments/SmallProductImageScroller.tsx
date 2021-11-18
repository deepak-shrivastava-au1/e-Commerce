import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import { BASE_URL_IMAGE } from "@routers/AppRoute";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";

const PreviousBtn = (props: any) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <ArrowBackIos style={{ fontSize: "30px" }} />
    </div>
  );
};
const NextBtn = (props: any) => {
  const { className, onClick } = props;

  return (
    <div className={className} onClick={onClick}>
      <ArrowForwardIos style={{ fontSize: "30px" }} />
    </div>
  );
};

const LargeImageView = styled.img`
  height: auto;
  width: 100%;
  margin-top: 0;
  padding-top: 15px;
  padding-left: 0px;
  border-radius: cal(var(--border-radius) + 4px);
  cursor:pointer;
`;
interface IProps {
  productDetails: any;
  setLargeImageUrl:Function,
}
const SmallProductImageScroller = (props: IProps) => {
  const settings = {
    arrows:true,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
  };
  {console.log("history1",props.productDetails?.resourceBeanList)}
  const productImages = () => {
    let NewImages: any = [];
    props.productDetails?.resourceBeanList?.map((data: any) => {
      var imageCount = data.resourceListDesc.filter((items:any) => items !== 'Image').length
      return (
        data.resourceType === "IMAGE" &&
        data?.listOfRT?.map((images: any, i:number) => {
          if(i < imageCount){
            NewImages.push(images);
          }
        })
      );
    });
    return NewImages;
  };
  {console.log("history12",productImages())}
  return (
    <React.Fragment>
      <div className="container-fluid pl-0 pr-0 mb-4 pb-4">
        <div className="row pl-0 pr-0">
          <div className="col-sm-12 pl-0 pr-0 mobile-slider">
            <Slider
              {...settings}
            >
              {productImages().map((items: any) => {
                return (
                  <>
                  
                  {items &&
                  <LargeImageView onClick={(e:any) => props.setLargeImageUrl(items)} src={BASE_URL_IMAGE + items} />
                  }
                  </>
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SmallProductImageScroller;
