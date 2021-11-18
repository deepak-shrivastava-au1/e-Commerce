import React, { useState, Fragment, useEffect } from "react";
import Drawer from "@material-ui/core/Drawer";
import styled from "styled-components";
import { Close } from "@icons";
import Button from "@common/Button";
import Input from "@common/Input";
import TextArea from "@common/TextArea";
import { useTranslation } from "react-i18next";
import { cssVar } from "polished";
import { useDispatch } from "react-redux";
import {
  SendMailEnquiry,
  orderhistorydetailactions
} from "@slices/Enquiry/Order/orderHistoryDetail";
import { useGetLoggedInUserInfo } from "@hooks";
import { respondTo } from "@utilities/styled-components";

const DrawerContent = styled.div`
  width: 513px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  ${respondTo.xs`
     width: calc(100vw - 0px);
    `}
  ${respondTo.sm`
     width: calc(100vw - 0px);
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
  status: boolean;
  email?: string;
  subject?: string;
  details?: string;
  address1?: string;

}

function SendEnquiry(props: Props) {
  const { t, i18n } = useTranslation();
   const { status } = props;

  const [inputData, setInputData] = useState<any>({
    email : props.email,
    subject: props.subject,
    details: props.details
  });
  const dispatch = useDispatch();
  const [enquiryDrawer, setEnquiryDrawer] = useState<boolean>(false);
  const sessionId = useGetLoggedInUserInfo()?.sessionId;
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setEnquiryDrawer(open);
    };

  useEffect(() => {
    setEnquiryDrawer(status);
  }, [status]);

  return (
    <>
      <Drawer
        anchor={"right"}
        open={enquiryDrawer}
        onClose={toggleDrawer(false)}
      >
        <DrawerContent>
          <div className="header">
            <p className="title">Send Enquiry</p>
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
                  labelText={t("CON_SUBJECT")}
                  value={inputData?.subject}
                  onChange={(value) => {
                    setInputData((prevState: any) => {
                      return {
                        ...prevState,
                        subject: value,
                      };
                    });
                  }}
                />
              </div>
              <div>
                <TextArea
                
                  labelText="Details"
                  value={inputData?.details}
                  onChange={(value) => {
                    setInputData((prevState: any) => {
                      return {
                        ...prevState,
                        details: value,
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
                   onClick={()=>{
                     dispatch(orderhistorydetailactions.intitalizeLoader())
                     dispatch(SendMailEnquiry(sessionId,[{"mailFrom": inputData.email, "body": inputData.details , "subject" : inputData.subject }]))
                     setEnquiryDrawer(false);
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

export default SendEnquiry;
