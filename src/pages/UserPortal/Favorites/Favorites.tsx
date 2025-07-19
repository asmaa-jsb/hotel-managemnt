import React, { useState, useEffect } from "react";
import { Box, Container, Grid, Typography, Pagination } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import FavoriteIcon from "@mui/icons-material/Favorite";
import UserHeader from "@/components/UserSharedModual/UserHeader/UserHeader";
import {
  useRemoveFavoriteRoom,
  useGetFavoriteRooms,
} from "@/utils/Hooks/Hooks";
import { toast } from "react-hot-toast";

const Favorites = () => {
  const { data } = useGetFavoriteRooms();
  const removeFavorite = useRemoveFavoriteRoom();

  const favoriteRooms = data?.data.favoriteRooms || [];

  const totalRoomCount = favoriteRooms.reduce(
    (acc, fav) => acc + fav.rooms.length,
    0
  );

  const roomsPerPage = 6;
  const [page, setPage] = useState(1);

  // ✅ flat rooms مع favoriteId
  const flatRooms = favoriteRooms.flatMap((fav) =>
    fav.rooms.map((room) => ({
      ...room,
      favoriteId: fav._id,
    }))
  );

  useEffect(() => {
    const totalPages = Math.ceil(flatRooms.length / roomsPerPage);
    if (page > totalPages) {
      setPage(totalPages || 1);
    }
  }, [flatRooms.length, page]);

  const paginatedRooms = flatRooms.slice(
    (page - 1) * roomsPerPage,
    page * roomsPerPage
  );

  const handleRemove = (roomId: string) => {
    removeFavorite.mutate(roomId, {
      onSuccess: () => {
        toast.success("Removed from favorites");
      },
      onError: (err: any) => {
        toast.error(err.response?.data?.message || "Failed to remove favorite");
      },
    });
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ my: 5 }}>
        <UserHeader
          title={`${totalRoomCount}`}
          description="All your favorite rooms"
          page="Your Favorites"
        />
        <Grid container spacing={3} sx={{ my: 4 }}>
          <AnimatePresence>
            {paginatedRooms.map((room) => (
              <Grid key={room._id} size={{ xs: 12, sm: 6, md: 4 }}>
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      borderRadius: 2,
                      overflow: "hidden",
                      boxShadow: 2,
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src={room.images[0]}
                      alt={room.roomNumber}
                      width="100%"
                      height="200"
                      style={{ objectFit: "cover" }}
                    />

                    <FavoriteIcon
                      onClick={() => handleRemove(room._id)}
                      sx={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        color: "#0F7AD3",
                        fontSize: 28,
                        cursor: "pointer",
                        transition: "0.3s",
                      }}
                    />

                    <Box sx={{ p: 2 }}>
                      <Typography fontWeight="bold">
                        {room.roomNumber || "Room"}
                      </Typography>
                      <Typography fontSize={14} color="text.secondary">
                        {room.capacity} guests • ${room.price} per night
                      </Typography>
                    </Box>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </AnimatePresence>
        </Grid>

        <Box mt={4} display="flex" justifyContent="center">
          <Pagination
            count={Math.ceil(flatRooms.length / roomsPerPage) || 1}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
          />
        </Box>
      </Container>
    </>
  );
};

export default Favorites;
