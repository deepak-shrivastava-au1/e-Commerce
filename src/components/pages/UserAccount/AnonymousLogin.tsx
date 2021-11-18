import React, { FC }from "react";
import { rgba, cssVar } from "polished";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import Button from "@common/Button";
import { ProfileSVG } from "@icons";


type AnonymousLoginProps = {
  navigateToSignInPage: (arg: boolean) => void;
  launchCreateAccountScreen: (arg: boolean) => void;
};

  
export const AnonymousLogin: FC<AnonymousLoginProps> = ({
  navigateToSignInPage,
  launchCreateAccountScreen,
}) => {
  const { t } = useTranslation();
 
  return (
    <div>
      <PopoverContainer>
        <div className="form-row text-center">
          <Button
            variant="solid"
            onClick={() => {
              navigateToSignInPage(true);
            }}
            style={{ marginTop: "24px", width: "120px" }}
          >
            <i>
              <ProfileSVG
                className="secondary-icon-2 icon-lg"
                style={{ marginRight: "5px" }}
              />
            </i>
            {t("CON_SIGN_IN")}
          </Button>
        </div>
        <div className="d-flex flex-row" style={{ margin: "16px" }}>
          <h4>New User?</h4>
          <TextStyle onClick={() => launchCreateAccountScreen(true)}>
            Create an account
          </TextStyle>
        </div>
      </PopoverContainer>
    </div>
  );
}

export default AnonymousLogin;

const PopoverContainer = styled.div`
  background: var(--white);
  width: 300px;
  height: 118px;
  padding: 3px 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: var(--thin-border) ${rgba(cssVar(`--border-color`), 0.5)};
`;
const TextStyle = styled.section`
  font-weight: var(--font-weight-medium);
  color: var(--primary-color-1);
`;


