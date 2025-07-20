

import ConfirmDeleteModal from "@/components/AdminSharedModual/DeletModal/DeleteModal"
import { Loader } from "@/components/AdminSharedModual/Loader/Loader"
import NoData from "@/components/AdminSharedModual/NoData/NoData"
import UserHeader from "@/components/UserSharedModual/UserHeader/UserHeader"
import { useDeleteComment, useGetAllRoomComments, useUpdateComment } from "@/utils/Hooks/Hooks"
import { Box,  Grid, TextField, Typography } from "@mui/material"
import { useState } from "react"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"
import DeleteIcon from '@mui/icons-material/Delete';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import ReusableModal from "@/components/AdminSharedModual/ReusableModal/ReusableModal"
import ReusableButton from "@/components/UserSharedModual/ReusableButton/ReusableButton"
import { useSelector } from "react-redux"
import type { RootState } from "@/redux/store"
const RoomComments = () => {
    const [openDelete, setOpenDelete] = useState(false);
  const [CommentId, setCommentId] = useState<string | number>();
  const [Id, setId] = useState<string | number>();

   const loginData = useSelector((state: RootState) => state.auth.loginData);
  
  const {mutate: deleteComment} = useDeleteComment();
    const [openFormModal, setOpenFormModal] = useState(false);
      const [comment, setComment] = useState("");
      const {mutate: updateCommentMutate, isPending}=useUpdateComment();
    
    const {id} = useParams();
         
        const {data, isLoading, isError} = useGetAllRoomComments(id??'');
       
        
       const comments = data?.data?.roomComments ?? []  ;
      const handleShowDelete = (id: string | number) => {
    setOpenDelete(true);
   setCommentId(id);
  };
  const handleConfirmDelete = async () => {
    if (CommentId) {
      deleteComment(String(CommentId), {
        onSuccess: () => {
          setOpenDelete(false);
          toast.success("comment is deleted successfully!")
        },
        onError: (error: any) => {
          toast.error(error?.response?.data?.message|| "failed to delete this comment, please try again later!")
        },
      });
    }
  };
      const handleViewModal =(id: string)=>{
           setOpenFormModal(true)
           setId(id)
           const comment = comments.find((c) =>c._id === id);
           setComment(comment?.comment||"");
      }
  const onSubmit=(e:any)=>{
     e.preventDefault();
       if (!Id) {
    toast.error("Invalid comment Id");
    return;
  }
    updateCommentMutate({ id: String(Id), payload: { comment },  roomId: String(id)  },{
      
         onSuccess: () => {
          setOpenFormModal(false);
          toast.success("comment is Updated successfully!")
   
        },
        onError: (error: any) => {
          toast.error(error?.response?.data?.message|| "failed to update this comment, please try again later!")
        },
      
    })
  }
       
  if (isLoading) return <Box sx={{paddingY:'150px'}}> <Loader /></Box>;
        if (isError ) {
        toast.error("Room Comments could not be found or an error occurred.")
        return null;
        }
  return (
   <>
      <UserHeader title="Comments" description="check our customers opinion!" page="Comments" />
    
  {    comments.length=== 0 ? <Box sx={{display:'flex', justifyContent:"center"}}><NoData/></Box>:(<Box  

      sx={{ maxWidth: comments.length >2 ? {lg:"1350px", xs:'95%'} : {lg:"700px" , xs:'95%'} , mx: "auto", mb: { lg: 20, sm: 4, xs: 2 }, mt:"30px" }}
      >
           <Grid container spacing={2}>
           {
      comments.map((comment)=>(
              <Grid key={comment._id} size={{lg:comments.length > 2 ? 4 : 12 , md:6 , xs:12}}>
             <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "stretch",
                justifyContent: "space-between",
                gap: 10,
              boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
                paddingInline:'30px',
                paddingBlock:'20px',
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
                  src={comment?.user?.profileImage}
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
                 {comment?.user?.userName}
                </Typography>
                <Typography fontSize={20} fontWeight={500} color="#081735">
                {comment?.room?.roomNumber}
                </Typography>
                <Typography
                  fontSize={20}
                  fontWeight={500}
                  color="#081735"
                  mb={2}
                  lineHeight={1.8}
                >
                  {comment?.comment}
                </Typography>
                <Typography fontSize={14} color="#9E9E9E" mb={2}>
             {  new Date(comment?.createdAt).toLocaleDateString()}
                </Typography>
                {loginData?._id===comment?.user?._id?<Box >
                  <DeleteIcon sx={{fontSize:'25px', color:'red', cursor:'pointer'}} onClick={()=>handleShowDelete(comment?._id)}/>
                  <EditSquareIcon sx={{fontSize:'25px', color:'#1ABC9C',cursor:'pointer'}} onClick={()=>handleViewModal(comment?._id)}/>
                </Box>:''}
                
              </Box>
            </Box>
            </Grid>
            ))
           } 
           </Grid>
    </Box>)}
      <ReusableModal open={openFormModal} onClose={() => setOpenFormModal(false)}>
            <form
              onSubmit={
                onSubmit
              }
            >
              <Box display="flex" flexDirection="column" gap={3} p={2} minWidth={300}>
                <Typography variant="h6" fontWeight={600}>
                 Edit Comment
                </Typography>
    
                <TextField
                  variant="outlined"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  fullWidth
                  required
                />
    
                <ReusableButton
                disabled={isPending}
                  label={isPending? "Updating..." : "update"}
                  type="submit"
              
                />
              
              </Box>
            </form>
          </ReusableModal>
    
          <ConfirmDeleteModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleConfirmDelete}
        title="Delete This Comment?"
        description="Are you sure you want to delete this Comment?"
      />
    </>
  )
}

export default RoomComments




     
    
  
      
        

