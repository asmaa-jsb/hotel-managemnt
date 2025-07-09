import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  IconButton,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import type { MouseEvent } from "react";
import { useState } from "react";
import { FaEye, FaRegEdit, FaTrash } from "react-icons/fa";
export interface TableRowData {
  [key: string]: any;
}

export interface Column {
  id: string;
  label: string;
  align?: "left" | "right" | "center";
  render?: (value: any, row: TableRowData) => React.ReactNode;
}

interface Props {
  columns: Column[];
  rows: TableRowData[];
  onView?: (id: string | number) => void;
  onEdit?: (id: string | number) => void;
  onDelete?: (id: string | number) => void;
  idKey?: string;
}

const ReusableTable = ({
  columns,
  rows,
  onView,
  onEdit,
  onDelete,
  idKey = "id",
}: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedId, setSelectedId] = useState<string | number | null>(null);

  const handleMenuOpen = (
    event: MouseEvent<HTMLElement>,
    id: string | number
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedId(null);
  };

  return (
    <TableContainer
      // sx={{ boxShadow: "unset" }}
      // component={Paper}
      className="table-container"
    >
      <Table>
        <TableHead>
          <TableRow className="table-head-row">
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align || "left"}
                className="table-head-cell"
              >
                {column.label}
              </TableCell>
            ))}
            <TableCell align="center" className="table-head-cell">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row) => (
            <TableRow key={row[idKey]} className="table-body-row">
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || "left"}
                  className="table-cell-no-border"
                >
                  {column.render
                    ? column.render(row[column.id], row)
                    : row[column.id]}
                </TableCell>
              ))}
              <TableCell align="right" className="table-cell-no-border">
                <IconButton onClick={(e) => handleMenuOpen(e, row[idKey])}>
                  <MoreVertIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>


      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className="action-menu"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {onView && (
          <MenuItem
            onClick={() => {
              if (selectedId) {
                onView(selectedId);
              }
              handleClose();
            }}
            className="action-item"
          >
            <FaEye className="action-icon" />
            <span>View</span>
          </MenuItem>
        )}
        {onEdit && (
          <MenuItem
            onClick={() => {
              if (selectedId) {
                onEdit(selectedId);
              }
              handleClose();
            }}
            className="action-item"
          >
            <FaRegEdit className="action-icon" />
            <span>Edit</span>
          </MenuItem>
        )}
        {onDelete && (
          <MenuItem
            onClick={() => {
              if (selectedId) {
                onDelete(selectedId);
              }
              handleClose();
            }}
            className="action-item"
          >
            <FaTrash className="action-icon" />
            <span>Delete</span>
          </MenuItem>
        )}
      </Menu>

    </TableContainer>
  );
};

export default ReusableTable;
