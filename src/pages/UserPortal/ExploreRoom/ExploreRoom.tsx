import { Grid, Pagination, Typography, Box } from "@mui/material";
import RoomCard from "../../../components/UserSharedModual/RoomCard/RoomCard";
import { useExoloreRooms } from "../../../utils/Hooks/Hooks";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const ExploreRoom = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const from = queryParams.get('from') ?? '';
  const to = queryParams.get('to') ?? '';
  const capacity = Number(queryParams.get('capacity')) || 1;

  const [page, setPage] = useState(1);
  const size = 12;

  const { data, isLoading, isError } = useExoloreRooms(
    page,
    size,
    from,
    to,
    capacity
  );

const rooms = data?.data?.rooms ?? [];
const totalCount = data?.data?.totalCount ?? 0;

console.log(rooms);


  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error loading rooms.</Typography>;

  return (
    <Box px={2} py={4}>
      <Typography variant="h5" fontWeight={700} mb={3}>
        All Rooms
      </Typography>

      <Grid container columns={12} spacing={2}>
        {rooms.map((room) => (
          <Grid size={{xs:12,sm:6,md:4,lg:4}}  key={room._id}>
            <RoomCard room={room} />
          </Grid>
        ))}
      </Grid>

      <Box mt={4} display="flex" justifyContent="center">
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
