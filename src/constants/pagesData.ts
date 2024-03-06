type InfrastrucureItem = {
  name: string;
  title: string;
  type: "block" | "result";
};

type BusinessItem = {
  name: string;
  title: string;
};

type PoliceItem = {
  name: string;
  title: string;
  type: "block" | "result";
};

type MonitoringItem = {
  name: string;
  title: string;
  type: "block";
};

export const INFRASTRUCTURE: InfrastrucureItem[] = [];

export const BUSINESS: BusinessItem[] = [];

export const POLICE: PoliceItem[] = [];

export const MONITORING: MonitoringItem[] = [];
