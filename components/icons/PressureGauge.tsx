import * as React from "react";
import Svg, { SvgProps, G, Circle, Path } from "react-native-svg";

type Props = {
  width?: number | string;
  height?: number | string;
};

const SvgComponent = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 60 60" {...props}>
    <G fill="none" fillRule="nonzero">
      <G transform="translate(1 1)">
        <Circle cx={29} cy={29} r={29} fill="#607d8b" />
        <Path
          fill="#37474f"
          d="M29 0c-.503 0-1.003.013-1.5.038C42.92.828 55.016 13.561 55.016 29S42.919 57.172 27.5 57.962c.497.025.997.038 1.5.038 16.016 0 29-12.984 29-29S45.016 0 29 0z"
        />
        <Circle cx={29} cy={29} r={24} fill="#00bcd4" />
        <Path
          fill="#00838f"
          d="M29 5c-.5 0-1 .021-1.5.052 12.658.776 22.526 11.268 22.526 23.95S40.158 52.176 27.5 52.952c.5.031 1 .052 1.5.052 13.256 0 24.002-10.746 24.002-24.002S42.256 5 29 5z"
        />
        <Path
          fill="#f44335"
          d="m16.28 41.72-3.93 3.93-.31.31A23.888 23.888 0 0 1 5 29h6a17.944 17.944 0 0 0 5.28 12.72z"
        />
        <Path
          fill="#ff5722"
          d="M16.28 16.28A17.944 17.944 0 0 0 11 29H5a23.888 23.888 0 0 1 7.04-16.96l.3.3z"
        />
        <Path
          fill="#ff9801"
          d="M29 5v6a17.944 17.944 0 0 0-12.72 5.28l-3.94-3.94-.3-.3A23.888 23.888 0 0 1 29 5z"
        />
        <Path
          fill="#ffdc00"
          d="m45.96 12.04-.51.51-3.73 3.73A17.944 17.944 0 0 0 29 11V5a23.888 23.888 0 0 1 16.96 7.04z"
        />
        <Path
          fill="#fec108"
          d="M29 5v.194a23.9 23.9 0 0 1 13.96 6.846l-.51.51-2.328 2.328c.56.435 1.094.903 1.6 1.4l3.73-3.73.51-.51A23.888 23.888 0 0 0 29 5z"
        />
        <Path
          fill="#ffeb3a"
          d="M53 29h-6a17.944 17.944 0 0 0-5.28-12.72l3.73-3.73.51-.51A23.888 23.888 0 0 1 53 29z"
        />
        <Path
          fill="#fdd834"
          d="m45.96 12.04-.51.51-1.057 1.057A23.861 23.861 0 0 1 50 29h3a23.888 23.888 0 0 0-7.04-16.96z"
        />
        <Path
          fill="#a4c400"
          d="M53 29a23.865 23.865 0 0 1-7.04 16.95l-.27-.26-3.97-3.97A17.944 17.944 0 0 0 47 29z"
        />
        <Path
          fill="#90ac00"
          d="M50 29a23.837 23.837 0 0 1-5.611 15.389l1.3 1.3.27.26A23.865 23.865 0 0 0 53 29z"
        />
        <Path
          fill="#ef314c"
          d="M34.84 17.05 32.7 27.48h-.01a3.971 3.971 0 0 0-5.26-2.15v-.01l5.78-8.94a.9.9 0 0 1 1.63.67z"
        />
        <Path
          fill="#bb193b"
          d="m33.21 16.38-1.8 2.793-1.232 6a3.973 3.973 0 0 1 2.517 2.3h.01l2.14-10.43a.9.9 0 0 0-1.635-.663z"
        />
        <Path
          fill="#f5f5f5"
          d="M33 29a4 4 0 1 1-5.57-3.67 3.971 3.971 0 0 1 5.26 2.15c.205.48.31.998.31 1.52z"
        />
        <Path
          fill="#cfd8dc"
          d="M32.69 27.48A3.971 3.971 0 0 0 29 25a3.9 3.9 0 0 0-1.493.3 3.962 3.962 0 0 1 2.183 2.18c.205.48.31.998.31 1.52a4 4 0 0 1-2.5 3.7A3.992 3.992 0 0 0 33 29c0-.522-.105-1.04-.31-1.52z"
        />
      </G>
      <G fill="#000">
        <Path d="M30 60c16.569 0 30-13.431 30-30S46.569 0 30 0 0 13.431 0 30c.019 16.56 13.44 29.981 30 30zm0-58c15.464 0 28 12.536 28 28S45.464 58 30 58 2 45.464 2 30C2.018 14.543 14.543 2.018 30 2z" />
        <Path d="M30 55c13.807 0 25-11.193 25-25S43.807 5 30 5 5 16.193 5 30c.015 13.8 11.2 24.985 25 25zM11.049 31A18.809 18.809 0 0 0 15.9 42.686l-2.846 2.846A22.913 22.913 0 0 1 7.025 31zm3.419 15.946 6.34-6.34a1 1 0 0 0-1.414-1.414l-2.08 2.08A16.829 16.829 0 0 1 13.049 31H16a1 1 0 0 0 0-2h-2.949a16.9 16.9 0 0 1 4.26-10.275l2.083 2.083a1 1 0 0 0 1.414-1.414l-2.083-2.083A16.9 16.9 0 0 1 29 13.051V16a1 1 0 0 0 2 0v-2.949a16.9 16.9 0 0 1 10.275 4.26l-2.083 2.083a1 1 0 1 0 1.414 1.414l2.083-2.083A16.9 16.9 0 0 1 46.949 29H44a1 1 0 0 0 0 2h2.951a16.829 16.829 0 0 1-4.265 10.272l-2.08-2.08a1 1 0 0 0-1.414 1.414l6.34 6.34c-8.781 8.072-22.283 8.072-31.064 0zM42.688 15.9A18.892 18.892 0 0 0 31 11.051V7.025a22.913 22.913 0 0 1 14.532 6.029zM29 11.051A18.892 18.892 0 0 0 17.312 15.9l-2.844-2.844A22.913 22.913 0 0 1 29 7.025zM52.975 31a22.913 22.913 0 0 1-6.029 14.532L44.1 42.686A18.809 18.809 0 0 0 48.951 31zm0-2h-4.026A18.892 18.892 0 0 0 44.1 17.312l2.844-2.844A22.913 22.913 0 0 1 52.975 29zM13.054 14.468l2.846 2.844A18.892 18.892 0 0 0 11.051 29H7.025a22.913 22.913 0 0 1 6.029-14.532z" />
        <Path d="M35.676 16.118a1.87 1.87 0 0 0-2.308.722l-5.654 8.739A4.99 4.99 0 1 0 35 30a4.9 4.9 0 0 0-.272-1.552l2.088-10.195a1.87 1.87 0 0 0-1.14-2.135zM30 33a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm3.157-6.845a4.947 4.947 0 0 0-2.715-1.11l4.3-6.653z" />
        <Path d="M30.378 29.074a1 1 0 1 0-.758 1.85 1 1 0 0 0 .758-1.85z" />
      </G>
    </G>
  </Svg>
);
export default SvgComponent;
