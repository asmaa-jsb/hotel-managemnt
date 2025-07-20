import Header from "@/components/AdminSharedModual/Header/Header";
import ReusableTable from "@/components/AdminSharedModual/ReusableTable/ReusableTable";
import type {
  Column,
  TableRowData,
} from "@/components/AdminSharedModual/ReusableTable/ReusableTable";
import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import ReusableModal from "@/components/AdminSharedModual/ReusableModal/ReusableModal";
import ReusableSearchFilters from "@/components/AdminSharedModual/ReusableSearchFilter/ReusableSearchFilters";
import ConfirmDeleteModal from "@/components/AdminSharedModual/DeletModal/DeleteModal";
import TablePagination from "@/components/AdminSharedModual/TablePagination/TablePagination";
import { useRooms, useDeleteRoom } from "@/utils/Hooks/Hooks";
import { useNavigate } from "react-router-dom";
import NoData from "@/components/AdminSharedModual/NoData/NoData";

const RoomList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedCapacity, setSelectedCapacity] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading, isError } = useRooms(page, pageSize);
  const { mutate: deleteRoom } = useDeleteRoom();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<TableRowData | null>(null);
  const [roomIdToDelete, setRoomIdToDelete] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [searchLoading, setSearchLoading] = useState(false);

  const rooms = data?.data?.rooms ?? [];
  const totalPages = data?.data?.totalPages ?? 1;
  const totalItems = data?.data?.totalItems ?? 0;

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
    const matchesPrice = !selectedPrice || row.price === selectedPrice;
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

  useEffect(() => {
    setPage(1);
    setSearchLoading(true);
    const timeout = setTimeout(() => {
      setSearchLoading(false);
    }, 400);
    return () => clearTimeout(timeout);
  }, [searchTerm, selectedPrice, selectedCapacity, selectedCategory]);

  const loaderMode: "search" | "filter" | "initial" = searchLoading
    ? "search"
    : selectedPrice || selectedCapacity || selectedCategory
    ? "filter"
    : "initial";

  return (
    <>
      <Header
        title="Room Management"
        btnTitle="Add New Room"
        linkTo="/admin/rooms/new-room"
        showBtn={true}
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

      {isError ? (
        <NoData />
      ) : (
        <div className="roomlist-container">
          <ReusableTable
            columns={columns}
            rows={filteredRows}
            loading={isLoading || searchLoading}
            model="rooms"
            mode={loaderMode} // ✅ تمرير نوع التحميل للـ Loader
            onView={(id) => {
              const room = rows.find((r) => r.id === id);
              if (room) {
                setSelectedRoom(room);
                setOpen(true);
              }
            }}
            onEdit={(id) => navigate(`/admin/rooms/${id}`)}
            onDelete={(id) => {
              setRoomIdToDelete(id.toString());
              setOpenDelete(true);
            }}
          />

          <TablePagination
            page={page}
            totalPages={totalPages}
            pageSize={pageSize}
            totalItems={totalItems}
            onPageChange={setPage}
            onPageSizeChange={(size) => {
              setPageSize(size);
              setPage(1);
            }}
          />
        </div>
      )}

      {open && (
        <ReusableModal
          open={open}
          onClose={() => {
            setOpen(false);
            setSelectedRoom(null);
          }}
        >
          <div className="room-details">
            <img src={selectedRoom?.image} alt="Room" className="room-image" />
            <p>
              <strong>Room #:</strong> {selectedRoom?.roomNumber}
            </p>
            <p>
              <strong>Price:</strong> ${selectedRoom?.price}
            </p>
            <p>
              <strong>Capacity:</strong> {selectedRoom?.capacity}
            </p>
            <p>
              <strong>Discount:</strong> {selectedRoom?.discount}
            </p>
            <p>
              <strong>Category:</strong> {selectedRoom?.category}
            </p>
          </div>
        </ReusableModal>
      )}

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
