import classNames from "classnames/bind";

import { Card } from "../../common/Card";

import styles from "./Engineering.module.scss";
import { BarChart, XAxis, LabelList, Bar } from "recharts";
import { FC } from "react";
import { TabName } from "../../../types/types";
import { useColorIcons } from "../../../hooks/useColorIcons";
import { useLoaderData } from "react-router-dom";
import { PAGES } from "../../../constants/pageNames";
import { ValuesApiResponse } from "../../../types/api";

export const Engineering: FC = () => {
  const cn = classNames.bind(styles);

  const colorIcon = useColorIcons();

  const { data, tab } = useLoaderData() as {
    data: ValuesApiResponse;
    tab: Extract<TabName, "engineering">;
  };

  const pageName = PAGES.find((page) => page.name === tab);

  return (
    <div className={styles.Engineering}>
      <h2 className="dash__title">{pageName ? pageName.title : "Заголовок"}</h2>
      <div className={cn("Engineering")}>
        <Card>
          <div className={styles["chart"]}>
            <BarChart
              width={570}
              height={400}
              data={data}
              margin={{ top: 5, bottom: -5 }}
            >
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: colorIcon,
                  fontWeight: 300,
                  fontSize: "16px",
                }}
              />
              <Bar dataKey="..." fill="#06DEEC">
                <LabelList
                  dataKey="..."
                  position="top"
                  fill={colorIcon}
                  fontSize="16px"
                  fontWeight="300"
                />
              </Bar>
              <Bar dataKey="..." fill="#9747FF">
                <LabelList
                  dataKey="..."
                  position="top"
                  fill={colorIcon}
                  fontSize="16px"
                  fontWeight="300"
                />
              </Bar>
              <Bar dataKey="..." fill="#5C6AFF">
                <LabelList
                  dataKey="..."
                  position="top"
                  fill={colorIcon}
                  fontSize="16px"
                  fontWeight="300"
                />
              </Bar>
            </BarChart>

            <div className={styles["chart__legends"]}>
              <div className={styles["chart__legend"]}>
                <div className={styles["chart__legendHeader"]}>
                  <div className={styles["chart__legendMarker-marked"]}></div>
                  <span className={styles["chart__legendName"]}>...</span>
                </div>
                <div className={styles["chart__value"]}>
                  <span className={styles["chart__number"]}>...</span>
                  <span className={styles["chart__span"]}>...</span>
                </div>
                <div className={styles["chart__legendHeader"]}>
                  <div className={styles["chart__legendMarker-vsp"]}></div>
                  <span className={styles["chart__legendName"]}>...</span>
                </div>
                <div className={styles["chart__value"]}>
                  <span className={styles["chart__number"]}>...</span>
                  <span className={styles["chart__span"]}>...</span>
                </div>
                <div className={styles["chart__legendHeader"]}>
                  <div className={styles["chart__legendMarker-success"]}></div>
                  <span className={styles["chart__legendName"]}>...</span>
                </div>
                <div className={styles["chart__value"]}>
                  <span className={styles["chart__number"]}>...</span>
                  <span className={styles["chart__span"]}>...</span>
                </div>
              </div>

              <div className={styles["chart__total"]}>
                <span
                  className={styles["chart__span"]}
                  style={{ display: "block" }}
                >
                  ...
                </span>
                <div style={{ display: "flex", gap: "8px", alignItems: "end" }}>
                  <span className={styles["chart__number"]}>...</span>
                  <span className={styles["chart__span"]}>...</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
