import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as Constants from "@constants/Constants";
import { BASE_URL_IMAGE } from "@routers/AppRoute";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useContext } from "react";
import altImage from "@images/banner_image.jpg";
import "../../../../scss/components/_carousel.scss";
import { LeftSVG, RightSVG } from "@icons";
import { bannersSelector } from "@slices/Promotions/banner";
import { fetchbanners } from "@slices/Promotions/banner";
import { useMediaQuery } from "@material-ui/core";
import { breakpoints } from "@constants/styled-components";
import UserMessage from "../Header/UserMessage";
import { WebSettingsContext } from "@providers/WebsettingsProvider";

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

const Banner = () => {
  const webSettingsData: any = useContext(WebSettingsContext);
  const isMobile = useMediaQuery(`(max-width:${breakpoints.sm})`);
  const dispatch = useDispatch();
  const [displayUserMessage, setDisplayUserMessage] = useState(true);
  const state = useSelector(bannersSelector);

  useEffect(() => {
    dispatch(fetchbanners());
  }, [dispatch]);

  return (
    <div className='carousel'>
      {displayUserMessage && webSettingsData?.headerText ? (
        webSettingsData?.headerText != "" ? (
          <UserMessage
            removeUserMessage={setDisplayUserMessage}
            userText={webSettingsData?.headerText}
          />
        ) : (
          ""
        )
      ) : (
        ""
      )}
      <Slider
        autoplay
        autoplaySpeed={10000}
        initialSlide={0}
        infinite
        dots
        prevArrow={<PreviousBtn />}
        nextArrow={<NextBtn />}
      >
        {state?.banners?.bannerList?.map((item: any, index: any) => (
          <div key={index}>
            <img
              src={BASE_URL_IMAGE + item.imageURL}
              onError={(e: any) => {
                e.target.onerror = null;
                e.target.src = altImage;
              }}
              alt=''
              style={{ width: "100%", height: "50vh" }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
