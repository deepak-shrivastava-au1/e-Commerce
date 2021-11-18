interface Iprops{
  [key:string]: string,
  xs:string,
  sm: string,
  md: string,
  lg: string,
  xl:string
}

export const breakpoints:Iprops = {
  xs: '300px',
  sm: '768px',
  md: '992px',
  lg: '1200px',
  xl:'1500px'
};