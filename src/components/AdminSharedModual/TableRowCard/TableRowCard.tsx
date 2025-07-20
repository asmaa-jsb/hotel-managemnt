// src/components/AdminSharedModual/ReusableTable/TableRowCard.tsx
import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import type {Column,TableRowData} from "../ReusableTable/ReusableTable"

interface TableRowCardProps {
  row: TableRowData;
  columns: Column[];
  idKey: string;
  onView?: (id: string | number) => void;
  onEdit?: (id: string | number) => void;
  onDelete?: (id: string | number) => void;
  onMenuOpen: (event: React.MouseEvent<HTMLElement>, id: string | number) => void;
}

const TableRowCard: React.FC<TableRowCardProps> = ({
  row,
  columns,
  idKey,
  onMenuOpen,
}) => {
  const primaryColumn = columns[0]; // Assuming the first column is the primary identifier
  const otherColumns = columns.slice(1); // Other columns to display

  return (
    <Box
      sx={{
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        p: 2,
        mb: 2, // Margin bottom between cards
        backgroundColor: 'background.paper',
        boxShadow: 1, // Subtle shadow for card effect
      }}
    >
      {/* Primary Row Info (e.g., Room Number 100) */}
      {primaryColumn && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            {primaryColumn.label}: {primaryColumn.render ? primaryColumn.render(row[primaryColumn.id], row) : row[primaryColumn.id]}
          </Typography>
          <IconButton size="small" onClick={(e) => onMenuOpen(e, row[idKey])}>
            <MoreVertIcon />
          </IconButton>
        </Box>
      )}

      {/* Other details */}
      {otherColumns.map(column => (
        <Box key={column.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="body2" color="text.secondary">
            {column.label}
          </Typography>
          <Typography variant="body2" color="text.primary">
            {column.render ? column.render(row[column.id], row) : row[column.id]}
          </Typography>
        </Box>
      ))}

    </Box>
  );
};

export default TableRowCard;