import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

type Props = {
  width?: number | string;
  height?: number | string;
};

const SvgComponent = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 512 512" {...props}>
    <Path
      fill="#dd7f66"
      d="m128.215 352.653 11.542-14.65c3.851-4.887 11.104-5.316 15.504-.917l23.465 23.465c4.441 4.441.986 12.014-5.279 11.57l-37.807-2.679c-8.316-.589-12.585-10.241-7.425-16.789zM181.884 275.823 200 271.387c6.043-1.48 12.023 2.649 12.78 8.825l4.04 32.938c.765 6.235-6.621 10.073-11.284 5.865l-28.14-25.392c-6.189-5.584-3.609-15.817 4.488-17.8zM249.94 353.343l4.436 18.115c1.48 6.043-2.649 12.023-8.825 12.78l-32.938 4.04c-6.235.765-10.073-6.621-5.865-11.284l25.392-28.14c5.584-6.188 15.817-3.608 17.8 4.489zM188.809 405.065l4.436 18.115c1.48 6.043-2.649 12.023-8.825 12.78L151.482 440c-6.234.765-10.073-6.621-5.865-11.284l25.392-28.14c5.584-6.188 15.817-3.608 17.8 4.489zM286.156 285.262l4.436 18.115c1.48 6.043-2.649 12.023-8.825 12.78l-32.938 4.04c-6.234.765-10.073-6.621-5.865-11.284l25.392-28.14c5.584-6.189 15.818-3.609 17.8 4.489zM239.456 420.917l14.815 11.33c4.942 3.78 5.476 11.027 1.14 15.489l-23.125 23.801c-4.377 4.505-11.998 1.159-11.645-5.112l2.134-37.842c.47-8.323 10.059-12.73 16.681-7.666zM292.036 393.647l17.553-6.304c5.856-2.103 8.561-8.847 5.783-14.414l-14.818-29.693c-2.805-5.62-11.082-4.743-12.647 1.34l-9.442 36.707c-2.077 8.074 5.725 15.182 13.571 12.364zM365.493 376.076l11.585 14.615c3.865 4.876 2.606 12.032-2.692 15.296l-28.253 17.407c-5.348 3.295-11.916-1.817-10.036-7.81l11.345-36.165c2.495-7.954 12.873-9.876 18.051-3.343zM327.282 263.896l18.15-4.291c6.055-1.432 12.001 2.745 12.71 8.926l3.777 32.969c.715 6.24-6.701 10.02-11.33 5.775l-27.937-25.615c-6.145-5.633-3.483-15.845 4.63-17.764zM302.955 487.975l-17.739-5.758c-5.918-1.921-8.831-8.578-6.227-14.228l13.892-30.137c2.63-5.704 10.93-5.084 12.682.948l10.573 36.398c2.326 8.005-5.252 15.35-13.181 12.777zM135.773 310.355l-18.525-2.159c-6.18-.72-10.345-6.675-8.902-12.727l7.698-32.28c1.457-6.11 9.717-7.133 12.621-1.563l17.521 33.609c3.854 7.393-2.132 16.085-10.413 15.12z"
    />
    <Path
      fill="#e49280"
      d="M306.356 189.602c0 14.863-1.504 29.273-4.328 42.98H54.812c-2.824-13.707-4.328-28.117-4.328-42.98 0-91.733 57.274-166.096 127.936-166.096 70.653-.001 127.936 74.363 127.936 166.096z"
    />
    <Path
      fill="#dd7f66"
      d="M117.609 189.602c0 14.863 1.504 29.273 4.328 42.98H54.812c-2.824-13.707-4.328-28.117-4.328-42.98 0-91.742 57.283-166.096 127.926-166.096 11.624 0 22.873 2.005 33.562 5.783-54.371 19.142-94.363 83.645-94.363 160.313z"
    />
    <Path
      fill="#c4573a"
      d="M221.593 232.581h-50.045c-4.337-9.388-10.265-18.227-16.589-27.085-25.119-31.798-27.316-85.284.925-114.731 6.082-6.333 16.791-2.516 17.408 6.246.868 12.251 3.239 24.348 7.162 36.714 3.904 14.429 12.222 27.191 21.398 39.972 1.089 1.629 3.171 4.8 4.357 6.651 10.198 14.728 15.461 33.563 15.384 52.233z"
    />
    <Path
      fill="#e49280"
      d="M461.516 196.382c0 12.518-1.266 24.655-3.645 36.199H249.657c-2.379-11.544-3.645-23.681-3.645-36.199 0-77.26 48.238-139.892 107.752-139.892 59.506.001 107.752 62.632 107.752 139.892z"
    />
    <Path
      fill="#dd7f66"
      d="M302.546 196.382c0 12.518 1.266 24.655 3.645 36.199h-56.535c-2.379-11.544-3.645-23.681-3.645-36.199 0-77.268 48.246-139.892 107.744-139.892 9.79 0 19.264 1.689 28.267 4.871-45.793 16.123-79.476 70.45-79.476 135.021z"
    />
    <Path
      fill="#c4573a"
      d="M390.125 232.581h-42.149c-3.653-7.907-8.646-15.352-13.971-22.812-21.156-26.782-23.007-71.829.779-96.63 5.122-5.334 14.142-2.119 14.661 5.261.731 10.318 2.728 20.506 6.032 30.922 3.288 12.153 10.294 22.901 18.022 33.666a437.214 437.214 0 0 1 3.669 5.601c8.589 12.404 13.022 28.267 12.957 43.992z"
    />
    <Path d="M504.5 225.086h-37.666a188.781 188.781 0 0 0 2.185-28.7c0-37.034-10.748-72.42-30.264-99.64a7.501 7.501 0 0 0-12.191 8.74c17.704 24.693 27.454 56.975 27.454 90.9 0 9.697-.811 19.321-2.389 28.7h-54.297c-1.176-14.958-6.003-29.167-13.921-40.649a448.417 448.417 0 0 0-3.678-5.612 5.853 5.853 0 0 0-.143-.207c-6.538-9.105-13.772-19.781-16.876-31.251a6.443 6.443 0 0 0-.09-.309c-3.147-9.921-5.012-19.467-5.699-29.181-.45-6.398-4.474-11.729-10.501-13.911-6.05-2.192-12.586-.667-17.056 3.986-12.623 13.162-19.487 31.92-19.329 52.821.148 19.673 6.693 39.161 17.961 53.502 2.482 3.479 4.988 7.099 7.309 10.811h-79.412a173.202 173.202 0 0 1-2.39-28.7c0-73 44.972-132.39 100.25-132.39 17.64 0 35 6.168 50.204 17.839a7.5 7.5 0 1 0 9.133-11.898c-17.847-13.699-38.365-20.94-59.337-20.94-25.898 0-50.416 10.778-70.477 30.666-25.587-40.045-64.171-63.656-104.863-63.656-36.554 0-70.792 18.316-96.409 51.575-25.167 32.676-39.028 76.012-39.028 122.024 0 11.952.967 23.845 2.847 35.479H7.5a7.5 7.5 0 0 0 0 15h497a7.5 7.5 0 1 0 0-14.999zm-164.392-19.67a7.895 7.895 0 0 0-.219-.291c-19.953-25.259-19.81-65.815.303-86.786.132-.137.479-.503 1.126-.269.601.217.631.652.646.864.77 10.863 2.835 21.498 6.316 32.509 3.764 13.776 11.795 25.706 19.052 35.819.913 1.369 2.568 3.89 3.52 5.376.049.076.099.151.15.226 6.263 9.044 10.162 20.279 11.281 32.222h-29.668c-3.677-6.988-8.14-13.553-12.507-19.67zM57.98 189.606c0-87.453 54.029-158.6 120.44-158.6 19.299 0 37.744 5.857 54.822 17.41 15.293 10.345 28.912 25.119 39.622 42.91-.413.521-.829 1.037-1.237 1.567-21.356 27.726-33.117 64.48-33.117 103.494 0 9.673.736 19.29 2.186 28.7h-11.841c-1.191-18.006-6.902-35.133-16.405-48.894a495.46 495.46 0 0 0-4.376-6.673 8.43 8.43 0 0 0-.127-.183c-7.837-10.931-16.511-23.75-20.256-37.571a7.705 7.705 0 0 0-.09-.306c-3.766-11.875-6-23.315-6.827-34.964-.49-7.031-4.907-12.892-11.528-15.296-6.659-2.417-13.85-.744-18.776 4.375-17.641 18.392-25.664 46.909-21.461 76.284.587 4.101 4.387 6.954 8.486 6.362a7.498 7.498 0 0 0 6.362-8.486c-3.554-24.846 2.965-48.688 17.43-63.768 1.054-1.097 2.231-.889 2.84-.668.715.26 1.588.859 1.685 2.25.909 12.805 3.345 25.334 7.445 38.297 4.406 16.127 13.879 30.202 22.435 42.139a489.433 489.433 0 0 1 4.213 6.43c.047.072.095.144.144.215 7.841 11.315 12.615 25.464 13.764 40.458h-37.596c-4.393-8.493-9.832-16.494-15.147-23.945a7.991 7.991 0 0 0-.22-.293c-2.506-3.173-4.832-6.69-6.913-10.452a7.499 7.499 0 0 0-10.193-2.933 7.5 7.5 0 0 0-2.933 10.193c2.442 4.417 5.184 8.568 8.151 12.341 3.444 4.832 6.927 9.891 10.061 15.089H61.03a207.274 207.274 0 0 1-3.05-35.482zM173.962 379.647c-.346 0-.695-.013-1.045-.037l-37.808-2.679c-6.625-.47-12.408-4.535-15.094-10.608s-1.801-13.087 2.309-18.304l11.542-14.65a17.902 17.902 0 0 1 12.995-6.786 17.916 17.916 0 0 1 13.704 5.208l23.465 23.465c4.26 4.259 5.396 10.553 2.896 16.033-2.356 5.16-7.369 8.358-12.964 8.358zm.015-15h.01zm-39.872-7.346c-.936 1.188-.635 2.361-.373 2.955.263.593.928 1.605 2.437 1.712l35.904 2.544-22.116-22.116a2.847 2.847 0 0 0-2.212-.84 2.855 2.855 0 0 0-2.098 1.095zM210.05 328.294c-3.441 0-6.833-1.261-9.539-3.704l-28.14-25.392a17.846 17.846 0 0 1-5.361-17.653 17.847 17.847 0 0 1 13.09-13l18.115-4.436c4.958-1.217 10.215-.248 14.417 2.654s6.969 7.473 7.591 12.542l4.04 32.938c.733 5.979-2.247 11.638-7.591 14.416a14.322 14.322 0 0 1-6.622 1.635zm.51-14.84h.01zm-8.078-34.861c-.218 0-.452.025-.698.086l-18.116 4.436c-1.469.36-1.954 1.469-2.113 2.099s-.257 1.836.865 2.849l26.723 24.113-3.808-31.043a2.858 2.858 0 0 0-1.225-2.025 2.877 2.877 0 0 0-1.628-.515zm-20.598-2.763h.01zM211.734 395.839c-5.297 0-10.125-2.894-12.625-7.702-2.778-5.345-1.966-11.688 2.07-16.161l25.391-28.14a17.846 17.846 0 0 1 17.654-5.361 17.848 17.848 0 0 1 13 13.09l4.436 18.115a17.9 17.9 0 0 1-2.654 14.417 17.898 17.898 0 0 1-12.541 7.592l-32.939 4.04c-.601.074-1.2.11-1.792.11zm28.062-42.914c-.625 0-1.401.2-2.089.961l-24.113 26.722 31.043-3.807a2.855 2.855 0 0 0 2.024-1.226 2.856 2.856 0 0 0 .428-2.327l-4.436-18.116c-.36-1.469-1.469-1.954-2.098-2.113a3.206 3.206 0 0 0-.759-.094zM150.603 447.562c-5.297 0-10.126-2.894-12.625-7.702-2.778-5.345-1.965-11.688 2.07-16.16l25.391-28.14a17.849 17.849 0 0 1 17.653-5.361 17.85 17.85 0 0 1 13.001 13.09l4.436 18.115c1.214 4.96.247 10.216-2.655 14.418s-7.473 6.969-12.542 7.59l-32.938 4.04c-.6.073-1.199.11-1.791.11zm28.062-42.915c-.625 0-1.402.199-2.089.961l-24.112 26.723 31.043-3.808a2.855 2.855 0 0 0 2.024-1.225 2.861 2.861 0 0 0 .429-2.328l-4.436-18.115c-.36-1.469-1.469-1.955-2.099-2.113a3.18 3.18 0 0 0-.76-.095zM247.95 327.758c-5.296 0-10.125-2.894-12.624-7.701-2.779-5.345-1.967-11.688 2.069-16.161l25.392-28.14c4.45-4.931 11.215-6.984 17.654-5.361s11.421 6.64 13 13.09l4.436 18.115c1.214 4.96.246 10.216-2.655 14.418s-7.473 6.969-12.541 7.59l-32.938 4.04c-.602.074-1.201.11-1.793.11zm28.063-42.915c-.625 0-1.401.199-2.089.961l-24.114 26.723 31.044-3.808a2.85 2.85 0 0 0 2.023-1.225 2.862 2.862 0 0 0 .429-2.328l-4.436-18.115c-.359-1.469-1.469-1.954-2.098-2.113a3.164 3.164 0 0 0-.759-.095zM227.465 481.123c-1.943 0-3.91-.401-5.79-1.226-5.516-2.421-8.861-7.872-8.522-13.887l2.134-37.842a17.85 17.85 0 0 1 10.389-15.246 17.845 17.845 0 0 1 18.336 2.044l14.815 11.33c4.057 3.103 6.598 7.803 6.973 12.896s-1.451 10.114-5.01 13.777l-23.125 23.801c-2.767 2.849-6.439 4.353-10.2 4.353zm5.718-54.853c-.513 0-.949.146-1.242.281-.59.271-1.592.951-1.677 2.461l-2.026 35.936 21.794-22.432c.787-.81.844-1.741.809-2.224s-.229-1.396-1.125-2.082l-14.814-11.33c-.606-.461-1.201-.61-1.719-.61zM288.512 401.77c-4.38 0-8.679-1.614-12.033-4.669a17.847 17.847 0 0 1-5.277-17.678l9.442-36.708c1.5-5.833 6.341-10.013 12.331-10.648 5.997-.636 11.601 2.438 14.29 7.828l14.818 29.693c2.28 4.569 2.497 9.908.596 14.647s-5.748 8.448-10.555 10.174l-17.553 6.304a17.937 17.937 0 0 1-6.059 1.057zm3.524-8.117h.01zm2.659-45.354-8.967 34.859c-.377 1.464.372 2.416.852 2.853.481.438 1.499 1.096 2.921.583l17.553-6.304a2.86 2.86 0 0 0 1.704-1.643 2.86 2.86 0 0 0-.097-2.364zM342.56 431.935c-3.093 0-6.169-1.021-8.76-3.037-4.754-3.699-6.661-9.804-4.858-15.552l11.345-36.165a17.845 17.845 0 0 1 13.809-12.234 17.847 17.847 0 0 1 17.275 6.476h.001l11.585 14.616c3.172 4.001 4.484 9.181 3.599 14.211s-3.886 9.451-8.234 12.129l-28.253 17.406a14.283 14.283 0 0 1-7.509 2.15zm14.841-52.292c-.218 0-.414.023-.574.053-.638.118-1.776.532-2.229 1.975l-10.773 34.343 26.628-16.405c.961-.592 1.245-1.481 1.329-1.958s.12-1.41-.581-2.294l-11.586-14.616h.001c-.704-.887-1.56-1.098-2.215-1.098zM355.141 316.591c-3.479 0-6.904-1.29-9.621-3.78l-27.937-25.615c-4.896-4.488-6.896-11.268-5.221-17.694s6.729-11.369 13.193-12.897l18.15-4.291a17.897 17.897 0 0 1 14.395 2.769 17.901 17.901 0 0 1 7.492 12.602l3.777 32.971c.686 5.985-2.34 11.62-7.707 14.355a14.352 14.352 0 0 1-6.521 1.58zm.516-14.837h.01zm-26.65-30.552c-1.472.348-1.966 1.454-2.129 2.082-.164.628-.272 1.834.842 2.855l26.53 24.325-3.56-31.073a2.86 2.86 0 0 0-1.21-2.034 2.848 2.848 0 0 0-2.323-.447zM306.177 495.994c-1.851 0-3.717-.288-5.537-.878l-17.739-5.758a17.902 17.902 0 0 1-10.864-9.842 17.897 17.897 0 0 1 .142-14.659l13.892-30.137c2.522-5.471 8.039-8.721 14.04-8.267 6.007.449 10.975 4.477 12.656 10.261l10.573 36.398a17.845 17.845 0 0 1-4.729 17.834 17.85 17.85 0 0 1-12.434 5.048zm-7.283-53.264-13.093 28.405c-.473 1.025-.218 1.922-.023 2.366s.681 1.24 1.754 1.588l17.739 5.758c1.437.466 2.435-.221 2.9-.673s1.186-1.427.764-2.879zM136.993 317.933c-.692 0-1.389-.04-2.088-.121l-18.525-2.159c-5.072-.591-9.66-3.33-12.587-7.515s-3.926-9.434-2.742-14.401l7.698-32.28c1.397-5.86 6.163-10.125 12.142-10.865 5.98-.739 11.641 2.233 14.425 7.574l17.521 33.61a17.849 17.849 0 0 1-1.13 18.415 17.846 17.846 0 0 1-14.714 7.742zm-.351-15.021c1.501.178 2.344-.696 2.712-1.23.368-.535.881-1.632.183-2.973l-16.639-31.917-7.255 30.424a2.861 2.861 0 0 0 .442 2.325 2.86 2.86 0 0 0 2.031 1.212z" />
  </Svg>
);
export default SvgComponent;
