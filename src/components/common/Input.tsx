import React from "react"
import styled, { css } from 'styled-components';
import clsx from 'clsx'
import { breakpoints } from "@constants/styled-components";
import { useMediaQuery } from "@material-ui/core";
interface IwrapperProps {
  type: React.InputHTMLAttributes<HTMLInputElement>["type"]
}

const InputWrapper = styled.div`
    display: flex;
    flex-direction:column;
    width:100%;
    /* position:relative; */

    >:not(:last-child){
      margin-bottom: 5px;
    }
`
const OptionalText = styled.p`
  font-size:calc(var(--base-font-size) - 2px);
  color:var(--primary-color-4);
  position:absolute;
  right:0;
  top:25%;
  margin-right:-55px;
`

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  showLabel?: boolean,
  labelText?: string,
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"],
  ref?: React.ClassAttributes<HTMLInputElement>["ref"],
  onChange?: (value: any) => void,
  validationErrorText?: string,
  isInvalid?: boolean,
  optional?:boolean
}

const Input = ({ showLabel = false, labelText, onChange, id, optional, validationErrorText, isInvalid = false, ...rest }: IProps) => {

  const isMobile = useMediaQuery(`(max-width:${breakpoints.sm})`);

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    return onChange ? onChange(e.currentTarget.value) : null;
  }

  return (
    <InputWrapper>
      {showLabel && <span className="label-text"> {labelText}</span>}
      <div className="form-group relative">
        <input className={clsx(
          `form-control`,
          {
            [`is-invalid`]: isInvalid
          }
        )}
          onChange={handleOnChange}
          placeholder={optional ? 'optional' : ''}
          type="text"
          id={id}
          {...rest}
        />
        {isInvalid ? <div className="invalid-feedback">{validationErrorText}</div> : null}

        {optional && !isMobile ? <OptionalText className="optional">Optional</OptionalText> : null}
      </div>
    </InputWrapper>
  );
}

export default Input;




