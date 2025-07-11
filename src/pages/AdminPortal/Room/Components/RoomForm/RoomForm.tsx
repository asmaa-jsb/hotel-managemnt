import {
  TextField,
  Select,
  MenuItem,
  Button,
  Box,
  FormControl,
  Typography,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  useCreateRoom,
  useFacilities,
  useRoomDetails,
  useUpdateRoom,
} from "@/utils/Hooks/Hooks";
import type { CreateRoomInput } from "@/interfaces/RoomInterface";
import { toast } from "react-hot-toast";
import Header from "@/components/Header";

const RoomForm: React.FC = () => {
  const { roomId } = useParams<{ roomId?: string }>();
  const isEditMode = Boolean(roomId);
  const navigate = useNavigate();
  const { mutate: createRoom, isPending: isCreating } = useCreateRoom();
  const { mutate: updateRoom, isPending: isUpdating } = useUpdateRoom();
  const { data: roomDetails, isLoading: isLoadingDetails } =
    useRoomDetails(roomId);
  const { data: facilities = [], isLoading: isLoadingFacilities } =
    useFacilities();

  const [imagePreview, setImagePreview] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm({ mode: "onChange" });

  const watchedFacilities = watch("facilities") || [];

  useEffect(() => {
    if (isEditMode && roomDetails) {
      reset({
        roomNumber: roomDetails.roomNumber,
        price: roomDetails.price,
        capacity: roomDetails.capacity,
        discount: roomDetails.discount,
        facilities: roomDetails.facilities?.map((f) => f._id) || [],
      });
      setImagePreview(
        (roomDetails.images || []).map((img: any) =>
          typeof img === "string" ? img : URL.createObjectURL(img)
        )
      );
    }
  }, [isEditMode, roomDetails, reset]);

  const onSubmit = (data: any) => {
    const roomData: CreateRoomInput = {
      roomNumber: data.roomNumber,
      price: Number(data.price),
      capacity: Number(data.capacity),
      discount: Number(data.discount),
      facilities: data.facilities.map((id: string) => ({ _id: id })),
      images: Array.from(data.images ?? []),
    };

    if (isEditMode) {
      updateRoom(
        { id: roomId!, data: roomData },
        {
          onSuccess: () => toast.success("Room updated successfully!"),
          onError: () => toast.error("Failed to update room."),
        }
      );
      navigate("/rooms");
    } else {
      createRoom(roomData, {
        onSuccess: () => {
          reset();
          setImagePreview([]);
          toast.success("Room created successfully!");
        },
        onError: () => toast.error("Failed to create room."),
      });
      navigate("/rooms");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const urls = Array.from(files).map((file) => URL.createObjectURL(file));
      setImagePreview(urls);
    }
  };

  if (isEditMode && isLoadingDetails) {
    return <Typography>Loading room details...</Typography>;
  }

  return (
    <>
      <Header title="Room Mangment" btnTitle="Room List" linkTo="/rooms" />
      <Box className="room-form-container">
        <Typography className="form-title" variant="h6" gutterBottom>
          {isEditMode ? "Edit Room" : "Add New Room"}
        </Typography>

        <form className="room-form" onSubmit={handleSubmit(onSubmit)}>
          <Box className="form-row">
            <TextField
              placeholder="Room Number"
              fullWidth
              variant="standard"
              className="custom-input"
              {...register("roomNumber", {
                required: "Room number is required",
              })}
              error={!!errors.roomNumber}
              helperText={errors.roomNumber?.message as string}
            />
          </Box>

          <Box className="form-row row-2">
            <TextField
              placeholder="Price"
              variant="standard"
              className="half custom-input"
              type="number"
              {...register("price", {
                required: "Price is required",
                min: { value: 0, message: "Price must be positive" },
              })}
              error={!!errors.price}
              helperText={errors.price?.message as string}
            />
            <TextField
              placeholder="Capacity"
              variant="standard"
              className="half custom-input"
              type="number"
              {...register("capacity", { required: "Capacity is required" })}
              error={!!errors.capacity}
              helperText={errors.capacity?.message as string}
            />
          </Box>

          <Box className="form-row row-2">
            <TextField
              placeholder="Discount"
              variant="standard"
              className="half custom-input"
              type="number"
              {...register("discount", { required: "Discount is required" })}
              error={!!errors.discount}
              helperText={errors.discount?.message as string}
            />

            <FormControl
              variant="standard"
              className="half custom-input"
              error={!!errors.facilities}
            >
              <Select
                multiple
                displayEmpty
                value={watchedFacilities}
                onChange={(e) =>
                  setValue(
                    "facilities",
                    typeof e.target.value === "string"
                      ? [e.target.value]
                      : e.target.value
                  )
                }
                renderValue={(selected) => {
                  if (!selected || (selected as string[]).length === 0) {
                    return "Facilities";
                  }
                  return (selected as string[])
                    .map(
                      (id) => facilities.find((f) => f._id === id)?.name || id
                    )
                    .join(", ");
                }}
              >
                <MenuItem disabled value="">
                  Facilities
                </MenuItem>
                {!isLoadingFacilities &&
                  facilities.map((facility) => (
                    <MenuItem key={facility._id} value={facility._id}>
                      {facility.name}
                    </MenuItem>
                  ))}
              </Select>
              <Typography variant="caption" color="error">
                {errors.facilities?.message as string}
              </Typography>
            </FormControl>
          </Box>

          <Box
            className="form-row dropzone"
            onClick={() => document.getElementById("file-upload")?.click()}
          >
            <UploadIcon />
            <Typography>
              Drag & Drop or <span className="link">Choose a Room Images</span>{" "}
              to Upload
            </Typography>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              multiple
              style={{ display: "none" }}
              {...register("images")}
              onChange={(e) => {
                register("images").onChange(e);
                handleImageChange(e);
              }}
            />
          </Box>

          {imagePreview.length > 0 && (
            <Box
              className="form-row image-preview"
              sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}
            >
              {imagePreview.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Preview ${index}`}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 8,
                    objectFit: "cover",
                  }}
                />
              ))}
            </Box>
          )}

          <Box className="form-row actions">
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
            >
              {isCreating || isUpdating ? "Saving..." : "Save"}
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default RoomForm;
