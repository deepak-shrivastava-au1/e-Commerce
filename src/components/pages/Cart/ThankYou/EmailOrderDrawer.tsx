import React, { useState, Fragment, useEffect, useContext } from "react";
import Drawer from "@material-ui/core/Drawer";
import styled from "styled-components";
import { Close } from "@icons";
import Button from "@common/Button";
import Input from "@common/Input";
import TextArea from "@common/TextArea";
import { useTranslation } from "react-i18next";
import { cssVar } from "polished";
import { useDispatch, useSelector } from "react-redux";
import {
  emailOrderDetailsSelector,
  fetchEmailOrderDetails, initializeEmailOrderDetailsLoader
} from "@slices/cart/getEmailOrderDetails";

import { useGetLoggedInUserInfo } from "@hooks";
import { respondTo } from "@utilities/styled-components";
import { WebSettingsContext } from "@providers/WebsettingsProvider";
import { IuserWebSettings } from "@constants/interfaces/userWebSettings";

const DrawerContent = styled.div`
  width: 513px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  ${respondTo.xs`
     width: calc(100vw - 20px);
    `}
  ${respondTo.sm`
     width: calc(100vw - 20px);
    `}
      ${respondTo.md`
      width: 513px;
    `}
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 25px;
    border-bottom: var(--thin-border) var(--border-color);

    .title {
      font-size: calc(var(--base-font-size) + 4px);
      font-weight: var(--font-weight-medium);
    }
  }
`;

const DrawerCaption = styled.figcaption`
  padding: 20px 20px;
`;

interface Props {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  orderNumber:string|number
}

function EmailOrderDrawer(props: Props) {

  const { isOpen, setIsOpen, orderNumber } = props;

  const webSettings: IuserWebSettings | null = useContext(WebSettingsContext);

  const { t } = useTranslation();

  const [inputData, setInputData] = useState<{
    email: string
    orderId: string|number
    message: string
  }>({
    email: "",
    orderId: orderNumber,
    message: ""
  });

  const dispatch = useDispatch()

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setIsOpen(open);
    };

  return (
    <>
      <Drawer
        anchor={"right"}
        open={isOpen}
        onClose={toggleDrawer(false)}
      >
        <DrawerContent>
          <div className="header">
            <p className="title">{t('CON_EMAIL_ORDER_DETAILS')}</p>
            <Close
              width="12px"
              height="12px"
              onClick={toggleDrawer(false)}
              className="primary-icon-3 icon-md"
            />
          </div>
          <div>
            <DrawerCaption>
              <div>
                <Input
                  type="text"
                  showLabel={true}
                  labelText="Email"
                  value={inputData?.email}
                  onChange={(value) => {
                    setInputData((prevState: any) => {
                      return {
                        ...prevState,
                        email: value,
                      };
                    });
                  }}
                />
              </div>
              <div>
                <Input
                  type="text"
                  showLabel={true}
                  labelText={'Order Id'}
                  value={inputData.orderId}
                  onChange={(value) => {
                    setInputData((prevState: any) => {
                      return {
                        ...prevState,
                        orderId: value,
                      };
                    });
                  }}
                />
              </div>
              <div>
                <TextArea
                  labelText={t('CON_MESSAGE')}
                  value={inputData.message}
                  onChange={(value) => {
                    setInputData((prevState: any) => {
                      return {
                        ...prevState,
                        message: value,
                      };
                    });
                  }}
                />
              </div>

              <div
                style={{
                  justifyContent: "space-between",
                  marginTop: "24px",
                }}
                className="row"
              >

                <Button
                  variant="solid"
                  style={{ width: "45%", marginTop: "8px" }}
                  onClick={() => {
                    dispatch(initializeEmailOrderDetailsLoader())
                    dispatch(fetchEmailOrderDetails([
                      {
                        "mailFrom": webSettings?.userEmail,
                        "mailTo":inputData.email,
                        "body": inputData.message,
                        "orderNumber": orderNumber
                      }
                    ]))
                    setIsOpen(false);
                  }}
                >
                  <span>{t("CON_SEND_EMAIL")}</span>
                </Button>
              </div>
            </DrawerCaption>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default EmailOrderDrawer;