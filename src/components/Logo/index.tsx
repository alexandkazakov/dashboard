import style from "./Logo.module.scss";
import { DashIcon } from "../common/icons/DashIcon";
import { FC } from "react";

export const Logo: FC = () => {
  return (
    <a href="/" className={style.Logo}>
      <DashIcon />
      <span className={style.Logo__text}>Dashboard</span>
    </a>
  );
};
