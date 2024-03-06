import { FC, useState } from "react";
import Calendar from "react-calendar";
import classNames from "classnames/bind";

import styles from "./CalendarView.module.scss";

type CalendarValue = Date | null;

interface Props {
  dates: string[];
  isCalendarOpen: boolean;
  setSelectedCalendarValue: (value: string[]) => void;
  setCalendarOpen: (isOpen: boolean) => void;
}

export const CalendarView: FC<Props> = ({
  dates,
  isCalendarOpen,
  setSelectedCalendarValue,
  setCalendarOpen,
}) => {
  const cn = classNames.bind(styles);
  const initialDateValue = dates[0].split(".").reverse().join("-");

  const [dateState, setDateState] = useState<CalendarValue[] | string>(
    initialDateValue,
  );
  const [isDisableAcceptButton, setIsDisableAcceptButton] = useState(true);

  const handleAcceptDate = () => {
    if (typeof dateState === "object") {
      const formatedDates: string[] = [];
      dateState.forEach((date) => {
        const dateString: string = date ? date.toLocaleDateString() : "";

        if (dateString && !formatedDates.includes(dateString)) {
          formatedDates.push(dateString);
        }
      });
      setSelectedCalendarValue(formatedDates);
      setCalendarOpen(false);
    }
  };

  const handleCalendarReset = () => {
    setSelectedCalendarValue([dates[0]]);
    setDateState(initialDateValue);
    setIsDisableAcceptButton(true);
    setCalendarOpen(false);
  };

  document.addEventListener("click", () => {
    if (isCalendarOpen) setCalendarOpen(false);
  });

  return (
    <div
      id={"calendar"}
      className={cn("CalendarView", { "CalendarView--open": isCalendarOpen })}
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <Calendar
        selectRange
        returnValue={"range"}
        onChange={(value) => {
          setIsDisableAcceptButton(false);
          return setDateState(value as CalendarValue[]);
        }}
        value={dateState as string}
        allowPartialRange
        next2Label={null}
        prev2Label={null}
        goToRangeStartOnSelect={false}
        showNeighboringMonth={false}
        tileDisabled={({ date, view }) => {
          if (view !== "month") return false;
          return !dates.includes(date.toLocaleDateString());
        }}
      />

      <div className={cn("CalendarView__controls")}>
        <button
          className={cn("CalendarView__accept", {
            "CalendarView__accept--disabled": isDisableAcceptButton,
          })}
          onClick={handleAcceptDate}
        >
          Принять
        </button>
        <button
          className={cn("CalendarView__cancel")}
          onClick={handleCalendarReset}
        >
          Сбросить
        </button>
      </div>
    </div>
  );
};
