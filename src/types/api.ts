export type DatesApiResponse = string[];

export type ValuesApiResponse = InfrastructureResponse &
  BusinessResponse &
  PoliceResponse &
  MonitoringResponse &
  EngineeringResponseItem[];

type InfrastructureResponseItem = {
  a: number;
  b: string;
};

export type InfrastructureResponse = {
  a: InfrastructureResponseItem;
  b: InfrastructureResponseItem;
  c: InfrastructureResponseItem;
  d: InfrastructureResponseItem;
  e: InfrastructureResponseItem;
};

type BusinessResponseItem = {
  a: number;
  b: number;
  c: number;
  d: number;
};

export type BusinessResponse = {
  a: BusinessResponseItem;
  b: BusinessResponseItem;
};

type PoliceResponseItem = {
  a: number;
  b: number;
};

export type PoliceResponse = {
  a: PoliceResponseItem;
  b: PoliceResponseItem;
  c: PoliceResponseItem;
};

type MonitoringResponseItem = {
  a: number;
  b: number;
};

export type MonitoringResponse = {
  a: MonitoringResponseItem;
  b: MonitoringResponseItem;
};

export type EngineeringResponseItem = {
  month:
    | "январь"
    | "февраль"
    | "март"
    | "апрель"
    | "май"
    | "июнь"
    | "июль"
    | "август"
    | "сентябрь"
    | "октябрь"
    | "ноябрь"
    | "декабрь";
};
