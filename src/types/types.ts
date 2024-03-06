export type TabName =
  | "infrastructure"
  | "business"
  | "police"
  | "monitoring"
  | "engineering"
  | "upload"
  | "error";

export type PageName = {
  name: Exclude<TabName, "upload" | "error">;
  title: string;
};
