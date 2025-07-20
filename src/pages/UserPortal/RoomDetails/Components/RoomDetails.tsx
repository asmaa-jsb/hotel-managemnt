import UserHeader from "@/components/UserSharedModual/UserHeader/UserHeader"
import { Box, Typography } from "@mui/material"
import RoomImages from "./RoomImages"
import { useGetAdDetails } from "@/utils/Hooks/Hooks"
import { useParams } from "react-router-dom"
import { mainImage, sideImage1, sideImage2 } from "@/assets/Images"
import { Loader } from "@/components/AdminSharedModual/Loader/Loader"
import RoomBooking from "./RoomBooking"
import RoomRating from "./RoomRating"
import { useState } from "react"
import type { RootState } from "@/redux/store"
import { useSelector } from "react-redux"

const RoomDetails = () => {
  const { id } = useParams<{ id?: string }>();
  const { data, isError, isLoading } = useGetAdDetails(id||"");
  const ad = data?.data?.ads?.room ?? null;
 

  
   const loginData = useSelector((state: RootState) => state.auth.loginData);
  
  const [roomPrice, setRoomPrice]= useState((ad?.price || 0));


const handlePriceUpdate = (price: number) => {
  if(ad){
    setRoomPrice(price * ad?.capacity);
  }
};

  const mainImg = ad?.images[0] || mainImage;
  const sideImg1 = ad?.images[1] || sideImage1;
  const sideImg2 = ad?.images[2] || sideImage2;

    if (isLoading) return <Box sx={{paddingY:'150px'}}> <Loader /></Box>;
  if (isError || !ad) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h5" color="error">Error Loading Room</Typography>
        <Typography variant="body1">Room details could not be found or an error occurred.</Typography>
      </Box>
    );
  }

  



  return (
    <Box className="details-container" sx={{py:12}}>
      <UserHeader title={ad?.roomNumber} description="Bogor, Indonesia" page="Room Details" />
      <RoomImages imgOne={mainImg} imgTwo={sideImg1} imgThree={sideImg2} />
      <RoomBooking
        capacity={ad?.capacity}
        discount={ad?.discount}
        price={ad?.price}
  totalPrice={roomPrice}
        room={ad?._id}
         onPriceChange={handlePriceUpdate}
      />
    {loginData?<RoomRating roomId={ad?._id}/>:""}  
    </Box>
  );
}

export default RoomDetails;