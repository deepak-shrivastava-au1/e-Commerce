import { StringDecoder } from "node:string_decoder";
import React, { useState, Fragment } from "react";
import { CloseSVG } from "@icons";

import { useTranslation } from "react-i18next";
import Menu from "../../Catalog/Menu/Menu";

const UserMessage: React.FC<{ userText: any; removeUserMessage: any }> = (
  props
) => {
  const { t, i18n } = useTranslation();

  return (
    <Fragment>
      <div className='user-message'>
        <a>{props.userText}</a>
        <CloseSVG
          onClick={() => props.removeUserMessage(false)}
          className='primary-icon-2 user-message-close mobile-hide'
        />
      </div>
    </Fragment>
  );
};

export default UserMessage;
