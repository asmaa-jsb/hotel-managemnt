import Header from "@/components/AdminSharedModual/Header/Header";
import ReusableTable from "@/components/AdminSharedModual/ReusableTable/ReusableTable";
import type {
  Column,
  TableRowData,
} from "@/components/AdminSharedModual/ReusableTable/ReusableTable";
import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import ReusableModal from "@/components/AdminSharedModual/ReusableModal/ReusableModal";

import ConfirmDeleteModal from "@/components/AdminSharedModual/DeletModal/DeleteModal";
import TablePagination from "@/components/AdminSharedModual/TablePagination/TablePagination";
import { useDeleteRoom, useAds } from "@/utils/Hooks/Hooks";
import { useNavigate } from "react-router-dom";
import NoData from "@/components/AdminSharedModual/NoData/NoData";

const RoomList = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const { data, isLoading, isError } = useAds(page, pageSize);
  const { mutate: deleteRoom } = useDeleteRoom();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<TableRowData | null>(null);
  const [roomIdToDelete, setRoomIdToDelete] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [searchLoading, setSearchLoading] = useState(false);
  const rooms = data?.data?.ads ?? [];
  const totalPages = data?.data?.totalPages ?? 1;
  const totalItems = data?.data?.totalItems ?? 0;

  const columns: Column[] = [
    { id: "roomNumber", label: "Room Number" },

    { id: "price", label: "Price" },
    { id: "discount", label: "Discount" },
    { id: "capacity", label: "Capacity" },
  ];
  const rows: TableRowData[] = rooms.map((ad) => {
    return {
      id: ad._id,
      roomNumber: ad?.room?.roomNumber,

      price: ad.room?.price?.toString() || "—",
      discount: ad.room?.discount ? `${ad.room.discount}%` : "—",
      capacity: ad.room?.capacity ? `${ad.room.capacity} persons` : "—",
    };
  });

  useEffect(() => {
    setPage(1);
    setSearchLoading(true);
    const timeout = setTimeout(() => {
      setSearchLoading(false);
    }, 400);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <Header
        title="ADs Table Details"
        btnTitle="Add New Ads"
        linkTo="/ads/add"
        showBtn={true}
      />

      {isError ? (
        <NoData />
      ) : (
        <div className="list-container">
          <ReusableTable
            rows={rows}
            columns={columns}
            loading={isLoading || searchLoading}
            model="rooms"
            // mode={loaderMode}
            onView={(id) => {
              const room = rows.find((r) => r.id === id);
              if (room) {
                setSelectedRoom(room);
                setOpen(true);
              }
            }}
            onEdit={(id) => {
              const ad = rooms.find((r) => r._id === id);

              if (ad) {
                navigate(`/ads/edit/${id}`, {
                  state: {
                    room: ad?.room?._id,
                    roomNumber: ad?.room?.roomNumber,
                    discount: ad?.room?.discount,
                    isActive: ad?.isActive,
                  },
                });
              }
            }}

            // onDelete={(id) => {
            //   setRoomIdToDelete(id.toString());
            //   setOpenDelete(true);
            // }}
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
