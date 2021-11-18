import React from "react"
import styled from 'styled-components';
import clsx from 'clsx'


const StyledInputWrapper = styled.div`
    display: flex;
    flex-direction:column;

    >:not(:last-child){
      margin-bottom: 5px;
    }
`

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  showLabel?: boolean,
  labelText?: string,
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"],
  ref?: React.ClassAttributes<HTMLInputElement>["ref"],
  onChange?: (id: any) => void,
  validationErrorText?: string,
  isInvalid?: boolean
}

const StyledInput = ({ showLabel = false, labelText, onChange, id, validationErrorText, isInvalid = false, ...rest }: IProps) => {

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    return onChange ? onChange(e) : null;
  }

  return (
    <StyledInputWrapper>
      {showLabel && <span className="label-text"> {labelText}</span>}
      <div className="form-group">
        <input className={clsx(
          `form-control`,
          {
            [`is-invalid`]: isInvalid
          }
        )}
          onChange={handleOnChange}
          type="text"
          id={id}
          {...rest}
        />
        {isInvalid ? <div className="invalid-feedback">{validationErrorText}</div> : null}
      </div>
    </StyledInputWrapper>
  );
}

export default StyledInput;




