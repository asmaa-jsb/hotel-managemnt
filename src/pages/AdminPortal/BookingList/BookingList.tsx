import ConfirmDeleteModal from "@/components/DeleteModal";
import Header from "@/components/Header";
import ReusableModal from "@/components/ReusableModal";
import ReusableTable from "@/components/ReusableTable"
import type { Booking, BookingDetails } from "@/interfaces/Interfaces";
import { useBookings, useDeleteBooking } from "@/utils/Hooks/Hooks";
import {useState } from "react";


const BookingList = () => {
      const { data, isLoading, isError , refetch} = useBookings();
      const {mutate: deleteBookingMutate}= useDeleteBooking();
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<BookingDetails| null>();
    const [bookingId, setBookingId] = useState <string | number>()
    const handleView = (id: string | number) => {
    const booking = rows.find((b:Booking) => b._id === id);
    if (booking) {
      setSelectedBooking(booking);
      setOpen(true);
    }
  };


  const handleClose = () => {
    setOpen(false);
    setSelectedBooking(null);
  };
    const  columns = [
    { id: "roomNum", label: "Room Number" },
     { id: "totalPrice", label: "Total Price" },
    { id: "startDate", label: "Start Date" },
    { id: "endDate", label: "End Date" },
    { id: "status", label: "Status" },
   { id: "userName", label: "User" },
  ];
      
  const handleShowDelete =  (id: string | number) => {
    setOpenDelete(true);
    setBookingId(id);
  }
  const handleConfirmDelete= async ()=>{
    if(bookingId){
      deleteBookingMutate(String(bookingId),{
        onSuccess: () => {
          setOpenDelete(false);
          refetch();
        },
        onError: (error) => {
          console.error("Error deleting booking:", error);
        }
      })
    }

  }

const bookings = data?.data?.booking;
      const rows = (bookings ?? []).map((booking: Booking, index:number) => ({
          _id: booking._id,
      roomNum: booking?.roomNum || index + 1,
        startDate: new Date(booking?.startDate).toLocaleDateString(),
        endDate: new Date(booking?.endDate).toLocaleDateString(),
        status: booking?.status,
        totalPrice: booking?.totalPrice, 
        userName: booking?.user?.userName,
      }));
      
  return (<>
  <Header
   title="Booking Table Details"
   showBtn = {false}
  />
    <ReusableTable
    columns={columns}
    rows={rows}
     onDelete={handleShowDelete}
     onView={handleView}
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
      </>
  )
}

export default BookingList
