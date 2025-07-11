import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import { Box, Grid, Typography } from "@mui/material"

const DashboardCard = ({ value, title }: { title: string; value: string;}) => {
  return (
   <Grid size={{ xs: 12, md:4, lg:4 }}>
       <Box className="dashboard-card">
            <Box>
              <Typography variant="h4">
                {value}
              </Typography>
              <Typography variant="h6" >
                {title}
              </Typography>
            </Box>
            <WorkOutlineIcon className="dashboard-cardIcon"/>
          </Box>
        </Grid>
         
  );
}
export default DashboardCard;