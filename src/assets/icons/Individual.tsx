import * as React from "react";

function Individual(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fill="none" d="M20 21.5V19.5C20 18.4391 19.5786 17.4217 18.8284 16.6716C18.0783 15.9214 17.0609 15.5 16 15.5H8C6.93913 15.5 5.92172 15.9214 5.17157 16.6716C4.42143 17.4217 4 18.4391 4 19.5V21.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path fill="none" d="M12 11.5C14.2091 11.5 16 9.70914 16 7.5C16 5.29086 14.2091 3.5 12 3.5C9.79086 3.5 8 5.29086 8 7.5C8 9.70914 9.79086 11.5 12 11.5Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const MemoIndividual = React.memo(Individual);
export default MemoIndividual;