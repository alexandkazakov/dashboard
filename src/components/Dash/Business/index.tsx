import styles from "./Business.module.scss";

import classNames from "classnames/bind";
import { FC } from "react";
import { Card } from "../../common/Card";
import { BUSINESS } from "../../../constants/pagesData";
import { useLoaderData, useParams } from "react-router-dom";
import { PAGES } from "../../../constants/pageNames";
import { TabName } from "../../../types/types";
import { ValuesApiResponse } from "../../../types/api";

export const Business: FC = () => {
  const cn = classNames.bind(styles);
  const params = useParams();

  const date = params.date ? params.date : "";
  const isDateRange = params.date?.includes("-");

  const { data, tab } = useLoaderData() as {
    data: ValuesApiResponse;
    tab: Extract<TabName, "business">;
  };

  const pageName = PAGES.find((page) => page.name === tab);

  return (
    <div className={styles.Business}>
      <h2 className={cn("Business__title", "dash__title")}>
        {pageName ? pageName.title : "Заголовок"}
      </h2>
      <div className={cn("dash__cards", "Business__cards")}>
        {BUSINESS.map((block) => (
          <Card key={block.name} title={block.title}>
            <div className="card__container">
              <span className="card__period">
                {isDateRange ? "за период" : date}
              </span>
              <div className="card__value">
                <span className="card__number-big">
                  {data ? data[block.name].count : "..."}
                </span>
                <span className="card__unit">...</span>
              </div>
              <div className="card__value">
                <span className="card__number-small">
                  {data ? data[block.name].sum : "..."}
                </span>
                <span className="card__unit">...</span>
              </div>
              <span className="card__period accent">...</span>
              <div className="card__value accent">
                <span className="card__number-small regular">
                  {data ? data[block.name].total_count : "..."}
                </span>
                <span className="card__unit">...</span>
              </div>
              <div className="card__value accent">
                <span className="card__number-small regular">
                  {data ? data[block.name].total_sum : "..."}
                </span>
                <span className="card__unit">...</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
