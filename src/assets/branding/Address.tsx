import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { PhoneIcon, EmailIcon } from "@icons";

function Address() {
  const { t } = useTranslation();
  return (
   <div></div>
  );
}

const BoldText = styled.text`
  font-weight: var(--font-weight-bold);
`;

const MediumText = styled.text`
  font-weight: var(--font-weight-medium);
`;
const TextStyleLight = styled.section`
  font-weight: var(--font-weight-normal);
  color: var(--primary-color-3);
`;

export default Address;
