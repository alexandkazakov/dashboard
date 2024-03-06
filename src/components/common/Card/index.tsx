import { FC } from "react";
import styles from "./Card.module.scss";

interface Props {
  title?: string;
  children: React.ReactNode;
}

export const Card: FC<Props> = ({ title, children }) => {
  return (
    <div className={styles.Card}>
      {title && <h3 className={styles.Card__title}>{title}</h3>}
      {children}
    </div>
  );
};
