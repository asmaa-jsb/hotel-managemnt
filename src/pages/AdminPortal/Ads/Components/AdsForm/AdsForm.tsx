import {
  TextField,
  Select,
  MenuItem,
  Button,
  Box,
  Typography,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  useCreateAd,
  useRooms,
  useUpdateAd,
  useUpdateRoom,
} from "@/utils/Hooks/Hooks";
import { toast } from "react-hot-toast";
import Header from "@/components/AdminSharedModual/Header/Header";
import type { CreateAdsInput } from "@/interfaces/AdsInterface";
import { updateAds } from "@/services/API/Adsapi";
// import { createADS } from "@/services/API/Adsapi";

const AdsForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>();

  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const { data, isLoading, isError } = useRooms(1, 1000);
  const { mutate: createAd, isPending: isCreating } = useCreateAd();
  const { mutate: updateAds, isPending: isUpdating } = useUpdateAd();

  const [status, setStatus] = useState<boolean>(true);

  const handleChange = (event: any) => {
    setStatus(event.target.value === "true");
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm({ mode: "onChange" });

  const location = useLocation();
  const state = location.state as {
    room: string;
    discount: number;
    roomNumber: string;
    isActive: boolean;
  };

  useEffect(() => {
    if (isEditMode && state) {
      reset({
        discount: state.discount,
      });
      setValue("room", state.room);
      setStatus(state.isActive);
    }
  }, [isEditMode, reset, setValue, state]);

  const onSubmit = (data: any) => {
    const adsData: CreateAdsInput = {
      room: data.room,
      discount: Number(data.discount),
      isActive: status,
    };

    const adsEditData: CreateAdsInput = {
      discount: Number(data.discount),
      isActive: status,
    };
    if (isEditMode) {
      updateAds(
        { id: id!, data: adsEditData },
        {
          onSuccess: () => {
            toast.success("Ad updated successfully!");
            navigate("/ads");
          },
          onError: () => toast.error("Failed to update ad."),
        }
      );
    } else {
      createAd(adsData, {
        onSuccess: () => {
          toast.success("Ad created successfully!");
          reset();
          navigate("/ads");
        },
        onError: () => toast.error("Failed to create ad."),
      });
    }
  };

  // if (isEditMode && isLoadingDetails) {
  //   return <Typography>Loading ad details...</Typography>;
  // }

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
          {!isEditMode && (
            <Box className="form-row">
              <>
                <InputLabel id="room-label">Select Room</InputLabel>
                <Select
                  labelId="room-label"
                  id="room-select"
                  {...register("room", { required: "Room is required" })}
                  error={!!errors.room}
                >
                  {data?.data?.rooms?.map((room) => (
                    <MenuItem key={room._id} value={room._id}>
                      {room.roomNumber}
                    </MenuItem>
                  ))}
                </Select>

                <Typography variant="caption" color="error">
                  {errors.room?.message as string}
                </Typography>
              </>
            </Box>
          )}

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
              // sx={{ ml: 2 }}
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
