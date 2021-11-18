import React, {useContext} from "react";
import { useTranslation } from "react-i18next";
import CookieConsent from "react-cookie-consent";
import { WebSettingsContext } from "@providers/WebsettingsProvider"
import { BASE_URL_KEY } from "@constants/Constants";
import { rgba, cssVar } from "polished";

const DisclaimerText: React.FC<{}> = (
  props
) => {
  const { t} = useTranslation();
  const webSettings: any = useContext(WebSettingsContext);
  const selectedLocale = webSettings?.languageCode ? webSettings?.languageCode :"EN";
  // console.log(localStorage.getItem(BASE_URL_KEY))
  
  return (
      
      <CookieConsent
        onAccept={(acceptedByScrolling) => {}}
        location="bottom"
        cookieName="myAwesomeCookieName2"
        style={{ background: "var(--primary-color-2)", lineHeight: "40px" }}
        buttonStyle={{
          fontSize: "calc(var(--base-font-size) + 2px)",
          color: "var(--white)",
          background: "var(--primary-color-1)",
          lineHeight: "22px",
          fontWeight: "var(--font-weight-medium)",
          height: "40px",
          padding: "9px 16px"   
        }}
        expires={1000}
      >
        {t("TXT_DISCLAIMER_01")}
        <span
          style={{ fontSize: "14px", cursor: "pointer" }}
          onClick={() =>
            window.open(
              localStorage.getItem(BASE_URL_KEY)+"/disclaimer_"+selectedLocale+".html",
              "_blank"
            )
          }
        >
          {t("CON_VIEW_MORE")}
        </span>
      </CookieConsent>
      
  );
};

export default DisclaimerText;
