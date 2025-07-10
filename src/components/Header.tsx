import { Box, Button, Typography } from "@mui/material";

interface HeaderProps {
  title?: string;
  btnTitle?: string;
  description?: string;
  showBtn ? : boolean;
}

const Header = ({ title, btnTitle, description , showBtn = true}: HeaderProps) => {
  return (
    <Box
      //  px={3}
      px={{ xs: 2, sm: 4, md: 3 }}
      // py={{ xs: 2, sm: 3 }}
      sx={{ width: "94%", marginLeft: "15px" }}
      className="Header-bg"
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
        py={4}
        my={3}
      >
        <Box>
          <Typography variant="h5">{title || "Rooms Table Details"}</Typography>
          <Typography variant="body1">
            {description || "You can check all details"}
          </Typography>
        </Box>
        <Box>
         {
          showBtn? ( <Button
            className="Primary-color"
            variant="contained"
            sx={{ py: 1.5, px: 5, textTransform: "none" }}
          >
            {btnTitle || " Add New Room"}
          </Button>): ""
         }
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
