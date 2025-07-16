import React from "react";
import { Box, Container, Grid, Skeleton, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useAdsLanding } from "@/utils/Hooks/Hooks";
import ReusableAlertModal from "@/components/UserSharedModual/ReusableAlertModal/ReusableAlertModal";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { useNavigate } from "react-router-dom";

const PopularAds = () => {
  const { data } = useAdsLanding();
  const ads = data?.data.ads || [];
  console.log("frrr", ads);
  const isLoading = ads.length === 0;

  const [alertOpen, setAlertOpen] = React.useState(false);
  const LoginData = useSelector((state: RootState) => state.auth.loginData);
  const navigate = useNavigate();

  const handleFavoriteClick = () => {
    if (!LoginData) {
      setAlertOpen(true);
      return;
    }

    // ✅ تابع الفيفوريت هنا إذا مسجل
    console.log("Added to favorites");
  };

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
              <Box
                sx={{
                  position: "relative",
                  borderRadius: 3,
                  overflow: "hidden",
                  bgcolor: "#fff",
                }}
              >
                <Skeleton
                  variant="rectangular"
                  height={500}
                  sx={{ borderRadius: 3 }}
                />
                <Skeleton
                  variant="rounded"
                  width={120}
                  height={28}
                  animation="wave"
                  sx={{ position: "absolute", top: 12, right: 12 }}
                />
                <Box sx={{ p: 2 }}>
                  <Skeleton variant="text" width="70%" height={28} />
                  <Skeleton
                    variant="text"
                    width="50%"
                    height={22}
                    sx={{ mt: 1 }}
                  />
                </Box>
              </Box>
            ) : (
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
                  <Typography fontSize={13}>{ads[0]?.room.capacity}</Typography>
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
                  <FavoriteBorderIcon
                    sx={{ color: "#fff", fontSize: 30, cursor: "pointer" }}
                    onClick={handleFavoriteClick}
                  />
                  <VisibilityOutlinedIcon
                    sx={{ color: "#fff", fontSize: 30 }}
                    onClick={() => {
                      navigate(`/ad-details/${ads[0]?._id}`);
                    }}
                  />
                </Box>
              </Box>
            )}
          </Grid>

          <Grid size={{ md: 8, xs: 12 }}>
            <Grid container spacing={3}>
              {(isLoading ? Array(4).fill(null) : ads.slice(1, 5)).map(
                (ad, i) => (
                  <Grid size={{ md: 6, xs: 6 }} key={i}>
                    {isLoading ? (
                      <AdSkeletonCard />
                    ) : (
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
                          <FavoriteBorderIcon
                            sx={{
                              color: "#fff",
                              fontSize: 28,
                              cursor: "pointer",
                            }}
                            onClick={handleFavoriteClick}
                          />
                          <VisibilityOutlinedIcon
                            sx={{ color: "#fff", fontSize: 28 }}
                            onClick={() => {
                              navigate(`/ad-details/${ad?._id}`);
                            }}
                          />
                        </Box>
                      </Box>
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
