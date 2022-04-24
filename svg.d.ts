declare function SVG({} :{
  width?: string | number,
  height?: string | number,
  viewBox?: string,
  [key: string]: any
}): SVGElement

declare module "*.svg" {
  export default SVG;
}