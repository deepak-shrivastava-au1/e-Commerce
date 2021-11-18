import React from 'react'
import radioSelectedImg from "../../assets/icons/radio_selected.svg"

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText?:string, 
  showLabel?:boolean,
  checked?:boolean
}

function Radio(props: Props) {
  const { labelText, showLabel = true, checked, ...rest } = props

  return (
    <>
      <div className="radio">
        <label>
          <input type="radio" name="radio1"  checked={checked} {...rest} />
          <span className="cr">
            <span className="cr-icon">
              <img src={radioSelectedImg} alt =''/>
            </span>
          </span>
          {showLabel &&
          <div style={{marginTop :"-28px"}} className="label-text">
            {labelText}
          </div>}
        </label>
      </div>

    </>
  )
}


export default Radio
