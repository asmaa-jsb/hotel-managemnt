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
  TableRow,
  Box,
  useTheme, // Import useTheme
  useMediaQuery, // Import useMediaQuery
} from "@mui/material";
import type { MouseEvent } from "react";
import { useState } from "react";
import { FaEye, FaRegEdit, FaTrash } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Loader } from "../Loader/Loader";
import NoData from "@/components/AdminSharedModual/NoData/NoData";
import TableRowCard from "../TableRowCard/TableRowCard"

export interface TableRowData {
  [key: string]: any;
}

export interface Column {
  id: string;
  label: string;
  align?: "left" | "right" | "center";
  render?: (value: any, row: TableRowData) => React.ReactNode;
  // New props for responsiveness
  minWidth?: number; // For table cells
  width?: number;    // For table cells
  hideOnMobile?: boolean; // To hide columns in the table view on mobile
}

interface Props {
  columns: Column[];
  rows: TableRowData[];
  onView?: (id: string | number) => void;
  onEdit?: (id: string | number) => void;
  onDelete?: (id: string | number) => void;
  idKey?: string;
  loading?: boolean;
  model?: string;
  mode?: "search" | "filter" | "initial";
  // Add pagination props if needed for the parent (not handled here yet)
}

const ReusableTable = ({
  columns,
  rows,
  onView,
  onEdit,
  onDelete,
  idKey = "id",
  loading = false,
  model = "data",
  mode = "initial",
}: Props) => {
  const theme = useTheme();
  // Adjust breakpoint as needed (e.g., 'md' for tablet, 'sm' for phone)
  // The image shows a phone-like view, so 'md' or 'sm' is appropriate.
  const isMobileView = useMediaQuery(theme.breakpoints.down('md'));


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

  const showNoData = !loading && rows.length === 0;

  // Filter columns for table view on non-mobile screens
  const visibleTableColumns = columns.filter(column => !column.hideOnMobile);

  // Calculate the total number of columns for colSpan for the Table view
  const totalTableColumnsForColSpan = visibleTableColumns.length + 1; // +1 for the Actions column

  return (
    <>
      {/* Conditionally render Table or Card List */}
      {isMobileView ? (
        // Mobile Card List View
        <Box sx={{ p: { xs: 2, md: 0 } }}> {/* Add some padding on mobile */}
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <Loader mode={mode} model={model} />
            </Box>
          ) : showNoData ? (
            <Box sx={{ py: 4 }}>
              <NoData />
            </Box>
          ) : (
            <AnimatePresence>
              {rows.map((row) => (
                <motion.div
                  key={row[idKey]}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <TableRowCard
                    row={row}
                    columns={columns} // Pass all columns to the card to decide what to show
                    idKey={idKey}
                    onView={onView}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onMenuOpen={handleMenuOpen} // Pass the menu handler
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </Box>
      ) : (
        // Desktop Table View (your existing table with horizontal scroll)
        <Box sx={{ overflowX: 'auto', width: '100%' }}>
          <TableContainer className="table-container">
            <Table sx={{ minWidth: 650 }}> {/* Set a minimum width for horizontal scrolling */}
              <TableHead>
                <TableRow className="table-head-row">
                  {visibleTableColumns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align || "left"}
                      className="table-head-cell"
                      sx={{ minWidth: column.minWidth, width: column.width }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                  <TableCell align="left" className="table-head-cell">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={totalTableColumnsForColSpan} align="center">
                    
                        <Loader mode={mode} model={model} />
                   
                    </TableCell>
                  </TableRow>
                ) : showNoData ? (
                  <TableRow>
                    <TableCell colSpan={totalTableColumnsForColSpan} align="center">
                      <Box sx={{ py: 4 }}>
                        <NoData />
                      </Box>
                    </TableCell>
                  </TableRow>
                ) : (
                  <AnimatePresence>
                    {rows.map((row) => (
                      <motion.tr
                        key={row[idKey]}
                        className="table-body-row"
                        initial={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {visibleTableColumns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align || "left"}
                            className="table-cell-no-border"
                            sx={{ minWidth: column.minWidth, width: column.width }}
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
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {/* Shared Menu for both Table and Card View */}
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
    </>
  );
};

export default ReusableTable;