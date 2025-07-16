import { Box, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles"; 

interface HeaderProps{
title: string;
page : string;
description:string;
}
const UserHeader: React.FC<HeaderProps>  =({title, page,description}) => {
  const theme = useTheme(); 

  return (
    <Box >
      <Grid
        container
        alignItems="center" 
        justifyContent={{ xs: 'center', sm: 'space-between' }} 
        spacing={{ xs: 2, sm: 0 }} 
      >
        {/* Left Section: Home / Room Details */}
        <Grid size={{xs:12, sm:4}}  sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
          <Box display="flex" alignItems="center" justifyContent={{ xs: 'center', sm: 'flex-start' }}>
            <Link to="/home" style={{ textDecoration: 'none', color: theme.palette.text.secondary }}>
              <Typography variant="body2" sx={{ '&:hover': { textDecoration: 'underline' } }}>
                Home
              </Typography>
            </Link>
            <Typography
              component="span"
              sx={{ marginInline: theme.spacing(2.5), fontSize: '1rem', color: theme.palette.text.disabled }}
            >
              /
            </Typography>
            <Typography variant="body2" color="text.primary">
             {page}
            </Typography>
          </Box>
        </Grid>

        {/* Center Section: H1 and P */}
        <Grid size={{xs:12, sm:4}} sx={{ textAlign: 'center' }}>
          <Typography component="h1"
            sx={{
              fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.8rem' }, // Responsive font size
              fontWeight: 'bold',
              color: theme.palette.text.primary,
              mb: 0.5, // Small margin-bottom
              lineHeight: 1.2,
            }}
          >
           {title}
          </Typography>
          <Typography
            component="p"
            variant="body1"
            sx={{
              fontSize: { xs: '0.9rem', sm: '1rem' }, // Responsive font size
              color: theme.palette.text.secondary,
            }}
          >
            {description}
          </Typography>
        </Grid>

        {/* Right Section (empty ) */}
        <Grid size={{xs:12, sm:4}} sx={{ display: { xs: 'none', sm: 'block' } }} />
       

      </Grid>
    </Box>
  );
};

export default UserHeader;
