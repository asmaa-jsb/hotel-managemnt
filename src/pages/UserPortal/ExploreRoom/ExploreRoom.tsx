
import { Grid, Pagination, Typography, Box, Card, CardContent, CardMedia, Button, Stack } from "@mui/material";
import { useAvailableRooms } from "../../../utils/Hooks/Hooks";
import { useState} from "react";
import { useLocation } from "react-router-dom";
import NoData from "@/components/AdminSharedModual/NoData/NoData";

const ExploreRoom = () => {
  const location = useLocation();
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

  console.log("Rooms Data:", rooms);  

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error loading rooms.</Typography>;

  if (!rooms.length) return <NoData/>; 

  return (
    <Box px={2} py={4}>
      <Typography variant="h4" fontWeight="bold" mb={4} textAlign="center">
        Explore Rooms
      </Typography>

      <Grid container spacing={3}>
        {rooms.map((room) => (
          <Grid item xs={12} sm={6} md={4} key={room._id}>
            <Card sx={{ borderRadius: 3, boxShadow: 4, height: "100%" }}>
              <CardMedia
                component="img"
                height="200"
                image={room.images[0] || "/placeholder.jpg"}
                alt={`Room ${room.roomNumber}`}
              />
              <CardContent>
                <Typography variant="h6" fontWeight={700} gutterBottom>
                  Room #{room.roomNumber}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  Capacity: {room.capacity} guest{room.capacity > 1 ? "s" : ""}
                </Typography>
                <Typography variant="body1" color="primary" fontWeight={600}>
                  Price: ${room.price} / night
                </Typography>
                {room.discount && (
                  <Typography color="error" variant="body2">
                    Discount: {room.discount}%
                  </Typography>
                )}
                <Stack mt={2} direction="row" justifyContent="flex-end">
                  <Button variant="contained" color="primary">
                    Book Now
                  </Button>
                </Stack>
              </CardContent>
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
        />
      </Box>
    </Box>
  );
};

export default ExploreRoom;
