import { Box, Divider, Grid, Rating, Typography } from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import { useState } from "react";
import ReusableButton from "@/components/UserSharedModual/ReusableButton/ReusableButton";
import { useAddComment, useAddReview } from "@/utils/Hooks/Hooks";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import type { Comment, Review } from "@/interfaces/Interfaces";
const labels: { [index: string]: string } = {
  0.5: "Very Useless",
  1: "Useless",
  1.5: "Very Poor",
  2: "Poor",
  2.5: "Ok",
  3: "Very Ok",
  3.5: "Good",
  4: "Very Good",
  4.5: "Excellent",
  5: "Very Excellent",
};
interface RoomRatingProps {
  roomId: string;
}
const RoomRating: React.FC<RoomRatingProps> = ({ roomId }) => {
  const [alreadyReviewed, setAlreadyReviewed] = useState(false);

  const { mutate: createReview, isPending: isCreating } = useAddReview();
  const { mutate: createComment, isPending: isAdding} = useAddComment();

  // for review form
const {
  handleSubmit: handleReviewSubmit,
  register: registerReview,
  reset: resetReview,
  formState: { isSubmitting: isReviewSubmitting },
} = useForm<Review>({ mode: 'onChange' });

// for comment form
const {
  handleSubmit: handleCommentSubmit,
  register: registerComment,
  reset: resetComment,
  formState: { isSubmitting: isCommentSubmitting },
} = useForm<Comment>({ mode: 'onChange' });

  const [value, setValue] = useState<number>(1);

  const onSubmitReview: SubmitHandler<Review> = (data: Review) => {
    const reviewData = {
      roomId,
      rating: value,
      review: data.review,
    };

    createReview(reviewData, {
      onSuccess: () => {
        toast.success("Review created successfully!");
       resetReview();
       setAlreadyReviewed(true)
      },
      onError: (error:any) => {
      
          toast.error(
           error?.response?.data?.message || "Failed to create Review, please try again later"
          );
        
      },
    });
  };

  const onSubmitComment: SubmitHandler<Comment> = (data: Comment)=>{
 const commentData = {
      roomId,
      comment: data.comment,
    };
   
    
      createComment(commentData, {
      onSuccess: () => {
        toast.success("Comment created successfully!");
        resetComment();
     
        
      },
      onError: (error:any) => {
     
          toast.error(
           error?.response?.data?.message || "Failed to create Comment, please try again later"
          );
        }
      },
    );
  }

  return (
    <Box className="rating-container">
      <Grid
        container
        alignItems={"center"}
        justifyContent={"center"}
        spacing={8}
        sx={{ paddingBlock: "60px", paddingInline: "20px" }}
      >
       {
        alreadyReviewed ? ( <Grid size={{ md: 5, xs: 12 }}>
          <Box component={"form"} onSubmit={handleReviewSubmit(onSubmitReview)}>
            <Typography
              className="main-title"
              sx={{ marginBottom: "20px" }}
              variant="h5"
              component={"h5"}
            >
              Rate
            </Typography>
            <Grid container alignItems={"start"}>
              <Rating
                sx={{ marginBottom: "20px" }}
                name="simple-controlled"
                value={value}
                precision={0.5}
                onChange={(event, newValue) => {
                  if (newValue == null || newValue < 1) {
                    setValue(1);
                  } else {
                    setValue(newValue);
                  }
                }}
              />
              <Box sx={{ marginInlineStart: 2, mt: 1 }}>{labels[value]}</Box>
            </Grid>
            <Typography
              className="main-title"
              sx={{ marginBottom: "20px" }}
              variant="h5"
              component={"h5"}
            >
              Message
            </Typography>
            <Textarea
              minRows={4}
              variant="outlined"
              sx={{ backgroundColor: "#fff", border: "1px solid #203FC7" }}
              {...registerReview("review")}
            />
            <Box sx={{ textAlign: { md: "right", xs: "center" }, pt: 4 }}>
              <ReusableButton
                type="submit"
                disabled={isReviewSubmitting}
                label={isCreating || isReviewSubmitting ? "Rating..." : "Rate"}
                padding="8px 85px"
              />
            </Box>
          </Box>
        </Grid>):  ( <Box sx={{textAlign:'center'}}>
        <Typography variant="h6" color="textSecondary">
          You have already submitted a review for this room.
        </Typography>
      </Box>)
       }
        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={{ backgroundColor: "#203FC7" }}
        />
        <Grid size={{ md: 5, xs: 12 }}>
          <Box component={"form"} onSubmit={handleCommentSubmit(onSubmitComment)}>
            <Typography
              className="main-title"
              sx={{ marginBottom: "65px" }}
              variant="h5"
              component={"h5"}
            >
              Add Your Comment
            </Typography>

            <Textarea
              minRows={6}
              variant="outlined"
              sx={{ backgroundColor: "#fff", border: "1px solid #203FC7" }}
              {...registerComment("comment")}
            />
            <Box sx={{ textAlign: { md: "right", xs: "center" }, pt: 4 }}>
              <ReusableButton
                type="submit"
                disabled={isCommentSubmitting || alreadyReviewed}
                label={isAdding || isCommentSubmitting ? "Sending..." : "send"}
                padding="8px 85px"
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RoomRating;
