import { useContext } from "react";
import { WebSettingsContext } from "../../../../redux/Providers/WebsettingsProvider";
import Slider from "react-slick";
import * as Constants from "../../../../constants/Constants";
import { BASE_URL_IMAGE } from "@routers/AppRoute";
import altImage from "../../../../assets/images/banner_image.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import '../../../../scss/components/_carousel.scss';
import { LeftSVG, RightSVG } from "@icons";
import { useMediaQuery } from "@material-ui/core";
import { breakpoints } from "../../../../constants/styled-components";
import { useTranslation } from "react-i18next";
import { DETAILS } from "@constants/Routes";
import { Link } from "react-router-dom";
import { BESTOFFER, MOSTPOPULAR } from "@constants/Routes";

const PreviousBtn = (props: any) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
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
    <div className={className} onClick={onClick}>
      <RightSVG className='iconBannerLR' style={{ width: "50px" }} />
    </div>
  );
};

interface IProps {
  viewText: string;
  title: string;
  items: any;
}

const PromotionCarousel = (props: IProps) => {
  const { t, i18n } = useTranslation();
  const webSettingsData: any = useContext(WebSettingsContext);
  const isMobile = useMediaQuery(`(max-width:${breakpoints.sm})`);
  let slidesToDisplay = 6;
  let slidesToScrl = 3;
  if (isMobile) {
    slidesToDisplay = 2;
    slidesToScrl = 2;
  }

  return (
    <div className='BootstrapMulti'>
      <h2>{t(props.title)}</h2>
      <div className='promo-slider' style={{ width: "100%" }}>
        <Slider
          prevArrow={<PreviousBtn />}
          nextArrow={<NextBtn />}
          slidesToShow={slidesToDisplay}
          slidesToScroll={slidesToScrl}
          infinite={false}
        >
          <div className='view-all-container'>
            <p className='view-content'>{props.viewText}</p>
            {props.title === "CON_BEST_OFFERS" ? (
              <Link to={BESTOFFER}>
                <button className='view-all-btn'>
                  {t("CON_VIEW_ALL")}{" "}
                  <RightSVG
                    className='primary-icon-2 icon-lg'
                    style={{ fontSize: "16px" }}
                  />
                </button>
              </Link>
            ) : (
              <Link to={MOSTPOPULAR}>
                <button className='view-all-btn'>
                  {t("CON_VIEW_ALL")}{" "}
                  <RightSVG
                    className='primary-icon-2 icon-lg'
                    style={{ fontSize: "16px" }}
                  />
                </button>
              </Link>
            )}
          </div>
          {props.items.map((item: any, index: any) => (
            <Card key={index} item={item} webSettingsData={webSettingsData} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

const Card = (props: any) => {
  return (
    <div
      style={{
        textAlign: "center",
        margin: 10,
        padding: "0 10px",
        width: 180,
        // boxShadow: '0 1px 6px 0 rgb(32 33 36 / 28%)',
        borderRadius: 5,
      }}
    >
      <Link to={`${DETAILS}/${encodeURIComponent(props.item?.code)}`}>
        <img
          className='multi__image carousel-image'
          src={BASE_URL_IMAGE + props.item.imageUrl}
          onError={(e: any) => {
            e.target.onerror = null;
            e.target.src = altImage;
          }}
          alt=''
        />
      </Link>
      <Link to={`${DETAILS}/${encodeURIComponent(props.item?.code)}`}>
        <p className='carousel-desc'>{props.item.description}</p>
      </Link>
      <p style={{ textAlign: "left" }}>
        {props.item?.discountPrice ? (
          <span className='price'>
            {props.webSettingsData.showCurrencySymbolBefore
              ? +props.webSettingsData.currencyCode +
                " " +
                props.item?.discountPrice
              : props.item?.discountPrice +
                " " +
                props.webSettingsData.currencyCode}
          </span>
        ) : (
          ""
        )}
      </p>
    </div>
  );
};

export default PromotionCarousel;
