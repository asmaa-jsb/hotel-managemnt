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
} from "@mui/material";
import type { MouseEvent } from "react";
import { useState } from "react";
import { FaEye, FaRegEdit, FaTrash } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

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
    <TableContainer className="table-container">
      <Table>
        <TableHead>
          <tr className="table-head-row">
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align || "left"}
                className="table-head-cell"
              >
                {column.label}
              </TableCell>
            ))}
            <TableCell align="left" className="table-head-cell">
              Actions
            </TableCell>
          </tr>
        </TableHead>

        <TableBody>
          <AnimatePresence>
            {rows.map((row) => (
              <motion.tr
                key={row[idKey]}
                className="table-body-row"
                initial={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.4 }}
              >
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
              </motion.tr>
            ))}
          </AnimatePresence>
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
              selectedId && onView(selectedId);
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