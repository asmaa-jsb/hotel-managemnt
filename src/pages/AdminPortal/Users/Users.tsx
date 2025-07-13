import Header from "@/components/AdminSharedModual/Header/Header";
import ReusableModal from "@/components/AdminSharedModual/ReusableModal/ReusableModal";
import ReusableTable from "@/components/AdminSharedModual/ReusableTable/ReusableTable";
import TablePagination from "@/components/AdminSharedModual/TablePagination/TablePagination";
import type { UserProfile } from "@/interfaces/Interfaces";
import { useUsers } from "@/utils/Hooks/Hooks";
import { Avatar } from "@mui/material";
import { useState } from "react";


const Users = () => {
  const { data: usersData, isLoading, isError } = useUsers();
  const users = usersData?.data?.users ?? [];

  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const totalItems = users.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  const [selectedUserProfile, setSelectedUserProfile] =
    useState<UserProfile | null>(null);

  const handleClose = () => {
    setOpen(false);
  };

  const handleView = (id: string | number) => {
    const user = users.find((U: UserProfile) => U._id === id);
    if (user) {
      setSelectedUserProfile(user);
      setOpen(true);
    }
  };

  const columns = [
    { id: "userName", label: "User Name" },
    { id: "email", label: "Email" },
    { id: "phoneNumber", label: "Phone Number" },
    { id: "country", label: "Country" },
    { id: "role", label: "Role" },
    {
      id: "profileImage",
      label: "Profile Image",
      render: (value: any) =>
        value ? <Avatar src={value} variant="rounded" /> : "—",
    },
  ];

  const paginatedRows = users
    .slice((page - 1) * pageSize, page * pageSize)
    .map((user: UserProfile) => ({
      _id: user._id,
      userName: user.userName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      country: user.country,
      role: user.role,
      profileImage: user.profileImage,
    }));

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1);
  };

  return (
    <>
      <Header title="Users Table Details" showBtn={false} />
      <ReusableTable
        columns={columns}
        rows={paginatedRows}
        onView={handleView}
        idKey="_id"
        loading={isLoading} 
        model="users"       
        mode="initial"  
      />

      <ReusableModal open={open} onClose={handleClose}>
        {selectedUserProfile && (
          <div className="room-details">
            <img src={selectedUserProfile.profileImage} alt="profile image" />
            <p>
              <strong>User Name:</strong> {selectedUserProfile.userName}
            </p>
            <p>
              <strong>Email:</strong> {selectedUserProfile.email}
            </p>
            <p>
              <strong>Phone Number:</strong> {selectedUserProfile.phoneNumber}
            </p>
            <p>
              <strong>Role:</strong> {selectedUserProfile.role}
            </p>
            <p>
              <strong>Country:</strong> {selectedUserProfile.country}
            </p>
          </div>
        )}
      </ReusableModal>

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

export default Users;
