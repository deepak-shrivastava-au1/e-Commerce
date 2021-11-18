import React from 'react'
import clsx from 'clsx'

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  showLabel?:boolean,
  labelText?:string,
  onChange?:(value:any)=>void,
  validationErrorText?: string,
  isInvalid?: boolean
}

function TextArea(props: Props) {
  const { showLabel=true,labelText, onChange, isInvalid=false , validationErrorText, ...rest } = props

  const handleChange = (e:React.FormEvent<HTMLTextAreaElement>) =>{
    return onChange ? onChange(e.currentTarget.value): null;
  }

  return (
    <>
      {showLabel && <label className="label-text"> {labelText}</label>}
      <div className="form-group">
        <textarea 
        className={clsx(
          `form-control`,
          {
            [`is-invalid`]: isInvalid
          }
        )} onChange={handleChange} rows={5} {...rest}></textarea>
        {isInvalid ? <div className="invalid-feedback">{validationErrorText}</div> : null}
      </div>
    </>
  )
}

export default TextArea
