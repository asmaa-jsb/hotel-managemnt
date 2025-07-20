import { Avatar, Box, Divider, Grid, Paper, Typography } from "@mui/material";
import { useUserProfile } from "@/utils/Hooks/Hooks";
import type { UserProfile } from "@/interfaces/Interfaces";
import { Loader } from "@/components/AdminSharedModual/Loader/Loader";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const Profile = () => {
  const { id } = useParams<{ id?: string }>();
  const { data, isLoading, isError } = useUserProfile(id || "");
  const user: UserProfile | undefined = data?.data?.user;

  if (isLoading) return <Loader />;
  if (isError || !user)
    return (
      <Typography align="center" color="error" mt={5}>
        Error loading profile.
      </Typography>
    );

  return (
    <Grid container justifyContent="center" sx={{ mt: 8, mb: 8 }}>
      <Grid size={{ md: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper
            elevation={4}
            sx={{
              p: 4,
              borderRadius: 4,
              textAlign: "center",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
            }}
          >
            <Avatar
              src={user.profileImage}
              alt="Profile"
              sx={{
                width: 100,
                height: 100,
                mx: "auto",
                mb: 2,
                border: "3px solid #1976d2",
              }}
            />
            <Typography variant="h6" fontWeight={700}>
              {user.userName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.email}
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ textAlign: "left", px: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Country:</strong> {user.country}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Phone Number:</strong> {user.phoneNumber}
              </Typography>
              <Typography variant="body2">
                <strong>Role:</strong> {user.role}
              </Typography>
            </Box>
          </Paper>
        </motion.div>
      </Grid>
    </Grid>
  );
};

export default Profile;
