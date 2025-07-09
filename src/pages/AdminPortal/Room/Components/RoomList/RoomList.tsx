import Header from "@/components/Header";
import ReusableTable from "@/components/ReusableTable";
import type { Column, TableRowData } from "@/components/ReusableTable";
import { Avatar } from "@mui/material";
import { useState } from "react";
import ReusableModal from "@/components/ReusableModal";
import ReusableSearchFilters from "@/components/ReusableSearchFilters";
import ConfirmDeleteModal from "@/components/DeleteModal";
import { useRooms, useDeleteRoom } from "@/utils/Hooks/Hooks";
import { useNavigate } from "react-router-dom";

const RoomList = () => {
  const { data, isLoading, isError } = useRooms();
  const { mutate: deleteRoom } = useDeleteRoom();

  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<TableRowData | null>(null);
  const [roomIdToDelete, setRoomIdToDelete] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedCapacity, setSelectedCapacity] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();
  const handleDelete = (id: string | number) => {
    setRoomIdToDelete(id.toString());
    setOpenDelete(true);
  };

  const handleView = (id: string | number) => {
    const room = rows.find((r) => r.id === id);
    if (room) {
      setSelectedRoom(room);
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRoom(null);
  };

  if (isLoading) return <p>Loading rooms...</p>;
  if (isError) return <p>Failed to fetch rooms</p>;

  const columns: Column[] = [
    { id: "roomNumber", label: "Room Number" },
    {
      id: "image",
      label: "Image",
      render: (value) =>
        value ? <Avatar src={value} variant="rounded" /> : "—",
    },
    { id: "price", label: "Price" },
    { id: "discount", label: "Discount" },
    { id: "capacity", label: "Capacity" },
    { id: "category", label: "Category" },
  ];

  const rooms = data?.data?.rooms ?? [];

  const rows: TableRowData[] = rooms.map((room) => ({
    id: room._id,
    roomNumber: room.roomNumber,
    image: room.images?.[0] || "",
    price: room.price.toString(),
    discount: `${room.discount}%`,
    capacity: `${room.capacity} persons`,
    category: room.facilities?.[0]?.name || "—",
  }));

  const filteredRows = rows.filter((row) => {
    const matchesSearch = row.roomNumber
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesPrice =
      !selectedPrice || row.price.toString() === selectedPrice;
    const matchesCapacity =
      !selectedCapacity ||
      row.capacity.toLowerCase() === selectedCapacity.toLowerCase();
    const matchesCategory =
      !selectedCategory ||
      row.category.toLowerCase() === selectedCategory.toLowerCase();

    return (
      row.id !== deletingId &&
      matchesSearch &&
      matchesPrice &&
      matchesCapacity &&
      matchesCategory
    );
  });

  const unique = (arr: string[]) => [...new Set(arr)];

  return (
    <>
      <Header
        title="Room Management"
        btnTitle="Add New Room"
        linkTo="/rooms/new-room"
      />

      <ReusableSearchFilters
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        dropdowns={[
          {
            label: "Price",
            options: unique(rows.map((r) => r.price)),
            value: selectedPrice,
            onChange: setSelectedPrice,
          },
          {
            label: "Capacity",
            options: unique(rows.map((r) => r.capacity)),
            value: selectedCapacity,
            onChange: setSelectedCapacity,
          },
          {
            label: "Category",
            options: unique(rows.map((r) => r.category)),
            value: selectedCategory,
            onChange: setSelectedCategory,
          },
        ]}
      />

      <div className="roomlist-container">
        <ReusableTable
          columns={columns}
          rows={filteredRows}
          onView={handleView}
          onEdit={(id) => navigate(`/rooms/${id}`)}
          onDelete={handleDelete}
        />
      </div>

      <ReusableModal open={open} onClose={handleClose}>
        {selectedRoom && (
          <div className="room-details">
            <img src={selectedRoom.image} alt="Room" className="room-image" />
            <p>
              <strong>Room #:</strong> {selectedRoom.roomNumber}
            </p>
            <p>
              <strong>Price:</strong> ${selectedRoom.price}
            </p>
            <p>
              <strong>Capacity:</strong> {selectedRoom.capacity}
            </p>
            <p>
              <strong>Discount:</strong> {selectedRoom.discount}
            </p>
            <p>
              <strong>Category:</strong> {selectedRoom.category}
            </p>
          </div>
        )}
      </ReusableModal>

      <ConfirmDeleteModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={() => {
          if (roomIdToDelete) {
            const audio = new Audio(
              "../../../../../assets/Sound/fast-swipe-48158.mp3"
            );
            audio.play();
            setDeletingId(roomIdToDelete);
            setTimeout(() => {
              deleteRoom(roomIdToDelete);
              setRoomIdToDelete(null);
              setDeletingId(null);
            }, 400);
          }
          setOpenDelete(false);
        }}
        title="Delete This Room?"
        description="Are you sure you want to delete this item?"
      />
    </>
  );
};

export default RoomList;
