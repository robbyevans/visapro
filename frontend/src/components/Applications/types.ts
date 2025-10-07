export interface FilterState {
  status: string[];
  timeRange: string;
  sortBy: "created_at" | "updated_at" | "status";
  sortOrder: "asc" | "desc";
}

export interface StatusOption {
  value: string;
  label: string;
  color: string;
}

export interface ApplicationFilterProps {
  currentFilter: FilterState;
  onFilterChange: (filter: FilterState) => void;
  viewMode: "admin" | "user";
}
