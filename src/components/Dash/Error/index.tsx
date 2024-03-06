import style from "./Error.module.scss";

import { FC } from "react";

export const Error: FC = () => {
  return (
    <div className={style.Error}>
      <h2 className={"dash__title"}>Ошибка 404</h2>
      Кажется что-то пошло не так! Страница, которую вы запрашиваете
      отсутствует.
    </div>
  );
};
