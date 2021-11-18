import React from 'react'

interface Props { }

function SwitchTwo(props: any) {
  const { labelText,showLabel=true,...rest } = props

  return (
    <>
      <div className="cust-switch-2" >
        <div className="custom-control custom-switch">
          <input type="checkbox" className="custom-control-input" id="customSwitch2" {...rest} />
          {showLabel && <label className="custom-control-label" htmlFor="customSwitch2">{labelText}</label>}
        </div>
      </div >
    </>
  )
}

export default SwitchTwo
