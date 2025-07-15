import { useAdsLanding } from "@/utils/Hooks/Hooks";
import {
  Box,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useNavigate } from "react-router-dom";

const PopularAds = () => {
  const navigate = useNavigate();
  const { data } = useAdsLanding();
  const ads = data?.data.ads || [];

  return (
    <Container maxWidth="xl" sx={{ maxWidth: "1400px", mx: "auto", mt: 10 }}>
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
          <Box
            sx={{
              height: { xs: 300, md: 500 },
              borderRadius: 3,
              overflow: "hidden",
              position: "relative",
              cursor: "pointer",
              "&:hover .overlay": {
                opacity: 1,
              },
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

            {/* Overlay */}
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
              <FavoriteBorderIcon sx={{ color: "#fff", fontSize: 30 }} />
              <VisibilityOutlinedIcon sx={{ color: "#fff", fontSize: 30 }}  onClick={()=>{
                        navigate(`/ad-details/${ads[0]?._id}`)
                      }}/>
            </Box>
          </Box>
        </Grid>

        <Grid size={{ md: 8, xs: 12 }}>
          <Grid container spacing={3}>
            {ads.slice(1, 5).map((ad) => (
              <Grid size={{ md: 6, xs: 6 }} key={ad._id}>
                <Box
                  sx={{
                    height: 240,
                    borderRadius: 3,
                    overflow: "hidden",
                    position: "relative",
                    cursor: "pointer",
                    "&:hover .overlay": {
                      opacity: 1,
                    },
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
                    <Typography fontSize={15}>{ad.room.capacity}</Typography>
                  </Box>

                  {/* Overlay */}
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
                    <FavoriteBorderIcon sx={{ color: "#fff", fontSize: 28 }} />
                    <VisibilityOutlinedIcon
                      sx={{ color: "#fff", fontSize: 28 }}
                      onClick={()=>{
                        navigate(`/ad-details/${ad?._id}`)
                      }}
                    />
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PopularAds;
