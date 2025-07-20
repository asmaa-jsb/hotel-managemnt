import { Loader } from "@/components/AdminSharedModual/Loader/Loader";
import NoData from "@/components/AdminSharedModual/NoData/NoData";
import ReusableButton from "@/components/UserSharedModual/ReusableButton/ReusableButton";
import UserHeader from "@/components/UserSharedModual/UserHeader/UserHeader";
import { useMyBookings } from "@/utils/Hooks/Hooks";
import { Box, Grid, Typography } from "@mui/material";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const AllBookings = () => {
 const navigate = useNavigate();

  const { data: ads, isLoading:isLoadingAd,isError: isErrorAd} = useMyBookings();
  const bookings = ads?.data?.myBooking ?? [];
  console.log(bookings);

  if ( isLoadingAd)
    return (
      <Box sx={{ paddingY: "150px" }}>
        {" "}
        <Loader />
      </Box>
    );
  if (isErrorAd ) {
    toast.error("Room bookings could not be found or an error occurred.");
  }
  return (
    <>
      <UserHeader
        title="bookings"
        description="check All Your Bookings"
        page="bookings"
      />
      {bookings.length === 0 ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <NoData />
        </Box>
      ) : (
        <Box
          sx={{
            maxWidth:
              bookings.length > 2
                ? { lg: "1350px", xs: "95%" }
                : { lg: "700px", xs: "95%" },
            mx: "auto",
            mb: { lg: 20, sm: 4, xs: 2 },
            mt: "30px",
          }}
        >
          <Grid container spacing={2}>
            {bookings.map((booking) => (
              <Grid
                key={booking._id}
                size={{ lg: bookings.length > 2 ? 4 : 12, md: 6, xs: 12 }}
              >
                <Box
                  sx={{
                    borderRadius:'30px',
                    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                    padding: "30px",
                    margin: "20px",
                    height: { lg: "250px", xs: "300px" },
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <Typography>
                      Start at:{" "}
                      {new Date(booking?.startDate).toLocaleDateString()}
                    </Typography>

                    <Typography sx={{ mb: "10px" }}>
                      End at: {new Date(booking?.endDate).toLocaleDateString()}
                    </Typography>

                    <Typography fontSize={18} mb={1}>
                      $ {booking?.totalPrice}
                    </Typography>
                    <Typography
                    
                      fontSize={16}
                      fontWeight={500}
                      sx={{
                        backgroundColor:
                          booking.status === "completed" ? "green" : "#f1b963",
                        padding: "5px 15px",
                        color: "#fff",
                        borderRadius: "15px",
                        mb: 5,
                        display:'inline',
                       
                      }}
                    >
                      {booking?.status}
                    </Typography> 
                   
                  </Box>
                {booking?.status==="completed"?"":(  
                  <ReusableButton sx={{  marginTop:'20px'}} label="Checkout" onClick={()=>{ navigate(`/payment/${booking?._id}`)}}/>

                )}
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </>
  );
};

export default AllBookings;
