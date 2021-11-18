import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { useTranslation } from "react-i18next";

const QuantityWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const SpinnerWrapper = styled.div`
  display: flex;

  .minus,
  .plus {
    display: flex;
    justify-content: center;
    align-items: center;
    border: var(--thin-border) var(--gray-4);
    border-radius: var(--border-radius);
    cursor: pointer;
    width: 32px;
    height: 32px;
    padding:20px;
    .MuiSvgIcon-root{
      stroke: none;
      fill: var(--primary-icon-2);
  }
  }

  > :not(:last-child) {
    margin-right: 5px;
  }

  /* To Hide built in spinner for input type 'number' */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
      display: none;
      -webkit-appearance: none;
      margin: 0;
  }

  input[type=number] {
      -moz-appearance:textfield;
  }
`;
const LabelBold = styled.label`
  font-weight: var(--font-weight-medium);
`;

const InputBox = styled.input`
${({ isInvalid }:{ isInvalid:boolean })=> css`
  display: inline;
  border-top:0;
  border-left:0;
  border-right: 0;
  width: 45px;
  border-bottom: var(--thin-border) gray;
  padding-left: 18px;
  padding-right: 0px;
  border-color: ${isInvalid ? 'var(--red)' : 'none'};
`
}
`
interface Iprops extends React.HTMLAttributes<HTMLDivElement> {
  showLabel?: boolean
  quantity?: number
  onChange?: any
  labelBold?: boolean
  isInvalid?:boolean
}

const Quantity = ({
  showLabel = true,
  quantity = 0,
  onChange,
  isInvalid= false,
  ...props
}: Iprops) => {
  const [newQuantity, setNewQuantity] = useState(quantity);

  const { t } = useTranslation();

  const ref = useRef(false);

  // Add Item Quantity Handler
  const reduceQuantity = () => {
    setNewQuantity((prevQuantity) => (prevQuantity > 0 ? --prevQuantity : 0));
  };

  // Remove Item Quantity Handler
  const addQuantity = () => {
    setNewQuantity((prevQuantity) => ++prevQuantity);
  };

  useEffect(() => {
    setNewQuantity(quantity);
  }, [quantity]);

  useEffect(() => {
    if (!ref.current) {
      ref.current = true;
      return;
    }
    onChange(newQuantity);
  }, [newQuantity]);

  return (
    <QuantityWrapper {...props}>
      {showLabel && (
        <>
          {props.labelBold ? (
            <LabelBold className="">{t("CON_QUANTITY")}</LabelBold>
          ) : (
            <label className="">{t("CON_QUANTITY")}</label>
          )}
        </>
      )}
      <SpinnerWrapper className="mt-2">
        <div onClick={reduceQuantity} className="plus">
          <RemoveIcon className="primary-icon-2"/>
        </div>
        <InputBox
          className="quantityValue"
          value={newQuantity}
          type="number"
          isInvalid={isInvalid}
          onChange={(e: any) => {
            setNewQuantity(e.target.value);
          }}
        />
        <div onClick={addQuantity} className="minus">
          <AddIcon className="primary-icon-2" />
        </div>
      </SpinnerWrapper>
    </QuantityWrapper>
  );
};

export default Quantity;
