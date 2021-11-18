import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import * as Constants from "@constants/Constants";
import altImage from "@images/awaited_image.png";
import { BASE_URL_IMAGE } from "@routers/AppRoute";
import { useSelector } from "react-redux";
import { getCatalogueMenuSelector } from "@slices/Catalog/Menu/getCatalogueMenu";
import { LeftSVG, RightSVG } from "@icons";
import { useMediaQuery } from "@material-ui/core";
import { breakpoints } from "../../constants/styled-components";
import "./CatalogCarousel.scss";
import { useHistory } from "react-router-dom";
import { CATALOG } from "@constants/Routes";
const PreviousBtn = (props: any) => {
  const { className, onClick } = props;
  return (
    <div className={`${className} leftArrow`} onClick={onClick}>
      <LeftSVG
        className='iconBannerLR'
        style={{ width: "50px", height: "50px" }}
      />
    </div>
  );
};
const NextBtn = (props: any) => {
  const { className, onClick } = props;

  return (
    <div className={`${className} rightArrow`} onClick={onClick}>
      <RightSVG
        className='iconBannerLR'
        style={{ width: "50px", height: "50px" }}
      />
    </div>
  );
};

const CarouselImage = styled.img`
  height: 80px;
  width: 80px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  margin: 0 auto;
  @media (max-width: 550px) {
    height: auto;
    width: 130px;
  }
`;
const CarouselText = styled.p`
  font-size: cal(var(--base-font-size) - 2px);
  text-align: center;
  cursor: pointer;
`;
interface IProps {
  catId: any;
}
const CatalogCarousel = (props: IProps) => {
  const history = useHistory();
  const catalogueMainMenuTree: any = useSelector(getCatalogueMenuSelector)
    ?.catalogueMenuTree?.subCatalogueMenuList;
  const [catalogueMenuTree, setCatalogueMenuTree] = useState(
    catalogueMainMenuTree
  );
  const isMobile = useMediaQuery(`(max-width:${breakpoints.sm})`);
  let slidesToDisplay = 7;
  let slidesToScrl = 3;
  if (isMobile) {
    slidesToDisplay = 2;
    slidesToScrl = 2;
  }

  useEffect(() => {
   if(catalogueMainMenuTree !== undefined) {
    setCatalogueMenuTree(catalogueMainMenuTree);
   }
  }, [catalogueMenuTree]);

  console.log("catalogueCategoriesTree", catalogueMainMenuTree);
  const updateCatalogTree = (elementId: any) => {
    history.push(`${CATALOG}/${props.catId}/${elementId}`);
  };
  return (
    <React.Fragment>
      <div className='CatalogCarousel'>
        <div>
          <div>
            <Slider
              prevArrow={<PreviousBtn />}
              nextArrow={<NextBtn />}
              slidesToShow={slidesToDisplay}
              slidesToScroll={slidesToScrl}
              infinite={false}
            >
              {catalogueMainMenuTree?.map((items: any) => {
                return (
                  <div onClick={() => updateCatalogTree(items?.elementCode)}>
                    <CarouselImage
                      src={BASE_URL_IMAGE + items?.miniImageUrl}
                      onError={(e: any) => {
                        e.target.onerror = null;
                        e.target.src = altImage;
                      }}
                      className='pb-0 img-circle'
                    />
                    <CarouselText className='catalogTreeHeading mt-3'>
                      {console.log("dpk",items?.description)}
                      {items?.description}
                    </CarouselText>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CatalogCarousel;
