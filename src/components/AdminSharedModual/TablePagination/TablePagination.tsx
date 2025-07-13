import {
  Box,
  Typography,
  Select,
  MenuItem,
  IconButton,
  FormControl,
  InputLabel,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

type Props = {
  page?: number;
  totalPages?: number;
  pageSize?: number;
  totalItems?: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
};

const TablePagination = ({
  page = 1,
  totalPages = 10,
  pageSize = 10,
  totalItems = 102,
  onPageChange,
  onPageSizeChange,
}: Props) => {
  return (
    <Box
      display="flex"
      justifyContent={{md:"flex-end", sm:'center'}}
      alignItems="center"
      flexWrap="wrap"
      gap={4}
      my={3}
     
    >
      {/* Page Size Selector */}
      <Box display="flex" alignItems="center" justifyContent={{sm:"center"}}  gap={1}>
        <Typography variant="body2">Showing</Typography>
        <FormControl size="small" sx={{ minWidth: 80 }}>
          <Select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            sx={{ borderRadius: "20px", fontSize: "0.875rem", px: 1 }}
          >
            {[10, 25, 50, 100].map((size) => (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography variant="body2">of {totalItems} Results</Typography>
      </Box>

      {/* Page Navigation */}
      <Box display="flex" alignItems="center" gap={2}>
        <Typography variant="body2">
          Page {page} of {totalPages}
        </Typography>

        <IconButton
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          sx={{ border: "1px solid #ccc", borderRadius: "50%" }}
        >
          <ChevronLeft />
        </IconButton>

        <IconButton
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          sx={{ border: "1px solid #ccc", borderRadius: "50%" }}
        >
          <ChevronRight />
        </IconButton>
      </Box>
    </Box>
  );
};

export default TablePagination;
