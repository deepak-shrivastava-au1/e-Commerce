// import styled, { css } from 'styled-components';
import checkBox from "../../assets/icons/check_mark.svg"

interface ICheckBox extends React.InputHTMLAttributes<HTMLInputElement>{
  labelText?:string,
  showLabel?:boolean
}

function Checkbox({ labelText, showLabel = true, ...rest }: ICheckBox) {
  return (
    <>
      <div className="checkbox">
        <label>
          <input type="checkbox" {...rest} />
          <span className="cr">
            <span className="cr-icon">
              <img src={checkBox} />
            </span>
          </span>
          {showLabel &&
            <div className="label-text">
              {labelText}
            </div>}
        </label>
      </div>
    </>
  );
}

export default Checkbox;




