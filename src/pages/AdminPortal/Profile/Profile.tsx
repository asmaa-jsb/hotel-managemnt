import { Box, Divider, Grid, Typography } from "@mui/material"
import { useUserProfile } from '@/utils/Hooks/Hooks';
import type { UserProfile } from "@/interfaces/Interfaces";
import { Loader } from "@/components/AdminSharedModual/Loader/Loader";
import { useParams } from "react-router-dom";

const Profile = () => {  
  const { id } = useParams<{ id?: string }>();
      const { data, isLoading, isError } = useUserProfile<UserProfile>(id);
     const user = data?.data?.user;
   
     
       if(isLoading) return <Loader/> 
     
     
   
  return (
  
         <Grid container justifyContent={"center"}>
            <Grid size={{md:6}}>
             <Box className="profile-container">
             <Box className="img-Container">
                  <img className="profileImg" src={user?.profileImage} alt="profile image" />
               <Typography sx={{marginBlock:'10px', fontSize:'23px', fontWeight:'700'}}>{user?.userName}</Typography>
               <Typography sx={{color:"grey"}}>{user?.email}</Typography>
             </Box>
                  <Divider sx={{marginBlock:'20px'}} />
              <Box sx={{textTransform:'capitalize' , marginBlock:'20px'}}>
               <Typography><Typography className="profile-span"component={'span'}>Country : </Typography>{user?.country}</Typography>
               <Typography><Typography className="profile-span"component={'span'} >Phone Number : </Typography>{user?.phoneNumber}</Typography>
               <Typography><Typography className="profile-span"component={'span'} >Role : </Typography>{user?.role}</Typography>
              </Box>


             </Box>
            </Grid>

         </Grid>
     
  
  )
}

export default Profile
