import { Box, Grid} from "@mui/material"
import DashboardCard from "./DashboardCard"


const Dashboard = () => {
  return (
    <Box component="div" className="dashboard-container" >

     <Grid container gap={12} wrap="nowrap">
         <DashboardCard value="100" title="Rooms" />
         <DashboardCard value="100" title="Rooms" />
         <DashboardCard value="100" title="Rooms" />
        </Grid>
      
    </Box>
  )
}

export default Dashboard
