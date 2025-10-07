import React from "react";
import type { ApplicationFilterProps, StatusOption } from "../types";
import * as S from "./styles";

export const ApplicationFilter: React.FC<ApplicationFilterProps> = ({
  currentFilter,
  onFilterChange,
  viewMode,
}) => {
  const statusOptions: StatusOption[] =
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
    const newStatus = currentFilter.status.includes(statusValue)
      ? currentFilter.status.filter((s: string) => s !== statusValue)
      : [...currentFilter.status, statusValue];

    onFilterChange({ ...currentFilter, status: newStatus });
  };

  const handleTimeRangeChange = (timeRange: string) => {
    onFilterChange({ ...currentFilter, timeRange });
  };

  const handleSortChange = (sortBy: string) => {
    // Type assertion since we know these are valid values
    onFilterChange({
      ...currentFilter,
      sortBy: sortBy as "created_at" | "updated_at" | "status",
    });
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
              selected={currentFilter.status.includes(option.value)}
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
            value={currentFilter.timeRange}
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
              value={currentFilter.sortBy}
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
          {currentFilter.status.map((status: string) => {
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
          {currentFilter.timeRange !== "all_time" && (
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
