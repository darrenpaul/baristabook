import * as React from "react";
import Svg, { SvgProps, Path, Circle } from "react-native-svg";

const SvgComponent = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 64 64" {...props}>
    <Path fill="#fff" d="M6 37v24h52V24L32 2 6 23z" />
    <Path d="m32 2-3.07 2.48L52 24v37h6V24z" opacity={0.1} />
    <Path fill="#f78c8c" d="M26 34h12a4 4 0 0 1 4 4v24H22V38a4 4 0 0 1 4-4z" />
    <Path d="M38 34h-6a4 4 0 0 1 4 4v24h6V38a4 4 0 0 0-4-4z" opacity={0.1} />
    <Circle cx={30} cy={48} r={2} fill="#fff" />
    <Path
      fill="#1b1464"
      d="M63.28 24.46 53 15.9V9a2 2 0 0 0-4 0v3.56L35.84 1.6a6 6 0 0 0-7.68 0L.72 24.46a2 2 0 0 0 2.56 3.08L30.72 4.67a2 2 0 0 1 2.56 0L56 23.6V58a2 2 0 0 1-2 2H44V38a6 6 0 0 0-6-6H26a6 6 0 0 0-6 6v22H10a2 2 0 0 1-2-2V34a2 2 0 0 0-4 0v24a6 6 0 0 0 6 6h44a6 6 0 0 0 6-6V26.94l.72.6A2 2 0 0 0 62 28a2 2 0 0 0 1.28-3.54zM24 60V38a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v22z"
    />
  </Svg>
);
export default SvgComponent;
