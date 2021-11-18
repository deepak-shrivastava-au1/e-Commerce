import React, { useState } from 'react';
import Filter from '../../fragments/Filter';
import RangeSlider from '../../fragments/RangeSlider';
import { Collapse } from '@material-ui/core';
import { ArrowDownSVG, ArrowUpSVG } from '../../../assets/icons';
import styled from "styled-components"

const SideBarFilterWrapper=styled.aside`
  padding-left: 0;
  padding-right: 23px;
`

const MIN = 0;
const MAX = 2000;
const STEP = 500;

interface Iprops  {
  setshowFilter?:any;
  showFilter?:boolean;
  catalogDetails:any;
  catId?:any;
  filterData:any,
  mobileHideFilter?:any
  onFilterChange : Function;
}
const SidebarFilter = ({ filterData,mobileHideFilter, ...props }:Iprops) => {
  const [defaultValues, setDefaultValues] = useState([500, 1500]);

  const [open, setOpen] = useState({
    price: true,
  });

  const handleClick = (value:any) => {
    setOpen((prevState:any) => {
      return {
        ...prevState,
        [value]: !prevState[value],
      };
    });
  };

  return (
    <SideBarFilterWrapper
    style={{marginTop:`${props.showFilter?"60px":""}`}} 
      className='col-md-12'
    >
      <div className='card'>
        <Filter
          setshowFilter={props.setshowFilter}
          catalogDetails={props.catalogDetails}
          catId={props.catId}
          onFilterChange = {props.onFilterChange}
          mobileHideFilter = {mobileHideFilter} 
          filterData={filterData} 
        />
        {/* <article className='filter-group'>
          <header className='card-header' onClick={() => handleClick('price')}>
            <a
              data-toggle='collapse'
              data-target='#collapse_3'
              aria-expanded='true'
              onClick={() => void 0}
              className='d-flex justify-content-between align-items-center'
            >
              <h6 className='title'>Price Range </h6>

              {!open['price'] ? (
                <ArrowDownSVG
                className="primary-icon-1 icon-md"
                  style={{ cursor: 'pointer' }}
                />
              ) : (
                <ArrowUpSVG
                className="primary-icon-1 icon-md"
                  style={{ cursor: 'pointer' }}
                />
              )}
            </a>
          </header>
          <Collapse in={open['price']} timeout='auto' unmountOnExit>
            <div className='filter-content collapse show' id='collapse_3'>
              <div className='card-body'>
                <RangeSlider
                  rtl={false}
                  min={MIN}
                  max={MAX}
                  step={STEP}
                  values={defaultValues}
                  setValues={setDefaultValues}
                />

                <div className='form-row'>
                  <div className='d-flex align-items-center w-100'>
                    <select
                      className='custom-select custom-select-sm flex-grow-1'
                      id='min'
                      onChange={(e:any) =>
                        setDefaultValues((prevState:any) => {
                          const copiedValues = [...prevState];

                          const currentValue = e.target.value.match(/\d+/);

                          copiedValues[0] = currentValue;

                          return copiedValues;
                        })
                      }
                      value={defaultValues[0]}
                    >
                      <option value='100'>$100</option>
                      <option value='500'>$500</option>
                      <option value='1000'>$1000</option>
                      <option value='1500'>$1500</option>
                      <option value='2000'>$2000</option>
                    </select>

                    <span className='ml-2 mr-2'> to </span>

                    <select
                      className='custom-select custom-select-sm flex-grow-1'
                      id='max'
                      onChange={(e:any) =>
                        setDefaultValues((prevState:any) => {
                          const copiedValues = [...prevState];

                          const currentValue = e.target.value.match(/\d+/);

                          copiedValues[1] = currentValue;

                          return copiedValues;
                        })
                      }
                      value={defaultValues[1]}
                    >
                      <option value='500'>$500</option>
                      <option value='1000'>$1000</option>
                      <option value='1500'>$1500</option>
                      <option value='2000'>$2000</option>
                      <option value='2000+'>$2000+</option>
                    </select>
                  </div>
                </div>
                <button className='btn btn-block btn-primary mt-3'>
                  Apply
                </button>
              </div>
            </div>
          </Collapse>
        </article> */}
      </div>
    </SideBarFilterWrapper>
  );
};

export default SidebarFilter;
