import classNames from "classnames/bind";
import { useState } from "react";
import CryptoJS from "crypto-js";
import _ from "lodash";

import { editEvent, updateEvents } from "../../../store.ts";
import { useDispatch, useSelector } from "react-redux";

import { SaveIcon } from "../icons/SaveIcon";
import { CancelIcon } from "../icons/CancelIcon";
import { EditIcon } from "../icons/EditIcon";

import styles from "./Event.module.scss";

export const Event = ({
  eventsArray,
  setEventsArray,
  isActiveLink,
  setActiveLink,
  pageName,
  currentDate,
  tab,
}) => {
  const editEventObj = useSelector((state) =>
    state.common.eventCells[tab].find((item) => item.name === isActiveLink),
  );
  const editCell = editEventObj ? editEventObj.cell : null;

  const cn = classNames.bind(styles);
  const dispatch = useDispatch();

  const [isEditPush, setEditPush] = useState(false);
  const [isAllowAccess, setAllowAccess] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [text, setText] = useState(eventsArray.join("///"));

  const values = useSelector((state) => state.values);
  const valuesCopy = structuredClone(values);

  const handleBackButton = () => {
    setEventsArray([]);
    setActiveLink("");
  };

  const handleEditBtn = () => {
    setEditPush(true);
  };

  const handleInputPass = (event) => {
    if (
      CryptoJS.MD5(event.target.value).toString() ===
      "e73589d79cd25a65ddb5e4aa4d566034"
    ) {
      setAllowAccess(true);
    }
  };

  const handleSaveBtn = () => {
    if (!text.length) {
      if (!confirm("Вы хотите удалить событие?")) return;
    }

    setEditPush(false);
    setAllowAccess(false);

    const fileName = currentDate[0];
    setEventsArray(text.split("///"));
    valuesCopy[tab].events[isActiveLink] = text.split("///");
    if (!text.length) {
      setEventsArray([]);
      setActiveLink("");
      delete valuesCopy[tab].events[isActiveLink];
    }
    dispatch(updateEvents(valuesCopy));
    dispatch(editEvent({ fileName, editCell, text }));
  };

  const handleCancelBtn = () => {
    setEditPush(false);
    setAllowAccess(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setEditPush(false);
    }
  };

  const handleInputText = (event) => {
    const htmlValue = event.target.innerHTML.replace("&nbsp;", "");
    if (htmlValue.length <= 1) return;
    const xlsxValue = htmlValue
      .split("</p>")
      .map((item) => item.slice(33))
      .slice(0, -1)
      .join("///")
      .replace("<br>", "");
    setText(xlsxValue);
  };

  const handleKeyDownText = (event) => {
    if (event.target.textContent.length < 1 && event.key === "Backspace") {
      event.preventDefault();
      return;
    }
  };

  return (
    <div
      className={cn("Event", {
        "Event--visible": eventsArray.length,
      })}
    >
      <button
        className={styles["Event__btn"]}
        onClick={() => handleBackButton()}
      >
        {pageName}
      </button>
      <div className={styles["Event__header"]}>
        <h2 className={cn("Event__title")}>{isActiveLink}</h2>
        {!isEditPush && (
          <button
            className={styles["Event__edit-btn"]}
            onClick={() => handleEditBtn()}
          >
            <EditIcon />
          </button>
        )}
        {isEditPush && !isAllowAccess && (
          <input
            type="password"
            className={styles["Event__password"]}
            onInput={(event) => handleInputPass(event)}
            onKeyDown={(event) => handleKeyDown(event)}
            placeholder="Введите пароль"
            autoFocus
          />
        )}
        {isAllowAccess && (
          <div className={styles["Event__btns"]}>
            <button
              className={styles["Event__save-btn"]}
              onClick={() => handleSaveBtn()}
            >
              <SaveIcon />
            </button>
            <button
              className={styles["Event__save-btn"]}
              onClick={() => handleCancelBtn()}
            >
              <CancelIcon />
            </button>
          </div>
        )}
      </div>
      <div
        className={cn("Event__block", {
          "Event__block--edit": isEditing,
        })}
      >
        {!isAllowAccess && (
          <div className={styles["Event__text"]}>
            {eventsArray.map((event, index) => (
              <p key={index} className={styles["Event__item"]}>
                &mdash; {event}
              </p>
            ))}
          </div>
        )}
        {isAllowAccess && (
          <div
            className={styles["Event__text"]}
            contentEditable={isAllowAccess}
            onFocus={() => setEditing(true)}
            onBlur={() => setEditing(false)}
            onInput={(event) => handleInputText(event)}
            onKeyDown={(event) => handleKeyDownText(event)}
            suppressContentEditableWarning={true}
          >
            {eventsArray.map((event, index) => (
              <p key={index} className={styles["Event__item"]}>
                {event}
              </p>
            ))}
          </div>
        )}
        {/* {isAllowAccess && (
          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            className={styles["Event__editor"]}
          />
        )} */}
      </div>
    </div>
  );
};
