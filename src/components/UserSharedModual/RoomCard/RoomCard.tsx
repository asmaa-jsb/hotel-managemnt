// RoomCard.tsx
import { Box, Card, CardMedia, CardContent, Typography } from "@mui/material";
import type { Room } from "@/interfaces/ExploreRoomsInterface";

interface Props {
  room: Room;
}

const RoomCard = ({ room }: Props) => {
  return (
    <Card
      sx={{
        height: 320,
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: 3,
        // height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ position: "relative" }}>
<CardMedia
  component="img"
  image={room.images[0] || "/default-room.jpg"}
  alt={`Room ${room.roomNumber}`}
  sx={{
    height: 180,
    width: "100%",
    objectFit: "cover"
  }}
/>


        <Box
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            backgroundColor: "#f50057",
            px: 1.5,
            py: 0.5,
            borderRadius: "20px",
            color: "white",
            fontWeight: 500,
            fontSize: "14px",
          }}
        >
          ${room.price} / night
        </Box>
      </Box>

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" fontWeight={600}>
          Room #{room.roomNumber}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Capacity: {room.capacity} person(s)
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Facilities: {room.facilities.map(f => f.name).join(", ")}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RoomCard;
