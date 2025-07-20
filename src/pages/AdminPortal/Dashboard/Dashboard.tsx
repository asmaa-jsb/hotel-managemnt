import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import DashboardCard from "./DashboardCard";
import BookingChart from "./BookingChart";
import { useChart } from "@/utils/Hooks/Hooks";
import UsersChart from "./UsersChart";
import { Loader } from "@/components/AdminSharedModual/Loader/Loader";
import Header from "@/components/AdminSharedModual/Header/Header";

const Dashboard = () => {
  const {isLoading , data } = useChart();
  const charts = data?.data;

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isExtraSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); 

  if(isLoading) return <Loader/> 

  return (
    <>
  <Header title="Dashboard"  showBtn={false}/>
    <Box component="div" className="dashboard-container">
      
   
      <Grid
        container
     
        spacing={isExtraSmallScreen ? 2 : isSmallScreen ? 4 : 0}
        justifyContent={{sm:"center", lg:"space-between"}}
        alignItems="stretch" 
      
      >
        <Grid size ={{xs:12 ,sm:6 ,md:4 ,lg:3}}>
          <DashboardCard value={charts?.rooms} title="Rooms" />
        </Grid>
        <Grid size ={{xs:12 ,sm:6 ,md:4 ,lg:3}}>
          <DashboardCard value={charts?.facilities} title="Facilities" />
        </Grid>
        <Grid size ={{xs:12 ,sm:6 ,md:4 ,lg:3}}>
          <DashboardCard value={charts?.ads} title="Ads" />
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Grid
        container
        spacing={isSmallScreen ? 4 : 8}
        className="chart-container"
      >
        {/* Booking Chart */}
        <Grid size={{ xs:12 , md:6}}>
          
          <BookingChart
            completedValue={charts?.bookings?.completed}
            pendingValue={charts?.bookings?.pending}
          />
        </Grid>

        {/* Users Chart and Details */}
        <Grid size={{ xs:12 , md:6}}>
          <Box
            className="user-container"
          >
            <UsersChart adminValue={charts?.users?.admin} userValue={charts?.users?.user} />

            <Grid container justifyContent="space-between" sx={{ marginBlock: "20px" }}>
              <Typography variant="h6" component="h3" sx={{display:'flex', alignItems:'center'}}>
                <Box className="user-icon" />
                User
              </Typography>
              <Typography variant="h6" component="h3">
                {charts?.users?.user}
              </Typography>
            </Grid>

            <Grid container justifyContent="space-between">
              <Typography variant="h6"  component="h3" sx={{display:'flex', alignItems:'center'}}>
                <Box className="user-icon admin-icon" />
                Admin
              </Typography>
              <Typography variant="h6" component="h3">
                {charts?.users?.admin}
              </Typography>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
    </>
  );
};

export default Dashboard;


