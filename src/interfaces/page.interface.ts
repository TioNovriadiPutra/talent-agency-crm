import { PaginationType } from "./res.interface";

export interface TableDataType {
  type: "text" | "currency" | "date" | "double" | "status";
  value: string;
  mode?: "warning" | "success" | "danger";
}

export interface TableActionType {
  type: "edit" | "delete" | "nav";
  onClick?: () => void;
}

export interface TableType {
  data: TableDataType[];
  action: TableActionType;
}

export interface TablePaginationType {
  table: TableType[];
  pagination: PaginationType;
}

export interface ListBoxType {
  status: "success" | "warning" | "danger";
  title: string;
  subTitle: string;
  team: string;
}

export interface DropdownType {
  label: string;
  value: string;
}
