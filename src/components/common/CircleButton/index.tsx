import style from "./CircleButton.module.scss";

import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const CircleButton: FC<Props> = ({ children, className, onClick }) => {
  return (
    <div className={`${style.CircleButton} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};
