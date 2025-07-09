import Header from "@/components/Header";
import ReusableTable, { type Column, type TableRowData } from "@/components/ReusableTable";
import ReusableModal from "@/components/ReusableModal";
import ConfirmDeleteModal from "@/components/DeleteModal";
import { useDeleteFacility, useRoomsFacilities } from "@/utils/Hooks/Hooks";
import { useState } from "react";
import toast from "react-hot-toast";

const FacilitiesList = () => {
  const { data, isLoading, isError } = useRoomsFacilities();
  const { mutate: deleteFacilityMutate } = useDeleteFacility();

  const [openModal, setOpenModal] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState<TableRowData | null>(null);

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
      setOpenModal(true);
    }
  };

const handleDelete = (id: string | number) => {
  const facility = rows.find((r) => r.id === id);
  if (facility) {
    setSelectedFacility(facility);  // 👈 نحدد العنصر
    setOpenDelete(true);            // 👈 نفتح المودال
  }
};

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedFacility(null);
  };

//   const handleConfirmDelete = () => {
//     alert(`Delete facility with ID: ${selectedFacility?.id}`);
//     setOpenDelete(false);
//   };

const handleConfirmDelete = () => {
  if (selectedFacility?.id) {
    deleteFacilityMutate(selectedFacility.id, {
      onSuccess: () => {
        toast.success("Facility deleted");
        setOpenDelete(false);
        setSelectedFacility(null);
      },
      onError: () => {
        toast.error("Delete failed");
      },
    });
  }
};

  if (isLoading) return <p>Loading facilities...</p>;
  if (isError) return <p>Failed to load facilities.</p>;

  return (
    <>
      <Header
        title="Facilities List"
        btnTitle="Add Facility"
        description="Manage all available facilities"
      />

      <ReusableTable
        columns={columns}
        rows={rows}
        onView={handleView}
        onEdit={(id) => alert(`Edit facility with ID: ${id}`)}
        onDelete={handleDelete}
      />

      <ReusableModal open={openModal} onClose={handleCloseModal}>
        {selectedFacility && (
          <div className="facility-details">
            <h4>{selectedFacility.name}</h4>
            <p><strong>Created By:</strong> {selectedFacility.createdBy}</p>
            <p><strong>Created At:</strong> {selectedFacility.createdAt}</p>
          </div>
        )}
      </ReusableModal>

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
