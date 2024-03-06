import styles from "./Dash.module.scss";

import { FC } from "react";
import classNames from "classnames/bind";

interface Props {
  children: React.ReactNode;
}

export const Dash: FC<Props> = ({ children }) => {
  const cn = classNames.bind(styles);

  return (
    <main className={cn("Dash", "Dash--visible")}>
      <div className={cn("dash__content")}>
        <div className={styles.Dash__content}>{children}</div>
      </div>
    </main>
  );
};
