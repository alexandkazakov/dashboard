import style from "./UploadIcon.module.scss";

import { FC } from "react";

interface Props {
  height?: number;
  color?: string;
}

export const UploadIcon: FC<Props> = ({ height = 24, color = "#000" }) => (
  <svg
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={style.UploadIcon}
  >
    <g clipPath="url(#clip235_17194)">
      <path
        id="Icon"
        d="M17 17L17.0098 17M15.5996 14L18 14C18.9316 14 19.3984 14 19.7656 14.1523C20.2559 14.3552 20.6445 14.7446 20.8477 15.2346C21 15.6022 21 16.0681 21 17C21 17.9319 21 18.3978 20.8477 18.7654C20.6445 19.2554 20.2559 19.6448 19.7656 19.8477C19.3984 20 18.9316 20 18 20L6 20C5.06836 20 4.60156 20 4.23438 19.8477C3.74414 19.6448 3.35547 19.2554 3.15234 18.7654C3 18.3978 3 17.9319 3 17C3 16.0681 3 15.6022 3.15234 15.2346C3.35547 14.7446 3.74414 14.3552 4.23438 14.1523C4.60156 14 5.06836 14 6 14L8.40039 14M12 15L12 4M15 7L12 4L9 7"
        stroke={color}
        strokeOpacity="1.000000"
        strokeWidth="1.500000"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);
