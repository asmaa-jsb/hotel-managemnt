import {
  TextField,
  Select,
  MenuItem,
  Button,
  Box,
  Typography,
  InputLabel,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  useCreateAd,
  useCreateRoom,
  useRoomDetails,
  useUpdateRoom,
} from "@/utils/Hooks/Hooks";
import { toast } from "react-hot-toast";
import Header from "@/components/AdminSharedModual/Header/Header";
import type { CreateAdsInput } from "@/interfaces/AdsInterface";
import { createADS } from "@/services/API/Adsapi";

const AdsForm: React.FC = () => {
  const { roomId } = useParams<{ roomId?: string }>();
  const isEditMode = Boolean(roomId);
  const navigate = useNavigate();
  const { mutate: createAd, isPending: isCreating } = useCreateAd();
  const { mutate: updateRoom, isPending: isUpdating } = useUpdateRoom();
  const { data: roomDetails, isLoading: isLoadingDetails } =
    useRoomDetails(roomId);

  const [status, setStatus] = useState<boolean>(true);

  const handleChange = (event: any) => {
    setStatus(event.target.value === "true");
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    if (isEditMode && roomDetails) {
      reset({
        room: roomDetails.room,
        discount: roomDetails.discount,
      });
      setStatus(roomDetails.isActive ?? true);
    }
  }, [isEditMode, roomDetails, reset]);

  const onSubmit = (data: any) => {
    const adsData: CreateAdsInput = {
      room: data.room,
      discount: Number(data.discount),
      isActive: status,
    };

    if (isEditMode) {
      updateRoom(
        { id: roomId!, data: adsData },
        {
          onSuccess: () => {
            toast.success("Ad updated successfully!");
            navigate("/ads");
          },
          onError: () => toast.error("Failed to update ad."),
        }
      );
    } else {
      createADS(adsData, {
        onSuccess: () => {
          toast.success("Ad created successfully!");
          reset();
          navigate("/ads");
        },
        onError: () => toast.error("Failed to create ad."),
      });
    }
  };

  if (isEditMode && isLoadingDetails) {
    return <Typography>Loading ad details...</Typography>;
  }

  return (
    <>
      <Header
        title="Ads Management"
        btnTitle="Ads List"
        linkTo="/ads"
        showBtn={true}
      />
      <Box className="room-form-container">
        <Typography className="form-title" variant="h6" gutterBottom>
          {isEditMode ? "Edit Ad" : "Add New Ad"}
        </Typography>

        <form className="room-form" onSubmit={handleSubmit(onSubmit)}>
          <Box className="form-row">
            <TextField
              placeholder="Room ID"
              fullWidth
              variant="standard"
              className="custom-input"
              {...register("room", {
                required: "Room is required",
              })}
              error={!!errors.room}
              helperText={errors.room?.message as string}
            />
          </Box>

          <Box className="form-row">
            <TextField
              placeholder="Discount"
              variant="standard"
              className="custom-input"
              type="number"
              {...register("discount", {
                required: "Discount is required",
                min: { value: 0, message: "Discount must be positive" },
              })}
              error={!!errors.discount}
              helperText={errors.discount?.message as string}
            />

            <Box sx={{ minWidth: 120, ml: 2 }}>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                id="status-select"
                value={status.toString()}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value="true">Active</MenuItem>
                <MenuItem value="false">Inactive</MenuItem>
              </Select>
            </Box>
          </Box>

          <Box className="form-row actions" sx={{ mt: 3 }}>
            <Button
              variant="outlined"
              className="cancel-btn"
              onClick={() => reset()}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              className="save-btn"
              type="submit"
              disabled={isSubmitting || isCreating || isUpdating}
              sx={{ ml: 2 }}
            >
              {isCreating || isUpdating ? "Saving..." : "Save"}
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default AdsForm;
