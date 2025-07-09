import React from "react";
import { TextField, MenuItem, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

type DropdownOption = {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

type Props = {
  searchValue: string;
  onSearchChange: (value: string) => void;
  dropdowns?: DropdownOption[]; // Optional array of filters (e.g., price, capacity, etc.)
};

const ReusableSearchFilters = ({ searchValue, onSearchChange, dropdowns = [] }: Props) => {
  return (
    <div className="search-filters-container" style={{ display: "flex", gap: "1rem" }}>
      <TextField
        className="search-input"
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search..."
        variant="outlined"
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      {dropdowns.map((dropdown, index) => (
        <TextField
          key={index}
          select
          label={`Filter by ${dropdown.label}`}
          value={dropdown.value}
          onChange={(e) => dropdown.onChange(e.target.value)}
          size="small"
          className="dropdown-input"
        >
          <MenuItem value="">All</MenuItem>
          {[...new Set(dropdown.options)].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      ))}
    </div>
  );
};

export default ReusableSearchFilters;
