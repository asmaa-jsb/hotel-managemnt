import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import { Box, Typography } from "@mui/material"

const DashboardCard = ({ value, title }: { title: string; value: string;}) => {
  return (

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
     
         
  );
}
export default DashboardCard;