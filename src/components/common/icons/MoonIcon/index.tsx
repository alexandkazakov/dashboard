// import styles from "./MoonIcon.module.scss";
import { FC } from "react";

interface Props {
  className?: string;
}

export const MoonIcon: FC<Props> = ({ className }: Props) => {
  return (
    <svg
      className={className}
      width="16.000000"
      height="16.000000"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <desc>Created with Pixso.</desc>
      <defs>
        <clipPath id="clip52_583">
          <rect
            id="night"
            width="16.000000"
            height="16.000000"
            fill="white"
            fillOpacity="0"
          />
        </clipPath>
      </defs>
      <rect
        id="night"
        width="16.000000"
        height="16.000000"
        fill="#FFFFFF"
        fillOpacity="0"
      />
      <g clipPath="url(#clip52_583)">
        <path
          id="Vector"
          d="M8.875 1C8.45117 0.875 8.02539 0.774902 7.57617 0.699951C7.25 0.649902 6.90039 0.824951 6.77539 1.125C6.625 1.4248 6.70117 1.7998 6.95117 2C8.72656 3.6499 9.375 6.07495 8.65039 8.34985C7.85156 10.875 5.5 12.6499 2.77539 12.7249C2.42578 12.7249 2.15039 12.95 2.05078 13.2749C1.95117 13.5999 2.10156 13.95 2.375 14.125C3 14.5 3.625 14.7998 4.25 15C4.97656 15.2249 5.72656 15.325 6.47656 15.325C7.75 15.325 9 15 10.125 14.375C11.9004 13.3999 13.1504 11.825 13.7012 9.9248C14.7754 6.1748 12.6504 2.25 8.875 1ZM12.625 9.59985C12.1758 11.2249 11.0762 12.5498 9.60156 13.375C8.05078 14.2249 6.27539 14.3999 4.60156 13.8999C4.42578 13.8499 4.22656 13.7749 4.05078 13.7C6.70117 13.1748 8.90039 11.2749 9.72656 8.6748C10.4512 6.375 10 3.94995 8.52539 2.0498C11.7266 3.125 13.5254 6.44995 12.625 9.59985Z"
          fill="#121212"
          fillOpacity="1.000000"
          fillRule="nonzero"
        />
      </g>
    </svg>
  );
};
