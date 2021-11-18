import React from 'react'

interface Props { }

function SwitchOne(props: any) {
  const { labelText,showLabel=true,...rest } = props

  return (
    <>
      <div className="cust-switch-1" >
        <div className="custom-control custom-switch">
          <input type="checkbox" className="custom-control-input" id="customSwitch1" {...rest}/>
          {showLabel && <label className="custom-control-label" htmlFor="customSwitch1">{labelText}</label>}
        </div>
      </div >
    </>
  )
}

export default SwitchOne
