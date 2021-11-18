import React from "react";
import styled from "styled-components";

const SelectProduct = styled.select`
  height: 45px;
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
  border: var(--thin-border) var(--gray-4);
  border-radius: var(--border-radius);
`;
const LabelBold = styled.label`
  font-weight: var(--font-weight-medium);
`;
type Option = {
  value: string | number;
  label: string;
};

interface Iprops extends React.SelectHTMLAttributes<HTMLSelectElement>
{
  showLabel?: boolean;
  options?: Option[];
  onChange?: (value: any) => void;
  labelText?: string;
  style?: React.HTMLAttributes<HTMLDivElement>["style"];
  labelBold?: boolean;
}

const Units = ({
  showLabel = true,
  options,
  onChange,
  labelText,
  ...props
}: Iprops) => {
  const handleOnChange = (e: React.FormEvent<HTMLSelectElement>) => {
    return onChange ? onChange(encodeURIComponent(e.currentTarget.value)) : null;
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 zero-left-padding">
          {showLabel && (
            <>
              {props.labelBold ? (
                <LabelBold>{labelText}</LabelBold>
              ) : (
                <label>{labelText}</label>
              )}
              <br />
            </>
          )}
          <SelectProduct className="mt-2 pt-0 pb-1" onChange={handleOnChange} {...props}>
            {options &&
              options.map((option: any, i: number) => (
                <option key={`${option.value} ${i}`} value={option.value} selected = {option.selected} >
                  {option.label}
                </option>
              ))}
          </SelectProduct>
        </div>
      </div>
    </div>
  );
};

export default Units;
