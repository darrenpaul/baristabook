import * as React from "react";
import Svg, { SvgProps, Path, G } from "react-native-svg";

const SvgComponent = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 64 64" {...props}>
    <Path fill="#ce93d8" d="M11 2h35a3 3 0 0 1 3 3v25H8V5a3 3 0 0 1 3-3z" />
    <G fill="#fff">
      <Path d="M46 10H30a3 3 0 0 0-3 3v17h31v-8z" />
      <Path d="M46 19a3 3 0 0 0 3 3h9L46 10zM19 30v-5a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v34a3 3 0 0 0 3 3h54a3 3 0 0 0 3-3V33a3 3 0 0 0-3-3z" />
    </G>
    <Path
      d="M49 52H37a2 2 0 0 0 0 4h12a2 2 0 0 0 0-4zM29 52a2 2 0 0 0 0 4 2 2 0 0 0 0-4z"
      opacity={0.1}
    />
    <Path
      d="M58 28.1V22a2.094 2.094 0 0 0-.59-1.42L49 12.17V5a3.002 3.002 0 0 0-3-3H11a2.996 2.996 0 0 0-3 3 1.003 1.003 0 0 1 1-1h35a1.003 1.003 0 0 1 1 1v3.27A2.2 2.2 0 0 0 44 8H28a5.002 5.002 0 0 0-5 5v15h-4v-3a5.002 5.002 0 0 0-5-5H8v2H5a2.996 2.996 0 0 0-3 3 1.003 1.003 0 0 1 1-1h11a1.003 1.003 0 0 1 1 1v5a2.006 2.006 0 0 0 2 2h40a1.003 1.003 0 0 1 1 1v26a1.003 1.003 0 0 1-1 1H3a1.003 1.003 0 0 1-1-1 2.996 2.996 0 0 0 3 3h54a3.002 3.002 0 0 0 3-3V33a5.017 5.017 0 0 0-4-4.9zM46 14.83 51.17 20c-6.22-.1-5.063 1.03-5.17-5.17zM54 28H27V13a1.003 1.003 0 0 1 1-1h14v7a5.002 5.002 0 0 0 5 5h7z"
      opacity={0.1}
    />
    <Path
      fill="#4d4d4d"
      d="M51 52H39a2 2 0 0 0 0 4h12a2 2 0 0 0 0-4zM31 52a2 2 0 0 0 0 4 2 2 0 0 0 0-4z"
    />
    <Path
      fill="#4d4d4d"
      d="M60 28.101V22a2.072 2.072 0 0 0-.587-1.415L51 12.172V5a5.006 5.006 0 0 0-5-5H11a5.006 5.006 0 0 0-5 5v15a5.165 5.165 0 0 0-6 5v34a5.006 5.006 0 0 0 5 5h54a5.006 5.006 0 0 0 5-5V33a5.008 5.008 0 0 0-4-4.899zM49 24h7v4H29V13a1.001 1.001 0 0 1 1-1h14v7a5.006 5.006 0 0 0 5 5zm0-4a1.001 1.001 0 0 1-1-1v-4.171L53.172 20zM10 5a1.001 1.001 0 0 1 1-1h35a1.001 1.001 0 0 1 1 1v3.268A2.225 2.225 0 0 0 46 8H30a5.006 5.006 0 0 0-5 5v15h-4v-3a5.006 5.006 0 0 0-5-5h-6zm50 54a1.001 1.001 0 0 1-1 1H5a1.001 1.001 0 0 1-1-1V25a1.001 1.001 0 0 1 1-1h11a1.001 1.001 0 0 1 1 1v5a2 2 0 0 0 2 2h40a1.001 1.001 0 0 1 1 1z"
    />
  </Svg>
);
export default SvgComponent;
