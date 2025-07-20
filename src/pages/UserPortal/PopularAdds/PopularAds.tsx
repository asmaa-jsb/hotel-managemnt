import React from "react";
import { Box, Container, Grid, Skeleton, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useAdsLanding } from "@/utils/Hooks/Hooks";
import ReusableAlertModal from "@/components/UserSharedModual/ReusableAlertModal/ReusableAlertModal";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { useNavigate } from "react-router-dom";
import { useAddToFavorites } from "@/utils/Hooks/Hooks";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import StarIcon from '@mui/icons-material/Star';
import CommentIcon from '@mui/icons-material/Comment';

const PopularAds = () => {
  const { data } = useAdsLanding();
  const ads = data?.data.ads || [];
  const isLoading = ads.length === 0;
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [addedFavorites, setAddedFavorites] = React.useState<string[]>([]);
  const LoginData = useSelector((state: RootState) => state.auth.loginData);
  const navigate = useNavigate();

  const addToFavorites = useAddToFavorites();

  const handleFavoriteClick = (roomId: string) => {
    if (!LoginData) {
      setAlertOpen(true);
      return;
    }

    addToFavorites.mutate(roomId, {
      onSuccess: (res) => {
        toast.success(res.message);
        setAddedFavorites((prev) => [...prev, roomId]);
        navigate(`favorites`);
      },
      onError: (error: any) => {
        const message =
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong";
        toast.error(message);
      },
    });
  };

  const renderFavoriteIcon = (roomId: string, size: number) => (
    <FavoriteBorderIcon
      sx={{
        color: addedFavorites.includes(roomId) ? "#0F7AD3" : "#fff",
        fontSize: size,
        cursor: "pointer",
      }}
      onClick={() => handleFavoriteClick(roomId)}
    />
  );

  const AdSkeletonCard = () => (
    <Box
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        position: "relative",
        bgcolor: "#fff",
      }}
    >
      <Skeleton variant="rectangular" height={160} animation="wave" />
      <Skeleton
        variant="rounded"
        width={100}
        height={24}
        animation="wave"
        sx={{ position: "absolute", top: 10, right: 10, borderRadius: 2 }}
      />
      <Box sx={{ p: 1.2 }}>
        <Skeleton variant="text" width="60%" height={20} />
        <Skeleton variant="text" width="40%" height={16} sx={{ mt: 0.5 }} />
      </Box>
    </Box>
  );

  return (
    <>
      <Container
        maxWidth="xl"
        sx={{ maxWidth: "1400px", mx: "auto", mt: { lg: 10, sm: 5, xs: 0 } }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          mb={2}
          className="Secondary-color"
        >
          Most popular ads
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ md: 4, xs: 12 }}>
            {isLoading ? (
              <Skeleton
                variant="rectangular"
                height={500}
                sx={{ borderRadius: 3 }}
              />
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Box
                  sx={{
                    height: { xs: 300, md: 500 },
                    borderRadius: 3,
                    overflow: "hidden",
                    position: "relative",
                    cursor: "pointer",
                    "&:hover .overlay": { opacity: 1 },
                  }}
                >
                  <img
                    src={ads[0]?.room.images[0]}
                    alt="room"
                    width="100%"
                    height="100%"
                    style={{ objectFit: "cover" }}
                  />

                  <Box
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      bgcolor: "hotpink",
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 2,
                      color: "#fff",
                      fontWeight: "bold",
                      fontSize: 14,
                      zIndex: 2,
                    }}
                  >
                    ${ads[0]?.room.price} per night
                  </Box>

                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 8,
                      left: 8,
                      color: "#fff",
                      zIndex: 2,
                    }}
                  >
                    <Typography fontWeight="bold">
                      {ads[0]?.room.roomNumber}
                    </Typography>
                    <Typography fontSize={13}>
                      {ads[0]?.room.capacity}
                    </Typography>
                  </Box>

                  <Box
                    className="overlay"
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      bgcolor: "rgba(0,0,0,0.4)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 2,
                      opacity: 0,
                      transition: "0.3s ease",
                      zIndex: 1,
                    }}
                  >
                    {renderFavoriteIcon(ads[0]?.room._id, 30)}
                    <VisibilityOutlinedIcon
                      sx={{ color: "#fff", fontSize: 30 }}
                      onClick={() => {
                        navigate(`/ad-details/${ads[0]?._id}`);
                      }}
                    />
                    {LoginData? <>
                             <StarIcon
                    sx={{ color: "#fff", fontSize: 30 }}
                    onClick={() => {
                      navigate(`/room-reviews/${ads[0]?.room._id}`);
                    }}
                    />
                  <CommentIcon
                    sx={{ color: "#fff", fontSize: 30 }}
                    onClick={() => {
                      navigate(`/room-comments/${ads[0]?.room._id}`);
                    }}
                  /></>: ""}
                </Box>
                  </Box>
                  
         
              </motion.div>
            )}
          </Grid>

          <Grid size={{ md: 8, xs: 12 }}>
            <Grid container spacing={3}>
              {(isLoading ? Array(4).fill(null) : ads.slice(1, 5)).map(
                (ad, i) => (
                  <Grid key={i} size={{ md: 6, xs: 6 }}>
                    {isLoading ? (
                      <AdSkeletonCard />
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                      >
                        <Box
                          sx={{
                            height: 240,
                            borderRadius: 3,
                            overflow: "hidden",
                            position: "relative",
                            cursor: "pointer",
                            "&:hover .overlay": { opacity: 1 },
                          }}
                        >
                          <img
                            src={ad.room.images[0]}
                            alt="room"
                            width="100%"
                            height="100%"
                            style={{ objectFit: "cover" }}
                          />

                          <Box
                            sx={{
                              position: "absolute",
                              top: 8,
                              right: 8,
                              bgcolor: "hotpink",
                              px: 1.2,
                              py: 0.5,
                              borderRadius: 2,
                              color: "#fff",
                              fontWeight: "bold",
                              fontSize: 13,
                              zIndex: 2,
                            }}
                          >
                            ${ad.room.price} per night
                          </Box>

                          <Box
                            sx={{
                              position: "absolute",
                              bottom: 8,
                              left: 8,
                              color: "#fff",
                              zIndex: 2,
                            }}
                          >
                            <Typography fontWeight="bold" fontSize={15}>
                              {ad.room.roomNumber}
                            </Typography>
                            <Typography fontSize={15}>
                              {ad.room.capacity}
                            </Typography>
                          </Box>

                          <Box
                            className="overlay"
                            sx={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              width: "100%",
                              height: "100%",
                              bgcolor: "rgba(0,0,0,0.4)",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              gap: 2,
                              opacity: 0,
                              transition: "0.3s ease",
                              zIndex: 1,
                            }}
                          >
                            {renderFavoriteIcon(ad.room._id, 28)}
                            <VisibilityOutlinedIcon
                              sx={{ color: "#fff", fontSize: 28 }}
                              onClick={() => {
                                navigate(`/ad-details/${ad._id}`);
                              }}
                            /> 
                 {LoginData?    <> <StarIcon
                    sx={{ color: "#fff", fontSize: 30 }}
                    onClick={() => {
                      navigate(`/room-reviews/${ads[0]?.room._id}`);
                    }}
                    />
                  <CommentIcon
                    sx={{ color: "#fff", fontSize: 30 }}
                    onClick={() => {
                      navigate(`/room-comments/${ads[0]?.room._id}`);
                    }}
                  /></>:''}
                          </Box>
                       
                    
                        </Box>
                      </motion.div>
                    )}
                  </Grid>
                )
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>

      <ReusableAlertModal
        open={alertOpen}
        onClose={() => setAlertOpen(false)}
        title="Login Required"
        message="You need to be logged in to add this to favorites."
        confirmText="Login Now"
        onConfirm={() => {
          setAlertOpen(false);
          navigate("/auth/login");
        }}
      />
    </>
  );
};

export default PopularAds;
