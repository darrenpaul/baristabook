import * as React from "react";
import Svg, { SvgProps, Circle, G, Path } from "react-native-svg";
type Props = {
  width?: number | string;
  height?: number | string;
};

const SvgComponent = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 128 128" {...props}>
    <Circle cx={64} cy={72.372} r={49.321} fill="#3ea2e5" />
    <Circle cx={64} cy={72.372} r={37.912} fill="#dfeef4" />
    <G fill="#f45858">
      <Circle cx={64} cy={72.372} r={6.243} />
      <Path d="M54.576 6.306h18.847v8.249H54.576zM91.966 31.752l.1.055 5.833-10.154-7.152-4.109-5.83 10.147.088.051a49.189 49.189 0 0 1 6.961 4.01zM36.035 31.751A49.213 49.213 0 0 1 43 27.742l.088-.051-5.83-10.147-7.152 4.109 5.833 10.154zM59.876 14.555v8.666h.194c1.3-.1 2.606-.17 3.93-.17s2.632.068 3.93.17h.194v-8.666z" />
    </G>
    <Path d="M17.659 83.168a47.58 47.58 0 0 1 85.486-37.835 1.75 1.75 0 0 0 2.878-1.992 51.126 51.126 0 0 0-11.671-12.01l5.06-8.807a1.75 1.75 0 0 0-.645-2.389l-7.153-4.109a1.75 1.75 0 0 0-2.389.646l-5.058 8.8a50.994 50.994 0 0 0-14.293-3.822v-5.345h3.55a1.75 1.75 0 0 0 1.75-1.75V6.307a1.749 1.749 0 0 0-1.75-1.75H54.576a1.749 1.749 0 0 0-1.75 1.75v8.248a1.75 1.75 0 0 0 1.75 1.75h3.55v5.344a50.663 50.663 0 0 0-14.3 3.814l-5.051-8.791a1.749 1.749 0 0 0-2.389-.646l-7.153 4.109a1.75 1.75 0 0 0-.645 2.389l5.059 8.805a51.105 51.105 0 0 0-19.4 52.63 1.75 1.75 0 0 0 1.7 1.355 1.813 1.813 0 0 0 .4-.045 1.751 1.751 0 0 0 1.312-2.101zm73.729-63.235 4.117 2.367-4.047 7.044a50.686 50.686 0 0 0-4.111-2.376zM56.326 8.057h15.348v4.748H56.326zm5.3 8.248h4.748v5.069C65.585 21.337 64.8 21.3 64 21.3s-1.587.024-2.374.061zM32.495 22.3l4.117-2.365 4.044 7.039q-2.115 1.092-4.113 2.372zM110.222 50.623a1.75 1.75 0 0 0-3.166 1.492 47.579 47.579 0 0 1-80.226 49.949 1.749 1.749 0 0 0-2.73 2.186 51.081 51.081 0 0 0 86.124-53.627zM20.135 90.813a1.751 1.751 0 0 0-3.227 1.358 51.398 51.398 0 0 0 2.035 4.267 1.75 1.75 0 1 0 3.086-1.651 46.602 46.602 0 0 1-1.894-3.974z" />
    <Path d="M98.219 52.319a1.672 1.672 0 0 0-.1-.135 39.942 39.942 0 0 0-14.105-14.032 1.515 1.515 0 0 0-.15-.109 1.608 1.608 0 0 0-.175-.078 39.516 39.516 0 0 0-39.565.107 1.781 1.781 0 0 0-.178.082 1.617 1.617 0 0 0-.133.1A39.951 39.951 0 0 0 29.778 52.36a.946.946 0 0 0-.186.324A39.518 39.518 0 0 0 29.7 92.25a1.732 1.732 0 0 0 .08.176c.022.038.055.066.079.1a39.941 39.941 0 0 0 14.123 14.064 1.707 1.707 0 0 0 .153.111c.044.025.092.035.137.057a39.526 39.526 0 0 0 39.65-.113c.043-.021.089-.03.131-.055s.088-.065.133-.1a39.95 39.95 0 0 0 14.058-14.144c.027-.039.061-.068.085-.11a1.443 1.443 0 0 0 .079-.175 39.52 39.52 0 0 0-.108-39.567 1.622 1.622 0 0 0-.081-.175zm-14.456 50.314L81.514 98.8a1.75 1.75 0 1 0-3.02 1.77l2.252 3.842a35.9 35.9 0 0 1-15 4.082v-4.465a1.75 1.75 0 0 0-3.5 0v4.465a35.891 35.891 0 0 1-14.814-3.994l2.23-3.853a1.75 1.75 0 0 0-3.029-1.753l-2.227 3.849a36.443 36.443 0 0 1-10.667-10.608l3.837-2.248a1.75 1.75 0 0 0-1.769-3.02l-3.842 2.252a35.9 35.9 0 0 1-4.083-15h4.465a1.75 1.75 0 0 0 0-3.5h-4.465a35.9 35.9 0 0 1 3.991-14.818l3.854 2.229a1.75 1.75 0 0 0 1.752-3.029l-3.848-2.227a36.44 36.44 0 0 1 10.606-10.663l2.249 3.837a1.75 1.75 0 0 0 3.02-1.769l-2.252-3.842a35.882 35.882 0 0 1 15-4.082v4.464a1.75 1.75 0 0 0 3.5 0v-4.464a35.9 35.9 0 0 1 14.818 3.99L78.338 44.1a1.75 1.75 0 1 0 3.029 1.753L83.594 42a36.443 36.443 0 0 1 10.667 10.61l-3.837 2.248a1.75 1.75 0 1 0 1.769 3.02l3.843-2.252a35.916 35.916 0 0 1 4.082 15h-4.465a1.75 1.75 0 0 0 0 3.5h4.465a35.9 35.9 0 0 1-3.991 14.814l-3.853-2.23a1.75 1.75 0 0 0-1.753 3.03l3.848 2.227a36.437 36.437 0 0 1-10.606 10.666z" />
    <Path d="M90.394 72.373a1.75 1.75 0 0 0-1.75-1.75h-16.85a8.013 8.013 0 0 0-6.044-6.045V47.729a1.75 1.75 0 0 0-3.5 0v16.849a7.991 7.991 0 1 0 9.544 9.545h16.85a1.751 1.751 0 0 0 1.75-1.75zM64 76.866a4.494 4.494 0 1 1 4.493-4.493A4.5 4.5 0 0 1 64 76.866z" />
  </Svg>
);
export default SvgComponent;
