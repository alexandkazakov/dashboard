import { FC } from "react";
import style from "./Spinner.module.scss";

export const Spinner: FC = () => {
  return (
    <div className={style.spinnerWrapper}>
      <div className={style.spinner}>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
