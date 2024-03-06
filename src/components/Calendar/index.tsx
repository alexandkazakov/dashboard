import style from "./Calendar.module.scss";
import { FC, MouseEventHandler } from "react";
import { CalendarView } from "./CalendarView";
import classNames from "classnames/bind";

interface Props {
  dates: string[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedCalendarValue: string[];
  setSelectedCalendarValue: (selectedCalendarValue: string[]) => void;
}

export const Calendar: FC<Props> = ({
  dates,
  isOpen,
  setIsOpen,
  selectedCalendarValue,
  setSelectedCalendarValue,
}) => {
  const cn = classNames.bind(style);

  const handleCalendarOpen: MouseEventHandler = (event): void => {
    event.stopPropagation();
    selectedCalendarValue.length >= 1 && setIsOpen(true);
  };

  return (
    <div className={style.Calendar}>
      <div
        className={cn("Calendar__btn", {
          "Calendar__btn--open": isOpen,
        })}
      >
        <span
          className={cn("Calendar__calendar_value", {
            "Calendar__calendar_value--hide": isOpen,
          })}
          id={"calendar_value"}
          onClick={handleCalendarOpen}
        >
          {selectedCalendarValue.length > 1 &&
            `${selectedCalendarValue[0]} - ${selectedCalendarValue[1]}`}
          {selectedCalendarValue.length === 1 && selectedCalendarValue[0]}
          {selectedCalendarValue.length < 1 && "Нет данных для календаря"}
        </span>

        {dates.length > 0 && (
          <CalendarView
            dates={dates}
            isCalendarOpen={isOpen}
            setSelectedCalendarValue={setSelectedCalendarValue}
            setCalendarOpen={setIsOpen}
          />
        )}
      </div>
    </div>
  );
};
