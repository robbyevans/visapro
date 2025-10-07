import React from "react";
import * as S from "./styles";

interface ApplicationFilterProps {
  currentFilter: any;
  onFilterChange: (filter: any) => void;
  viewMode: "admin" | "user";
}

export const ApplicationFilter: React.FC<ApplicationFilterProps> = ({
  currentFilter,
  onFilterChange,
  viewMode,
}) => {
  const statusOptions =
    viewMode === "admin"
      ? [
          { value: "pending", label: "Pending", color: "#F59E0B" },
          { value: "invoiced", label: "In Review", color: "#3B82F6" },
          { value: "approved", label: "Approved", color: "#10B981" },
          { value: "rejected", label: "Rejected", color: "#EF4444" },
          { value: "completed", label: "Completed", color: "#8B5CF6" },
        ]
      : [
          { value: "pending", label: "Pending", color: "#F59E0B" },
          { value: "invoiced", label: "In Review", color: "#3B82F6" },
          { value: "approved", label: "Approved", color: "#10B981" },
          { value: "rejected", label: "Rejected", color: "#EF4444" },
          { value: "completed", label: "Completed", color: "#8B5CF6" },
        ];

  const timeRangeOptions = [
    { value: "last_week", label: "Last Week" },
    { value: "last_month", label: "Last Month" },
    { value: "last_3_months", label: "Last 3 Months" },
    { value: "last_6_months", label: "Last 6 Months" },
    { value: "all_time", label: "All Time" },
  ];

  const sortOptions = [
    { value: "created_at", label: "Date Created" },
    { value: "updated_at", label: "Last Updated" },
    { value: "status", label: "Status" },
  ];

  const handleStatusToggle = (statusValue: string) => {
    const newStatus = currentFilter.status?.includes(statusValue)
      ? currentFilter.status.filter((s: string) => s !== statusValue)
      : [...(currentFilter.status || []), statusValue];

    onFilterChange({ ...currentFilter, status: newStatus });
  };

  const handleTimeRangeChange = (timeRange: string) => {
    onFilterChange({ ...currentFilter, timeRange });
  };

  const handleSortChange = (sortBy: string) => {
    onFilterChange({ ...currentFilter, sortBy });
  };

  const handleSortOrderToggle = () => {
    onFilterChange({
      ...currentFilter,
      sortOrder: currentFilter.sortOrder === "asc" ? "desc" : "asc",
    });
  };

  return (
    <S.FiltersContainer>
      <S.FilterGroup>
        <S.FilterLabel>Status Filter</S.FilterLabel>
        <S.FilterDescription>
          {viewMode === "admin"
            ? "Focus on actionable applications (pending, in review)"
            : "View your active applications"}
        </S.FilterDescription>
        <S.StatusFilterGrid>
          {statusOptions.map((option) => (
            <S.StatusFilterChip
              key={option.value}
              selected={currentFilter.status?.includes(option.value)}
              color={option.color}
              onClick={() => handleStatusToggle(option.value)}
            >
              <S.StatusIndicator color={option.color} />
              {option.label}
            </S.StatusFilterChip>
          ))}
        </S.StatusFilterGrid>
      </S.FilterGroup>

      <S.FilterRow>
        <S.FilterGroup>
          <S.FilterLabel>Time Range</S.FilterLabel>
          <S.TimeRangeSelect
            value={currentFilter.timeRange || "last_3_months"}
            onChange={(e) => handleTimeRangeChange(e.target.value)}
          >
            {timeRangeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </S.TimeRangeSelect>
        </S.FilterGroup>

        <S.FilterGroup>
          <S.FilterLabel>Sort By</S.FilterLabel>
          <S.SortContainer>
            <S.SortSelect
              value={currentFilter.sortBy || "created_at"}
              onChange={(e) => handleSortChange(e.target.value)}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </S.SortSelect>
            <S.SortOrderButton
              onClick={handleSortOrderToggle}
              title={`Sort ${
                currentFilter.sortOrder === "asc" ? "descending" : "ascending"
              }`}
            >
              {currentFilter.sortOrder === "asc" ? "↑" : "↓"}
            </S.SortOrderButton>
          </S.SortContainer>
        </S.FilterGroup>
      </S.FilterRow>

      <S.ActiveFilters>
        <S.FilterLabel>Active Filters:</S.FilterLabel>
        <S.ActiveFilterTags>
          {currentFilter.status?.map((status: string) => {
            const option = statusOptions.find((opt) => opt.value === status);
            return (
              <S.ActiveFilterTag key={status} color={option?.color}>
                {option?.label}
                <S.RemoveFilterButton
                  onClick={() => handleStatusToggle(status)}
                >
                  ×
                </S.RemoveFilterButton>
              </S.ActiveFilterTag>
            );
          })}
          {currentFilter.timeRange &&
            currentFilter.timeRange !== "all_time" && (
              <S.ActiveFilterTag color="#6B7280">
                {
                  timeRangeOptions.find(
                    (opt) => opt.value === currentFilter.timeRange
                  )?.label
                }
                <S.RemoveFilterButton
                  onClick={() => handleTimeRangeChange("all_time")}
                >
                  ×
                </S.RemoveFilterButton>
              </S.ActiveFilterTag>
            )}
        </S.ActiveFilterTags>
      </S.ActiveFilters>
    </S.FiltersContainer>
  );
};
