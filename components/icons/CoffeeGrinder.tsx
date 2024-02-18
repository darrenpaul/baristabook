import * as React from "react";
import Svg, { SvgProps, Path, Circle, Rect, G } from "react-native-svg";

type Props = {
  width?: number | string;
  height?: number | string;
};

const SvgComponent = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    data-name="Layer 1"
    viewBox="0 0 64 64"
    {...props}
  >
    <Path fill="#b3b3b3" d="M33 37v23a3 3 0 0 1-3 3H12a3 3 0 0 1-3-3V37z" />
    <Path fill="#775854" d="M9 18h24v19H9z" />
    <Path fill="#b3b3b3" d="M33 18H9a5 5 0 0 1 5-5h14a5 5 0 0 1 5 5z" />
    <Path fill="#999" d="M17 8h8v5h-8z" />
    <Path fill="#826a6a" d="m59 5-3 8h-6l-3-8z" />
    <Path fill="#775854" d="M47 1h12v4H47z" />
    <Circle cx={13.5} cy={22.5} r={1.5} fill="#826a6a" />
    <Circle cx={13} cy={27} r={1} fill="#826a6a" />
    <Circle cx={13} cy={42} r={1} fill="#ccc" />
    <Circle cx={18} cy={22} r={1} fill="#826a6a" />
    <Rect width={2} height={9} x={12} y={45} fill="#ccc" rx={1} />
    <G fill="#252525">
      <Path d="M60 5.182V1a1 1 0 0 0-1-1H47a1 1 0 0 0-1 1v4.182L48.557 12h-5.321l-10-5H17a1 1 0 0 0-1 1v4h-2a6 6 0 0 0-6 6v42a4 4 0 0 0 4 4h18a4 4 0 0 0 4-4V18a6 6 0 0 0-6-6h-2V9h6.764l10 5H59a1 1 0 0 0 0-2h-1.557zM18 9h6v3h-6zm12 53H12a2 2 0 0 1-2-2V38h22v22a2 2 0 0 1-2 2zm1.858-45H19a1 1 0 0 0 0 2h13v17H10V19h4a1 1 0 0 0 0-2h-3.858A4 4 0 0 1 14 14h14a4 4 0 0 1 3.858 3zm18.835-5L48 4.819V2h10v2h-6a1 1 0 0 0 0 2h5.557l-2.25 6z" />
      <Circle cx={27.5} cy={31.5} r={1.5} />
      <Circle cx={27.5} cy={26.5} r={1.5} />
      <Circle cx={22.5} cy={31.5} r={1.5} />
    </G>
  </Svg>
);
export default SvgComponent;
