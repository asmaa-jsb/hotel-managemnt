import {
  Grid,
  Pagination,
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useAvailableRooms } from "../../../utils/Hooks/Hooks";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NoData from "@/components/AdminSharedModual/NoData/NoData";

const ExploreRoom = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const from = queryParams.get("from") ?? "";
  const to = queryParams.get("to") ?? "";
  const capacity = Number(queryParams.get("capacity")) || 1;

  const [page, setPage] = useState(1);
  const size = 12;

  const { data, isLoading, isError } = useAvailableRooms({
    page,
    size,
    startDate: from,
    endDate: to,
    guests: capacity,
  });

  const rooms = data ?? [];
  const totalCount = data?.length ?? 0;

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error loading rooms.</Typography>;
  if (!rooms.length) return <NoData />;

  return (
    <Box px={2} py={4}>
      <Typography variant="h4" fontWeight="bold" mb={4} textAlign="center">
        Explore Rooms
      </Typography>

      <Grid container spacing={3}>
        {rooms.map((room) => (
          <Grid item xs={12} sm={6} md={4} key={room._id}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 3,
                overflow: "hidden",
                height: 320, // ارتفاع ثابت للكارت
                position: "relative",
                display: "flex",
                flexDirection: "column",
                "&:hover .hover-btn": {
                  opacity: 1,
                  transform: "translate(-50%, -50%) scale(1)",
                },
              }}
            >
              {/* صورة الغرفة */}
              <CardMedia
                component="img"
                image={room.images[0] || "/placeholder.jpg"}
                alt={`Room ${room.roomNumber}`}
                sx={{
                  height: 180, // ارتفاع ثابت للصورة
                  width: "100%",
                  objectFit: "cover",
                }}
              />

              {/* شارة السعر */}
              <Box
                sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  backgroundColor: "#ff4081",
                  color: "white",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: "20px",
                  fontWeight: "bold",
                  fontSize: "0.85rem",
                }}
              >
                ${room.price} / night
              </Box>

              {/* معلومات الغرفة - مع glassmorphism */}
              <CardContent
                sx={{
                  flexGrow: 1,
                  background: "rgba(0, 0, 0, 0.7)",  
                  backdropFilter: "blur(6px)",            
                  WebkitBackdropFilter: "blur(6px)",        
                  color: "white",
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  border: "1px solid rgba(255, 255, 255, 0.2)", 
                }}
              >
                <Box>
                  <Typography fontWeight="bold" fontSize="1rem">
                    Room #{room.roomNumber}
                  </Typography>
                  <Typography fontSize="0.85rem">
                    Capacity: {room.capacity} guest{room.capacity > 1 ? "s" : ""}
                  </Typography>
                  {room.discount && (
                    <Typography fontSize="0.8rem" color="error.main">
                      Discount: {room.discount}%
                    </Typography>
                  )}
                </Box>
              </CardContent>

              {/* زر العين عند hover */}
              <Box
                className="hover-btn"
                onClick={() => navigate(`/ad-details/${room.adId}`)}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%) scale(0.8)",
                  opacity: 0,
                  transition: "all 0.3s ease-in-out",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  borderRadius: "50%",
                  padding: 1.5,
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    transform: "translate(-50%, -50%) scale(1.1)",
                  },
                }}
              >
                <VisibilityIcon sx={{ color: "#fff", fontSize: "28px" }} />
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box mt={5} display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil(totalCount / size)}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="primary"
          sx={{
            "& .MuiPaginationItem-root": {
              fontSize: "1.2rem",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default ExploreRoom;
