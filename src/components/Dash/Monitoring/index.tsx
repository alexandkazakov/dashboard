import classNames from "classnames/bind";

import { Card } from "../../common/Card";

import styles from "./Monitoring.module.scss";
import { FC } from "react";
import { MONITORING } from "../../../constants/pagesData";
import { useLoaderData, useParams } from "react-router-dom";
import { PAGES } from "../../../constants/pageNames";
import { ValuesApiResponse } from "../../../types/api";
import { TabName } from "../../../types/types";

export const Monitoring: FC = () => {
  const cn = classNames.bind(styles);
  const params = useParams();

  const date = params.date ? params.date : "";
  const isDateRange = params.date?.includes("-");

  const { data, tab } = useLoaderData() as {
    data: ValuesApiResponse;
    tab: Extract<TabName, "monitoring">;
  };

  const pageName = PAGES.find((page) => page.name === tab);

  return (
    <div className={styles.Monitoring}>
      <h2 className="dash__title">{pageName ? pageName.title : "Заголовок"}</h2>
      <div className={cn("dash__cards", "Monitoring__cards")}>
        {MONITORING.map((block) => (
          <Card key={block.name} title={block.title}>
            <div className="card__container">
              <div>
                <span>{isDateRange ? "за период" : date}</span>
                <div className="card__value">
                  <span className="card__number-big">
                    {data ? data[block.name].count : "..."}
                  </span>
                  <span className="card__unit">...</span>
                </div>
              </div>
              <div>
                <span className="accent">с начала года</span>
                <div className="card__value accent regular">
                  <span className="card__number-small">
                    {data ? data[block.name].total_count : "..."}
                  </span>
                  <span className="card__unit">...</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
