import { NavLink, useLocation } from "react-router-dom";
import { useColorIcons } from "../../hooks/useColorIcons";
import { Calendar } from "../Calendar";
import Theme from "../Theme";
import { CircleButton } from "../common/CircleButton";
import { UploadIcon } from "../common/icons/UploadIcon";
import style from "./Filters.module.scss";
import { FC, useState } from "react";
import { useAppSelector } from "../../store/index.ts";
import { useAppDispatch } from "../../store/index.ts";
import { setSelectedDate } from "../../store/slices/datesSlice.ts";

export const Filters: FC = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const iconColor = useColorIcons();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const { dates, selectedDate } = useAppSelector((state) => state.dates);

  const isReportPages = !location.pathname.includes("/upload");

  return (
    <div className={style.Filters}>
      <div className={style.Filters__period}>
        {isReportPages && (
          <>
            <span className={style.Filters__title}>
              Выберите дату или период отчёта
            </span>
            <Calendar
              dates={dates}
              isOpen={isCalendarOpen}
              setIsOpen={setIsCalendarOpen}
              selectedCalendarValue={selectedDate}
              setSelectedCalendarValue={(date) =>
                dispatch(setSelectedDate(date))
              }
            />
          </>
        )}
        {!isReportPages && (
          <>
            <span className={style.Filters__title}>Загрузка отчёта</span>
          </>
        )}
      </div>
      <div className={style.Filters__btnsGroup}>
        <NavLink
          to="/upload"
          className={({ isActive }) =>
            `${style.Filters__uploadBtn} ${isActive && style["Filters__uploadBtn--active"]}`
          }
        >
          <CircleButton>
            <UploadIcon height={16} color={iconColor} />
          </CircleButton>
        </NavLink>
        <Theme.Switcher className={style.Filters__switcher} />
      </div>
    </div>
  );
};
