import ConfirmDeleteModal from "@/components/AdminSharedModual/DeletModal/DeleteModal";
import Header from "@/components/AdminSharedModual/Header/Header";
import ReusableModal from "@/components/AdminSharedModual/ReusableModal/ReusableModal";
import ReusableTable from "@/components/AdminSharedModual/ReusableTable/ReusableTable";
import TablePagination from "@/components/AdminSharedModual/TablePagination/TablePagination";
import type { Booking, BookingDetails } from "@/interfaces/Interfaces";
import { useBookings, useDeleteBooking } from "@/utils/Hooks/Hooks";
import { useState } from "react";

const BookingList = () => {
  const { data, isLoading, isError, refetch } = useBookings();
  const bookings = data?.data?.booking;
  console.log(bookings);

  const { mutate: deleteBookingMutate } = useDeleteBooking();
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedBooking, setSelectedBooking] =
    useState<BookingDetails | null>();
  const [bookingId, setBookingId] = useState<string | number>();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const totalItems = bookings?.length ?? 0;
  const totalPages = Math.ceil(totalItems / pageSize);
  const handleView = (id: string | number) => {
    const booking = bookings.find((b: Booking) => b._id === id);
    if (booking) {
      setSelectedBooking(booking);
      setOpen(true);
    }
  };
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBooking(null);
  };
  const columns = [
    { id: "roomNum", label: "Room Number" },
    { id: "totalPrice", label: "Total Price" },
    { id: "startDate", label: "Start Date" },
    { id: "endDate", label: "End Date" },
    { id: "status", label: "Status" },
    { id: "userName", label: "User" },
  ];

  const handleShowDelete = (id: string | number) => {
    setOpenDelete(true);
    setBookingId(id);
  };
  const handleConfirmDelete = async () => {
    if (bookingId) {
      deleteBookingMutate(String(bookingId), {
        onSuccess: () => {
          setOpenDelete(false);
          refetch();
        },
        onError: (error) => {
          console.error("Error deleting booking:", error);
        },
      });
    }
  };

  const paginatedRows = (bookings ?? [])
    .slice((page - 1) * pageSize, page * pageSize)
    .map((booking: Booking, index: number) => ({
      _id: booking._id,
      roomNum: booking?.roomNum || index + 1,
      startDate: new Date(booking?.startDate).toLocaleDateString(),
      endDate: new Date(booking?.endDate).toLocaleDateString(),
      status: booking?.status,
      totalPrice: booking?.totalPrice,
      userName: booking?.user?.userName,
    }));

  return (
    <>
      <Header title="Booking Table Details" showBtn={false} />
      <ReusableTable
        columns={columns}
        rows={paginatedRows}
        onDelete={handleShowDelete}
        onView={handleView}
         loading={isLoading} 
          model="bookings"       
        mode="initial"  
        idKey="_id"
      />
      <ReusableModal open={open} onClose={handleClose}>
        {selectedBooking && (
          <div className="room-details">
            <p>
              <strong>Room Number:</strong> {selectedBooking?.roomNum}
            </p>
            <p>
              <strong>Price:</strong> ${selectedBooking?.totalPrice}
            </p>
            <p>
              <strong>Start Date:</strong> {selectedBooking?.startDate}
            </p>
            <p>
              <strong>End Date:</strong> {selectedBooking?.endDate}
            </p>
            <p>
              <strong>Status :</strong> {selectedBooking?.status}
            </p>
            <p>
              <strong>User :</strong> {selectedBooking?.userName}
            </p>
          </div>
        )}
      </ReusableModal>
      <ConfirmDeleteModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleConfirmDelete}
        title="Delete This Booking?"
        description="Are you sure you want to delete this item?"
      />
      <TablePagination
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        page={page}
        pageSize={pageSize}
        totalItems={totalItems}
        totalPages={totalPages}
      />
    </>
  );
};

export default BookingList;
