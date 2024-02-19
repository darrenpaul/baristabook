import * as React from "react";
import Svg, { SvgProps, Path, Circle, G } from "react-native-svg";

const SvgComponent = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 64 64" {...props}>
    <Path fill="#fff" d="M11 62V7a5 5 0 0 1 5-5h35v55a5 5 0 0 1-5 5H11z" />
    <Path
      fill="#b4f78d"
      d="M59 7v6h-8V2h3a5 5 0 0 1 5 5zM44.578 43.22l-6.042.387.385-6.043L54.35 22.136a3.831 3.831 0 0 1 5.4.257 3.831 3.831 0 0 1 .257 5.4zM3 52h40v10H8a5 5 0 0 1-5-5z"
    />
    <Circle cx={19.005} cy={40} r={2} fill="#b4f78d" />
    <Path
      d="M25.005 18h14a2 2 0 0 0 0-4h-14a2 2 0 0 0 0 4zM25.005 26h14a2 2 0 0 0 0-4h-14a2 2 0 0 0 0 4zM38.005 32a2 2 0 0 0-2-2h-11a2 2 0 0 0 0 4h11a2 2 0 0 0 2-2zM25.005 38a2 2 0 0 0 0 4h7a2 2 0 0 0 0-4z"
      opacity={0.1}
    />
    <Path
      d="M60.98 24.94a4.2 4.2 0 0 0-1.23-2.55 3.833 3.833 0 0 0-5.4-.25L51 25.49V13h8V7a5.002 5.002 0 0 0-5-5H16a5.002 5.002 0 0 0-5 5v45H3v5a5.002 5.002 0 0 0 5 5h38a5.002 5.002 0 0 0 5-5V44.8a2 2 0 0 0-3.99.2v12a3.009 3.009 0 0 1-3 3h-1v-8a2.006 2.006 0 0 0-2-2h-30V7a3.002 3.002 0 0 1 3-3h33v20.66l-11.5 11.49a2.002 2.002 0 0 0-.58 1.29l-.39 6.04a2.013 2.013 0 0 0 2.13 2.12l6.04-.38a1.986 1.986 0 0 0 1.29-.59l7-7 8.43-8.42a5.348 5.348 0 0 0 1.55-4.27zM51.01 4h1a3.009 3.009 0 0 1 3 3v4h-4zm-12 50v6h-33a3.002 3.002 0 0 1-3-3v-3zM56.6 26.38 41.7 41.27l-3.02.2.19-3.03 14.9-14.89a2.042 2.042 0 0 1 2.83 2.83z"
      opacity={0.1}
    />
    <Path
      d="M19.005 16a2 2 0 0 0-4 0v5a2 2 0 0 0 4 0zM17.005 27a2 2 0 0 0-2 2v3a2 2 0 0 0 4 0v-3a2 2 0 0 0-2-2z"
      opacity={0.1}
    />
    <G fill="#4d4d4d">
      <Path d="M27.005 18h14a2 2 0 0 0 0-4h-14a2 2 0 0 0 0 4zM27.005 26h14a2 2 0 0 0 0-4h-14a2 2 0 0 0 0 4zM40.005 32a2 2 0 0 0-2-2h-11a2 2 0 0 0 0 4h11a2 2 0 0 0 2-2zM27.005 38a2 2 0 1 0 0 4h7a2 2 0 0 0 0-4z" />
      <Path d="M8.005 64h38a7.008 7.008 0 0 0 7-7V45a2 2 0 0 0-4 0v12a3.003 3.003 0 0 1-3 3h-1v-8a2 2 0 0 0-2-2h-30V7a3.003 3.003 0 0 1 3-3h33v20.657L37.513 36.15a2 2 0 0 0-.582 1.287l-.386 6.042a2.013 2.013 0 0 0 2.124 2.124l6.042-.386a2 2 0 0 0 1.287-.582l15.427-15.428a6.01 6.01 0 0 0-8.42-8.537V15h6a2 2 0 0 0 2-2V7a7.008 7.008 0 0 0-7-7h-38a7.008 7.008 0 0 0-7 7v43h-6a2 2 0 0 0-2 2v5a7.008 7.008 0 0 0 7 7zM58.34 23.808a1.832 1.832 0 0 1 .257 2.57L43.703 41.274l-3.021.193.193-3.022L55.769 23.55a1.848 1.848 0 0 1 2.57.258zM57.005 7v4h-4V4h1a3.003 3.003 0 0 1 3 3zm-52 47h36v6h-33a3.003 3.003 0 0 1-3-3z" />
      <Path d="M21.005 16a2 2 0 0 0-4 0v5a2 2 0 0 0 4 0zM21.005 29a2 2 0 0 0-4 0v3a2 2 0 0 0 4 0z" />
    </G>
  </Svg>
);
export default SvgComponent;
