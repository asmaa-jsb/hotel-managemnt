import { useState } from "react";
import { toast } from "react-hot-toast";
import Header from "@/components/Header";
import ReusableTable, { type Column, type TableRowData } from "@/components/ReusableTable";
import ReusableModal from "@/components/ReusableModal";
import ConfirmDeleteModal from "@/components/DeleteModal";
import { useDeleteFacility, useRoomsFacilities, useAddFacility, useUpdateFacility } from "@/utils/Hooks/Hooks";
import { Box, Button, TextField, Typography } from "@mui/material";

const FacilitiesList = () => {
  const { data, isLoading, isError } = useRoomsFacilities();
  const { mutate: deleteFacilityMutate } = useDeleteFacility();
  const { mutate: addFacilityMutate } = useAddFacility();
  const { mutate: updateFacilityMutate } = useUpdateFacility();

  const [openViewModal, setOpenViewModal] = useState(false);
  const [openFormModal, setOpenFormModal] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [selectedFacility, setSelectedFacility] = useState<TableRowData | null>(null);
  const [name, setName] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const facilities = data?.data?.facilities ?? [];

  const rows: TableRowData[] = facilities.map((facility) => ({
    id: facility._id,
    name: facility.name,
    createdBy: facility.createdBy?.userName || "—",
    createdAt: new Date(facility.createdAt).toLocaleDateString(),
  }));

  const columns: Column[] = [
    { id: "name", label: "Facility Name" },
    { id: "createdBy", label: "Created By" },
    { id: "createdAt", label: "Created At" },
  ];

  const handleView = (id: string | number) => {
    const facility = rows.find((r) => r.id === id);
    if (facility) {
      setSelectedFacility(facility);
      setOpenViewModal(true);
    }
  };

  const handleAdd = () => {
    setSelectedFacility(null);
    setName("");
    setIsEditing(false);
    setOpenFormModal(true);
  };

  const handleEdit = (id: string | number) => {
    const facility = rows.find((r) => r.id === id);
    if (facility) {
      setSelectedFacility(facility);
      setName(facility.name);
      setIsEditing(true);
      setOpenFormModal(true);
    }
  };

  const handleDelete = (id: string | number) => {
    const facility = rows.find((r) => r.id === id);
    if (facility) {
      setSelectedFacility(facility);
      setOpenDelete(true);
    }
  };

  const handleSubmit = () => {
    const payload = { name };

    if (isEditing && selectedFacility?.id) {
      updateFacilityMutate(
        { id: selectedFacility.id, payload },
        {
          onSuccess: () => {
            toast.success("Facility updated");
            setOpenFormModal(false);
            resetForm();
          },
          onError: () => toast.error("Update failed"),
        }
      );
    } else {
      addFacilityMutate(payload, {
        onSuccess: () => {
          toast.success("Facility added");
          setOpenFormModal(false);
          resetForm();
        },
        onError: () => toast.error("Add failed"),
      });
    }
  };

  const handleConfirmDelete = () => {
    if (selectedFacility?.id) {
      deleteFacilityMutate(selectedFacility.id, {
        onSuccess: () => {
          toast.success("Facility deleted");
          setOpenDelete(false);
          resetForm();
        },
        onError: () => toast.error("Delete failed"),
      });
    }
  };

  const resetForm = () => {
    setSelectedFacility(null);
    setName("");
    setIsEditing(false);
  };

  if (isLoading) return <p>Loading facilities...</p>;
  if (isError) return <p>Failed to load facilities.</p>;

  return (
    <>
      <Header
        title="Facilities List"
        btnTitle="Add Facility"
        description="Manage all available facilities"
        onClickButton={handleAdd}
      />

      <ReusableTable
        columns={columns}
        rows={rows}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* View Modal */}
      <ReusableModal open={openViewModal} onClose={() => setOpenViewModal(false)}>
        {selectedFacility && (
          <div className="facility-details">
            <h4>{selectedFacility.name}</h4>
            <p><strong>Created By:</strong> {selectedFacility.createdBy}</p>
            <p><strong>Created At:</strong> {selectedFacility.createdAt}</p>
          </div>
        )}
      </ReusableModal>

      {/* Add/Edit Modal */}
<ReusableModal open={openFormModal} onClose={() => setOpenFormModal(false)}>
  <form
    onSubmit={(e) => {
      e.preventDefault();
      handleSubmit();
    }}
  >
    <Box display="flex" flexDirection="column" gap={3} p={2} minWidth={300}>
      <Typography variant="h6" fontWeight={600}>
        {isEditing ? "Edit Facility" : "Add New Facility"}
      </Typography>

      <TextField
        label="Facility Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        required
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{
          py: 1.2,
          fontWeight: 600,
          textTransform: "none",
          fontSize: "16px",
        }}
      >
        {isEditing ? "Update" : "Add"}
      </Button>
    </Box>
  </form>
</ReusableModal>

      {/* Confirm Delete Modal */}
      <ConfirmDeleteModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Facility?"
        description="Are you sure you want to delete this facility?"
      />
    </>
  );
};

export default FacilitiesList;
