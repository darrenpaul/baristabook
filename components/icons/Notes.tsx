import * as React from "react";
import Svg, { SvgProps, Path, G } from "react-native-svg";

type Props = {
  width?: number | string;
  height?: number | string;
};

const SvgComponent = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 512 512" {...props}>
    <Path
      fill="#f9f5f3"
      d="M106.907 104.334v367.033c0 18.299 14.834 33.133 33.133 33.133h314.769c18.299 0 33.133-14.834 33.133-33.133V104.334z"
    />
    <Path
      fill="#f9eae0"
      d="M464.941 104.334v367.033c0 18.299-14.834 33.133-33.133 33.133h23c18.299 0 33.133-14.834 33.133-33.133V104.334z"
    />
    <Path
      fill="#a0c8ff"
      d="M225.409 393.911 96.107 264.609l-46.858 46.858 129.302 129.302a8 8 0 0 0 5.657 2.343h7.141l36.403-36.403v-7.142c0-2.12-.843-4.155-2.343-5.656z"
    />
    <Path
      fill="#91b2fa"
      d="M225.409 393.911 96.107 264.609 84.63 276.086l133.806 133.806a7.992 7.992 0 0 1 2.159 3.974l7.156-7.156v-7.142a7.999 7.999 0 0 0-2.342-5.657z"
    />
    <Path
      fill="#f9eae0"
      d="M227.752 435.112v-35.544a7.99 7.99 0 0 0-.515-2.799l-45.828 45.828a7.99 7.99 0 0 0 2.799.515h35.544a8 8 0 0 0 8-8z"
    />
    <Path
      fill="#fa8ebb"
      d="M52.329 244.26 28.9 267.689c-6.47 6.47-6.47 16.959 0 23.429l23.429 23.429 46.858-46.858-23.429-23.429c-6.47-6.469-16.959-6.469-23.429 0z"
    />
    <Path
      fill="#f57fb0"
      d="M52.567 244.045c.078.075.162.139.238.215l34.905 34.905 11.476-11.476-23.428-23.429c-6.393-6.393-16.705-6.457-23.191-.215z"
    />
    <Path
      fill="#ffce69"
      d="M454.808 40.634H140.039c-18.299 0-33.133 14.834-33.133 33.133v49.701H487.94V73.766c.001-18.298-14.833-33.132-33.132-33.132z"
    />
    <Path
      fill="#ffbd61"
      d="M454.808 40.634h-23c18.299 0 33.133 14.834 33.133 33.133v49.701h23V73.766c0-18.298-14.834-33.132-33.133-33.132z"
    />
    <G fill="#bdd3dd">
      <Path d="M156.607 57.2c0 9.15 7.417 16.567 16.567 16.567s16.567-7.417 16.567-16.567V24.067c0-9.15-7.417-16.567-16.567-16.567s-16.567 7.417-16.567 16.567zM405.107 57.2c0 9.15 7.417 16.567 16.567 16.567s16.567-7.417 16.567-16.567V24.067c0-9.15-7.417-16.567-16.567-16.567s-16.567 7.417-16.567 16.567zM239.44 57.2c0 9.15 7.417 16.567 16.567 16.567s16.567-7.417 16.567-16.567V24.067c0-9.15-7.417-16.567-16.567-16.567s-16.567 7.417-16.567 16.567zM322.274 57.2c0 9.15 7.417 16.567 16.567 16.567s16.567-7.417 16.567-16.567V24.067c0-9.15-7.417-16.567-16.567-16.567s-16.567 7.417-16.567 16.567z" />
    </G>
    <Path
      fill="#abc4d6"
      d="M421.674 7.5c-4.47 0-8.52 1.779-11.5 4.657 3.119 3.013 5.067 7.23 5.067 11.91V57.2c0 4.679-1.948 8.897-5.067 11.91a16.502 16.502 0 0 0 11.5 4.657c9.15 0 16.567-7.417 16.567-16.567V24.067c0-9.15-7.417-16.567-16.567-16.567zM338.841 7.5a16.5 16.5 0 0 0-11.5 4.657c3.119 3.013 5.067 7.23 5.067 11.91V57.2c0 4.679-1.948 8.897-5.067 11.91a16.5 16.5 0 0 0 11.5 4.657c9.15 0 16.567-7.417 16.567-16.567V24.067c0-9.15-7.417-16.567-16.567-16.567zM256.008 7.5c-4.47 0-8.52 1.779-11.5 4.657 3.119 3.013 5.067 7.23 5.067 11.91V57.2c0 4.679-1.947 8.897-5.067 11.91a16.502 16.502 0 0 0 11.5 4.657c9.15 0 16.567-7.417 16.567-16.567V24.067c0-9.15-7.418-16.567-16.567-16.567zM173.174 7.5a16.5 16.5 0 0 0-11.5 4.657c3.119 3.013 5.067 7.23 5.067 11.91V57.2c0 4.679-1.947 8.897-5.067 11.91a16.5 16.5 0 0 0 11.5 4.657c9.15 0 16.567-7.417 16.567-16.567V24.067c0-9.15-7.417-16.567-16.567-16.567z"
    />
    <Path d="M454.808 33.134h-9.067v-9.067C445.741 10.796 434.945 0 421.674 0s-24.067 10.796-24.067 24.067v9.067h-34.7v-9.067C362.908 10.796 352.111 0 338.841 0s-24.067 10.796-24.067 24.067v9.067h-34.7v-9.067C280.074 10.796 269.278 0 256.007 0S231.94 10.796 231.94 24.067v9.067h-34.7v-9.067C197.241 10.796 186.444 0 173.174 0c-13.271 0-24.067 10.796-24.067 24.067v9.067h-9.068c-22.405 0-40.632 18.228-40.632 40.632v183.537l-18.346-18.346c-9.384-9.384-24.651-9.384-34.035 0l-23.429 23.429c-9.384 9.383-9.384 24.652 0 34.035l75.81 75.81v99.136c0 22.405 18.228 40.633 40.632 40.633h255.135a7.5 7.5 0 0 0 0-15H140.039c-14.134 0-25.632-11.499-25.632-25.633v-84.136l61.184 61.184c.178.178.364.346.557.503.131.107.267.202.403.299.064.045.124.096.189.139.172.115.349.217.528.316.034.019.066.041.1.059.189.101.382.189.576.272.029.012.056.028.086.04.189.078.381.144.574.206.04.013.078.029.118.041.182.055.366.098.55.138.055.012.108.029.163.04.179.035.359.058.54.08.063.008.124.021.187.027.243.024.488.036.732.036h43.751l9.518 9.518c1.464 1.464 3.384 2.197 5.303 2.197s3.839-.733 5.303-2.197a7.5 7.5 0 0 0 0-10.607l-9.518-9.517v-43.749a7.54 7.54 0 0 0-.036-.736c-.005-.054-.017-.106-.023-.16a7.75 7.75 0 0 0-.085-.567c-.01-.048-.024-.095-.035-.143a8.048 8.048 0 0 0-.143-.57c-.01-.034-.024-.066-.035-.1a7.598 7.598 0 0 0-.212-.592l-.029-.062a7.618 7.618 0 0 0-.283-.6c-.014-.026-.03-.049-.044-.075a7.41 7.41 0 0 0-.331-.553c-.037-.056-.081-.108-.12-.163-.102-.145-.204-.29-.317-.429a7.546 7.546 0 0 0-.503-.557l-61.185-61.185h258.087a7.5 7.5 0 0 0 0-15H164.89a7.473 7.473 0 0 0-5.551 2.469l-44.933-44.932V130.967H480.44v51.151a7.5 7.5 0 0 0 15 0V73.766c.001-22.405-18.227-40.632-40.632-40.632zM220.252 435.612h-21.251l21.251-21.251zM62.935 314.547l12.822-12.822 117.959 117.959-12.822 12.822zm141.388 94.53L86.364 291.118l12.823-12.823 117.959 117.959zM34.203 272.993l23.429-23.429c3.535-3.535 9.287-3.535 12.822 0L88.58 267.69l-18.123 18.123-.002.002-.002.002-18.124 18.123-18.125-18.125c-3.536-3.535-3.536-9.287-.001-12.822zM421.674 15c5 0 9.067 4.067 9.067 9.067V57.2c0 5-4.067 9.067-9.067 9.067s-9.067-4.067-9.067-9.067V24.067c.001-5 4.068-9.067 9.067-9.067zm-82.833 0c5 0 9.067 4.067 9.067 9.067V57.2c0 5-4.067 9.067-9.067 9.067s-9.067-4.067-9.067-9.067V24.067c0-5 4.067-9.067 9.067-9.067zm-91.9 9.067c0-5 4.067-9.067 9.067-9.067s9.067 4.067 9.067 9.067V57.2c0 5-4.067 9.067-9.067 9.067-4.999 0-9.067-4.067-9.067-9.067zM173.174 15c4.999 0 9.067 4.067 9.067 9.067v16.557l-.001.01.001.01V57.2c0 5-4.067 9.067-9.067 9.067s-9.067-4.067-9.067-9.067V40.644l.001-.01-.001-.01V24.067c0-5 4.067-9.067 9.067-9.067zm-58.767 100.967V73.766c0-14.134 11.499-25.632 25.632-25.632h9.068V57.2c0 13.271 10.796 24.067 24.067 24.067 13.27 0 24.067-10.796 24.067-24.067v-9.066h34.7V57.2c0 13.271 10.796 24.067 24.067 24.067s24.067-10.796 24.067-24.067v-9.066h34.7V57.2c0 13.271 10.796 24.067 24.067 24.067s24.067-10.796 24.067-24.067v-9.066h34.7V57.2c0 13.271 10.796 24.067 24.067 24.067s24.067-10.796 24.067-24.067v-9.066h9.067c14.134 0 25.633 11.499 25.633 25.632v42.201z" />
    <Path d="M487.941 204.619a7.5 7.5 0 0 0-7.5 7.5v259.248c0 14.134-11.499 25.633-25.633 25.633h-29.634a7.5 7.5 0 0 0 0 15h29.634c22.405 0 40.633-18.228 40.633-40.633V212.119a7.5 7.5 0 0 0-7.5-7.5zM164.89 180.667h265.067a7.5 7.5 0 0 0 0-15H164.89a7.5 7.5 0 0 0 0 15zM164.89 230.367h265.067a7.5 7.5 0 0 0 0-15H164.89a7.5 7.5 0 0 0 0 15zM164.89 280.067h265.067a7.5 7.5 0 0 0 0-15H164.89a7.5 7.5 0 0 0 0 15zM437.458 371.967a7.5 7.5 0 0 0-7.5-7.5h-173.95a7.5 7.5 0 0 0 0 15h173.95a7.5 7.5 0 0 0 7.5-7.5z" />
  </Svg>
);
export default SvgComponent;
