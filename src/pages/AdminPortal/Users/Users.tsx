
import Header from "@/components/Header";
import ReusableModal from "@/components/ReusableModal";
import ReusableTable from "@/components/ReusableTable"
import { useUsers } from "@/utils/Hooks/Hooks";

import {  useState } from "react";
const Users = () => {
   const { data, isLoading, isError } = useUsers();
   const [open, setOpen] = useState(false);
   const [selectedUser, setSelectedUser] = useState<any>(null);
   const handleView = (id: string | number) => {
     const User = rows.find((U) => U._id === id);
     if (User) {
       setSelectedUser(User);
       setOpen(true);
     }
   };
   const handleClose = () => {
     setOpen(false);
     setSelectedUser(null);
   };
     const  columns = [
     { id: " userName", label: "user Name" },
      { id: "email", label: "Email" },
     { id: "phoneNumber", label: "Phone Number" },
     { id: "country", label: "Country" },
     { id: "role", label: "Role" },
    { id: "profileImage", label: "Profile Image" },
   ];
       

  

 const users= data;
 console.log(users);
 
       const rows = (users ?? []).map((user, index:number) => ({
           _id: user._id,
          userName: user.userName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                country: user.country,
                role: user.role,
                profileImage: user.profileImage,
       }));
       
   return (<>
   <Header
    title="Booking Table Details"
    showBtn = {false}
   />
     <ReusableTable
     columns={columns}
     rows={rows}
      onView={handleView}
      idKey="_id"
     
     />
           <ReusableModal open={open} onClose={handleClose}>
         {selectedUser && (
           <div className="room-details">
             
 
             <p>
               <strong>Room Number:</strong> {selectedUser}
             </p>
             <p>
               <strong>Price:</strong> ${selectedUser}
             </p>
             <p>
               <strong>Start Date:</strong> {selectedUser}
             </p>
             <p>
               <strong>End Date:</strong> {selectedUser}
             </p>
             <p>
               <strong>Status :</strong> {selectedUser}
             </p>
              <p>
               <strong>User :</strong> {selectedUser}
             </p>
           </div>
         )}
       </ReusableModal>
      
       </>
   )
}

export default Users
