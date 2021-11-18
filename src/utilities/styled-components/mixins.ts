import { css } from 'styled-components';
import { breakpoints } from '@constants/styled-components';


type cssParams = Parameters<typeof css>;

const keys = Object.keys(breakpoints) as Array<keyof typeof breakpoints>

export const respondTo = keys.reduce(
  (accumulator, label) => {
    accumulator[label] = (...args: cssParams) => css`
      @media (min-width: ${breakpoints[label]}) {
        ${css(...args)}
      }
    `;
    return accumulator;
  },
  {} as Record<keyof typeof breakpoints, Function>
);

export const alignCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`