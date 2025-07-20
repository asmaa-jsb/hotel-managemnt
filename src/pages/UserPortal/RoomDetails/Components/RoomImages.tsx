import { Box, Grid } from "@mui/material";
import type React from "react";

interface RoomImgsProps {
  imgOne: string;
  imgTwo: string;
  imgThree: string;
}
const RoomImages: React.FC<RoomImgsProps> = ({ imgOne, imgTwo, imgThree }) => {
   
  return (
   <Box>
       <Grid
      container
      sx={{ mt: "50px", padding: { xs: "20px" } }}
      spacing={1}
      justifyContent={"center"}
    >
      <Grid size={{ md: 6, xs: 12 }}  >
        <Box sx={{ height: { xs: 300, md: 500 }}}><img className="roomImage"  src={imgOne} alt="room image" /></Box>
      </Grid>
      <Grid size={{ md: 6, xs: 12 }} >
        <Box className="imgs-container" sx={{ gap: { xs: "8px", md: "10px" }}}>
          <Box sx={{ height: {md: 240 }}}>  <img className="roomImage" src={imgTwo} alt="room image" /></Box>
        <Box sx={{ height: {md: 240 }}}>  <img className="roomImage" src={imgThree} alt="room image" /></Box>
        </Box>
      </Grid>
    </Grid>
   </Box>

  );
};

export default RoomImages;
