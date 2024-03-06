import styles from "./Layout.module.scss";

import { useEffect, FC } from "react";
import {
  useLocation,
  useNavigate,
  Outlet,
  LoaderFunction,
} from "react-router-dom";

import { store, useAppSelector } from "../../store/index.ts";
import { PAGES } from "../../constants/pageNames.ts";
import { datesApi } from "../../store/services/datesApi.ts";

import { Aside } from "../Aside";
import { Logo } from "../Logo";
import { Filters } from "../Filters";
import { Dash } from "../Dash/index.tsx";

export const layoutLoader: LoaderFunction = async ({ params }) => {
  const initialDate = params.date ? [params?.date] : null;
  const response = store.dispatch(
    datesApi.endpoints.getDates.initiate(initialDate),
  );
  const data = await response.unwrap();

  // toFix: "replace"
  if (location.pathname === "/")
    location.replace(`/${PAGES[0].name}/${data[0]}`);

  return null;
};

export const Layout: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const locationPathArray = location.pathname.split("/");

  const { selectedDate } = useAppSelector((state) => state.dates);

  // redirect to selected date
  useEffect(() => {
    if (selectedDate.length > 0 && locationPathArray.length > 1) {
      // cancel redirect on another pages
      if (
        PAGES.findIndex((page) => page.name === locationPathArray[1]) === -1
      ) {
        return;
      }

      const selectedDateString =
        selectedDate.length === 1
          ? selectedDate[0]
          : `${selectedDate[0]}-${selectedDate[1]}`;

      locationPathArray.splice(2, 1, selectedDateString);

      const editedPath = locationPathArray.join("/");

      navigate(editedPath);
    }
  }, [selectedDate]);

  return (
    <div className={styles.Layout}>
      <div className={styles.container}>
        <Logo />
        <Filters />
        <Aside />
        <Dash>
          <Outlet />
        </Dash>
      </div>
    </div>
  );
};
