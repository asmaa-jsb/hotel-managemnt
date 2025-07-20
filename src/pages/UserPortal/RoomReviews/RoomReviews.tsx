
import { Loader } from "@/components/AdminSharedModual/Loader/Loader"
import NoData from "@/components/AdminSharedModual/NoData/NoData"
import UserHeader from "@/components/UserSharedModual/UserHeader/UserHeader"
import { useGetAllRoomReviews } from "@/utils/Hooks/Hooks"
import { Box,  Grid,  Rating,  Typography } from "@mui/material"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"


const RoomReviews = () => {
     
    
    const {id} = useParams();
         
        const {data, isLoading, isError} = useGetAllRoomReviews(id??'');
       const reviews = data?.data?.roomReviews ?? []  ;
      console.log(reviews);
      
       
     if (isLoading) return <Box sx={{paddingY:'150px'}}> <Loader /></Box>;
        if (isError ) {
        toast.error("Room reviews could not be found or an error occurred.")
        }
      
        
   

  return (
    <>
  
    <UserHeader title="Reviews" description="check our customers opinion!" page="Reviews" />
  {    reviews.length=== 0 ? <Box sx={{display:'flex', justifyContent:"center"}}><NoData/></Box>:(<Box  

      sx={{ maxWidth: reviews.length >2 ? {lg:"1350px", xs:'95%'} : {lg:"700px" , xs:'95%'} , mx: "auto", mb: { lg: 20, sm: 4, xs: 2 }, mt:"30px" }}
      >
           <Grid container spacing={2}>
           {
       reviews.map((review)=>(
              <Grid key={review._id} size={{lg:reviews.length > 2 ? 4 : 12 , md:6 , xs:12}}>
             <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "stretch",
                justifyContent: "space-between",
                gap: 10,
              boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
                paddingInline:'30px',
                paddingBlock:'30px 0',
                margin:'20px',
                height:{lg:'300px', xs:"450px"},
              }}
            >
              {/* Left Image Section */}
              <Box
                sx={{
                  flexShrink: 0,
                  position: "relative",
                   
                }}
              >
                <Box
                  sx={{
                    width: 150,
                    height: 150,
                    borderRadius: ' 15px 15px 100px 15px ',
                    backgroundColor: "#fff",
                    position: "absolute",
                    top: -15,
                    left: -15,
                    border: "1px solid #E5E5E5",
                    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                  }}
                />

                <Box
                  component="img"
                  src={review?.user?.profileImage}
                  alt="user image"
                  sx={{
                    width: 150,
                    height: 150,
                    borderRadius:   ' 15px 15px 100px 15px ',
                    objectFit: "cover",
                    position: "relative",
                    zIndex: 2,
                  }}
                />
              </Box>

              {/* Right Text Section */}
              <Box sx={{ flex: 1 }}>
                <Typography
                  fontWeight={600}
                  color="#081735"
                  mb={1}
                  fontSize={18}
                >
                 {review?.user?.userName}
                </Typography>

               <Rating name="read-only" value={review?.rating} readOnly />

                <Typography fontSize={20} fontWeight={500} color="#081735">
                {review?.room?.roomNumber}
                </Typography>
                <Typography
                  fontSize={20}
                  fontWeight={500}
                  color="#081735"
                  mb={2}
                  lineHeight={1.8}
                >
                  {review?.review}
                </Typography>
                <Typography fontSize={14} color="#9E9E9E" mb={4}>
             {  new Date(review.createdAt).toLocaleDateString()}
                </Typography>

       
              </Box>
            </Box>
            </Grid>
            ))
           }
            
           </Grid>
    </Box>)}
    
      
    </>
    
  )
}

export default RoomReviews
