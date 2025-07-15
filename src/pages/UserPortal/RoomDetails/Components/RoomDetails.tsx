import UserHeader from "@/components/UserSharedModual/UserHeader/UserHeader"
import { Box, Typography } from "@mui/material"
import RoomImages from "./RoomImages"
import { useGetAdDetails} from "@/utils/Hooks/Hooks"
import { useParams } from "react-router-dom"
import { mainImage, sideImage1, sideImage2 } from "@/assets/Images"
import { Loader } from "@/components/AdminSharedModual/Loader/Loader"


const RoomDetails = () => {
     const { id } = useParams<{ id?: string}>();
    const {data, isError, isLoading} =  useGetAdDetails(id);
    const ad = data?.data?.ads?.room ?? null;
    console.log(ad);
    

const mainImg =  ad?.images[0]||mainImage
const sideImg1= ad?.images[1] || sideImage1
const sideImg2= ad?.images[2] || sideImage2




  if (isError || !ad) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h5" color="error">Error Loading Room</Typography>
        <Typography variant="body1">Room details could not be found or an error occurred.</Typography>
      </Box>
    );
  }

  if(isLoading) return <Loader/> 
    
  return (
    <Box className="details-container">
      <UserHeader title={ad?.roomNumber} description="Bogor, Indonesia" page="Room Details"/>
      <RoomImages imgOne={mainImg} imgTwo={sideImg1} imgThree={sideImg2}/>
    </Box>
  )
}

export default RoomDetails
