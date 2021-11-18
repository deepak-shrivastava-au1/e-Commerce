import React, {
  useState,
  useRef,
  useEffect,
  Fragment,
  useContext,
} from "react";
import { HamburgerMenuSVG } from "@icons";
import { Link } from "react-router-dom";
import { RECENTPURCHASE, BESTOFFER, MOSTPOPULAR } from "@constants/Routes";
import { useTranslation } from "react-i18next";
import Menu from "../../Catalog/Menu/Menu";
import { useGetLoggedInUserInfo } from "@hooks";
import { WebSettingsContext } from "@providers/WebsettingsProvider";

const MenuBar: React.FC<{ menu: boolean; onMenuChange: any }> = (props) => {
  const webSettingsData: any = useContext(WebSettingsContext);
  const { t, i18n } = useTranslation();
  const sessionId = useGetLoggedInUserInfo()?.sessionId;

  return (
    <Fragment>
      {props.menu && <Menu show={props.menu} onClose={props.onMenuChange} />}
      <nav className='menubar-container mobile-hide'>
        <div className='nav-center'>
          <div className='links-container show-container'>
            <ul className='menu-items'>
              <li>
                <HamburgerMenuSVG
                  onClick={props.onMenuChange}
                  className='primary-icon-2'
                />
              </li>
              <li>
                <a href=''>{t("CON_PRODUCT")}</a>
              </li>
              {webSettingsData?.showPromotionalItems ? (
                <li>
                  <Link to={BESTOFFER}>
                    <a href=''>{t("CON_BEST_OFFERS")}</a>
                  </Link>
                </li>
              ) : (
                ""
              )}
              <li>
                <a href=''>Sale</a>
              </li>
              {webSettingsData?.showMostPopularItems ? (
                <li>
                  <Link to={MOSTPOPULAR}>
                    <a href=''>{t("CON_MOST_POPULAR")}</a>
                  </Link>
                </li>
              ) : (
                ""
              )}
              {sessionId ? (
                <li>
                  <Link to={sessionId ? RECENTPURCHASE : "#"}>
                    <a>{t("CON_RECENT_PURCHASES")}</a>
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default MenuBar;
