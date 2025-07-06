import Header from "@/components/Header";
import ReusableTable from "@/components/ReusableTable";
import type { Column, TableRowData } from "@/components/ReusableTable";
import { useRooms } from "@/utils/HelperFunctions/HelperFunctions";
import { Avatar } from "@mui/material";
import { useState } from "react";
import ReusableModal from "@/components/ReusableModal";
import ReusableSearchFilters from "@/components/ReusableSearchFilters";

const RoomList = () => {
  const { data, isLoading, isError } = useRooms();

  const [open, setOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<TableRowData | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedFacility, setSelectedFacility] = useState("");

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

  const rows: TableRowData[] =
    data?.data.rooms.map((room) => ({
      id: room._id,
      roomNumber: room.roomNumber,
      image: room.images?.[0] || "",
      price: room.price,
      discount: `${room.discount}%`,
      capacity: `${room.capacity} persons`,
      category: room.facilities?.[0]?.name || "—",
    })) || [];

  const filteredRows = rows.filter((row) => {
    const matchesSearch = row.roomNumber
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesTag =
      !selectedTag ||
      row.capacity.toLowerCase().includes(selectedTag.toLowerCase());
    const matchesFacility =
      !selectedFacility ||
      row.category.toLowerCase().includes(selectedFacility.toLowerCase());
    return matchesSearch && matchesTag && matchesFacility;
  });

  const tags = ["10 persons", "20 persons", "30 persons"];
  const facilities = ["Sofa", "Chicken", "Noodles", "Spa", "—"];

  return (
    <>
      <Header />

     

      <ReusableSearchFilters
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        tagValue={selectedTag}
        onTagChange={setSelectedTag}
        facilityValue={selectedFacility}
        onFacilityChange={setSelectedFacility}
        tags={tags}
        facilities={facilities}
      />

      <div className="roomlist-container">
        <ReusableTable
          columns={columns}
          rows={filteredRows}
          onView={handleView}
          onEdit={(id) => alert(`Edit room ${id}`)}
          onDelete={(id) => alert(`Delete room ${id}`)}
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
    </>
  );
};

export default RoomList;
