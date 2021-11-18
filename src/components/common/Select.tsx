import React from "react";
import styled from "styled-components";

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;

  >:not(:last-child){
    margin-bottom: 5px;
  }
`

type Option={
  value:string|number,
  label:string
}

interface Iprops extends React.SelectHTMLAttributes<HTMLSelectElement>
{
  showLabel?:boolean,
  options?:Option[],
  onChange?:(value:any)=>void,
  labelText?:string,
  style?:React.HTMLAttributes<HTMLDivElement>["style"]
}

const Select = ({showLabel=true,options,onChange,labelText,...props}:Iprops) => {

  const handleOnChange=(e:React.FormEvent<HTMLSelectElement>)=>{
    return onChange ? onChange(e.currentTarget.value): null;
  }

  return (
        <SelectWrapper>
          { showLabel && <label className="label-text">{labelText}</label>
          }
          <select onChange={handleOnChange} {...props}>
            {
              options && options.map((option,i)=>(
                <option key={`${option.value} ${i}`} value={option.value}>{option.label}</option>
              ))
            }
          </select>
        </SelectWrapper>
  );
};

export default Select;