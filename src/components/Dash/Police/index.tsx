import classNames from "classnames/bind";

import { Card } from "../../common/Card";

import styles from "./Police.module.scss";
import { FC } from "react";
import { POLICE } from "../../../constants/pagesData";
import { TabName } from "../../../types/types";
import { useLoaderData, useParams } from "react-router-dom";
import { PAGES } from "../../../constants/pageNames";
import { ValuesApiResponse } from "../../../types/api";

export const Police: FC = () => {
  const cn = classNames.bind(styles);
  const params = useParams();

  const date = params.date ? params.date : "";
  const isDateRange = params.date?.includes("-");

  const { data, tab } = useLoaderData() as {
    data: ValuesApiResponse;
    tab: Extract<TabName, "police">;
  };

  const pageName = PAGES.find((page) => page.name === tab);

  const blocks = POLICE.filter((value) => value.type === "block");

  return (
    <div className={styles.Police}>
      <h2 className="dash__title">{pageName ? pageName.title : "Заголовок"}</h2>
      <div className={cn("dash__cards", "Police__cards")}>
        {blocks.map((block) => (
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
      <div className="dash__total">
        <h3 className="dash__total-title">...</h3>
        <div className="dash__total-block">
          <span className="dash__total-period">
            {isDateRange ? "за период" : date}
          </span>
          <div className="dash__total-values">
            <span className="dash__total-value">
              {data ? data.result.count : "..."}
            </span>
            ...
          </div>
        </div>
        <div className="dash__total-block">
          <span className="dash__total-period">...</span>
          <div className="dash__total-values">
            <span className="dash__total-value">
              {data ? data.result.total_count : "..."}
            </span>
            ...
          </div>
        </div>
      </div>
    </div>
  );
};
