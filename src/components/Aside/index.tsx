import styles from "./Aside.module.scss";

import { PAGES } from "../../constants/pageNames";

import classNames from "classnames/bind";
import { NavLink } from "react-router-dom";
import { FC } from "react";
import { useAppSelector } from "../../store/index.ts";

export const Aside: FC = () => {
  const cn = classNames.bind(styles);

  const { selectedDate } = useAppSelector((state) => state.dates);

  return (
    <aside className={cn("Aside", "Aside--visible")}>
      <nav className={styles.Aside__nav}>
        {PAGES.map((page) => (
          <NavLink
            key={page.name}
            to={`/${page.name}/${selectedDate.join("-")}`}
            className={({ isActive }) =>
              cn("Aside__link", {
                "Aside__link--active": isActive,
              })
            }
          >
            {page.title}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
