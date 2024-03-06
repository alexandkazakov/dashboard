import classNames from "classnames/bind";

import styles from "./Table.module.scss";

export const Table = ({ columns, rows, date = null }) => {
  const cn = classNames.bind(styles);

  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${columns.length}, max-content)`,
      }}
      className={styles.Table__columns}
    >
      {columns.map((column) => (
        <div className={styles.Table__title} key={column.id}>
          {column.id === "date" ? date : column.name}
          {/* {column.date ? <p></p> : ""} */}
          {column.date && <span>{column?.date}</span>}
        </div>
      ))}

      {rows.map((row, index) =>
        row.map((item) => (
          <div
            id={styles[item.id]}
            className={cn("Table__body", {
              "Table__body--result":
                index === rows.length - 1 && item.id !== "name",
            })}
            key={item.id}
          >
            {item.value}
            <span>
              {item.percent || item.percent === 0 ? `(${item.percent}%)` : ""}
            </span>
          </div>
        ))
      )}
    </div>
  );
};
