import React from 'react';
import { Range, getTrackBackground } from 'react-range';
import { cssVar } from "polished"

/**
  @param {boolean} rtl enable rtl support
  @param {number} values array of min and max ranged values
  @param {number} setValues updater function to update min and max values 
 */

const RangeSlider = ({ rtl, values, setValues, min, max, step }:any) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}
    >
      <Range
        values={values}
        step={step}
        min={min}
        max={max}
        rtl={rtl}
        onChange={(values) => {
          setValues(values);
        }}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: '36px',
              display: 'flex',
              width: '100%',
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: '3px',
                width: '100%',
                borderRadius: '4px',
                background: getTrackBackground({
                  values,
                  colors: [`${cssVar('--primary-color-4')}`, `${cssVar('--primary-color-1')}`,`${cssVar('--primary-color-4')}`],
                  min: min,
                  max: max,
                  rtl,
                }),
                alignSelf: 'center',
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, isDragged }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '20px',
              width: '20px',
              border: `${cssVar('--thicker-border')} ${cssVar('--primary-color-4')}`,
              borderRadius: '100%',
              backgroundColor: `${cssVar('--white')}`,
            }}
          ></div>
        )}
      />
    </div>
  );
};

export default RangeSlider;
