import { Box, Grid, Typography } from "@mui/material";
import FacilityCard from "./FacilityCard";
import { icon1, icon2, icon3, icon4, icon5, icon6, icon7, icon8 } from "@/assets/Images";
const RoomBooking = () => {
  return (
    <Grid container sx={{ mt: "5.625rem", padding:'20px' }}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Box>
          <Typography className="roomDescription">
            Minimal techno is a minimalist subgenre of techno music. It is
            characterized by a stripped-down aesthetic that exploits the use of
            repetition and understated development. Minimal techno is thought to
            have been originally developed in the early 1990s by Detroit-based
            producers Robert Hood and Daniel Bell.
          </Typography>
          <Typography className="roomDescription" sx={{ my: "10px" }}>
            Such trends saw the demise of the soul-infused techno that typified
            the original Detroit sound. Robert Hood has noted that he and Daniel
            Bell both realized something was missing from techno in the
            post-rave era.
          </Typography>
          <Typography className="roomDescription">
            Design is a plan or specification for the construction of an object
            or system or for the implementation of an activity or process, or
            the result of that plan or specification in the form of a prototype,
            product or process. The national agency for design: enabling
            Singapore to use design for economic growth and to make lives
            better.
          </Typography>
        </Box>
        <Grid container spacing={2} justifyContent={'center'} sx={{mt:'30px'}}>
           <Grid size={{xs:6, sm:3}}> 
            <FacilityCard icon={icon1} number={5} title="bedroom" />
          </Grid>
           <Grid size={{xs:6, sm:3}}> 
            <FacilityCard icon={icon2} number={5} title="bedroom" />
          </Grid>
           <Grid size={{xs:6, sm:3}}> 
            <FacilityCard icon={icon3} number={5} title="bedroom" />
          </Grid>
           <Grid size={{xs:6, sm:3}}> 
            <FacilityCard icon={icon4} number={5} title="bedroom" />
          </Grid>
           <Grid size={{xs:6, sm:3}}> 
            <FacilityCard icon={icon5} number={5} title="bedroom" />
          </Grid>
           <Grid size={{xs:6, sm:3}}> 
            <FacilityCard icon={icon6} number={5} title="bedroom" />
          </Grid>
        <Grid size={{xs:6, sm:3}}> 
            <FacilityCard icon={icon7} number={5} title="bedroom" />
          </Grid>
           <Grid size={{xs:6, sm:3}}> 
            <FacilityCard icon={icon8} number={5} title="bedroom" />
          </Grid>
        </Grid>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        
      </Grid>
    </Grid>
  );
};

export default RoomBooking;
