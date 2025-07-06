import React from "react";
import { TextField, MenuItem, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

type Props = {
  searchValue: string;
  onSearchChange: (value: string) => void;
  tagValue: string;
  onTagChange: (value: string) => void;
  facilityValue: string;
  onFacilityChange: (value: string) => void;
  tags: string[];
  facilities: string[];
};

function ReusableSearchFilters({
  searchValue,
  onSearchChange,
  tagValue,
  onTagChange,
  facilityValue,
  onFacilityChange,
  tags,
  facilities,
}: Props) {
  return (
    <div className="search-filters-container">
      <TextField
        className="search-input"
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search by number ..."
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

      <TextField
        className="dropdown-input"
        select
        value={tagValue}
        onChange={(e) => onTagChange(e.target.value)}
        size="small"
      >
        <MenuItem value="">Tag</MenuItem>
        {tags.map((tag) => (
          <MenuItem key={tag} value={tag}>
            {tag}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        className="dropdown-input"
        select
        value={facilityValue}
        onChange={(e) => onFacilityChange(e.target.value)}
        size="small"
      >
        <MenuItem value="">Facilities</MenuItem>
        {facilities.map((fac) => (
          <MenuItem key={fac} value={fac}>
            {fac}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
}

export default ReusableSearchFilters;
