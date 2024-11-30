import { Modal } from "antd";

import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import UseCategory from "../../hook/UseCategory";
import UseAxios from "../../hook/UseAxios";

const CategoryManagements = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [editModal, setEditModal] = useState({ isOpen: false, id: null });
  const navigate = useNavigate();

  const [newCategory, setNewCategory] = useState("");
  const [editedCategory, setEditedCategory] = useState("");

  const axiosUrl = UseAxios();

  const [category, isLoading, refetch] = UseCategory();
  console.log(category);



  

  const tableData = [
    { id: 1,name: "Classics Music", title: "Classics Music", total: "01" },
    { id: 2,name: "Classics Music", title: "Jazz Night", total: "02" },
    { id: 3,name: "Classics Music", title: "Rock Fest", total: "03" },
  ];

  const handleAddCategory = async () => {
    console.log("New Category Added:", newCategory);

    // try {
    //   const response = await axiosUrl.post("/category/create", {
    //     title: newCategory,
    //   });
    //   console.log(response);

    //   if (response.status === 201) {
    //     Swal.fire({
    //       title: "Success",
    //       text: response.data.message,
    //       icon: "success",
    //       confirmButtonText: "OK",
    //     });
    //     refetch();
    //   } else {
    //     Swal.fire({
    //       title: "Error",
    //       text: "Failed to add the category. Please try again.",
    //       icon: "error",
    //       confirmButtonText: "OK",
    //     });
    //   }
    // } catch (error) {
    //   console.error("Error adding category:", error);
    //   Swal.fire({
    //     title: "Error",
    //     text: "Something went wrong! Please try again later.",
    //     icon: "error",
    //     confirmButtonText: "OK",
    //   });
    // }

    setOpenAddModal(false);
    setNewCategory("");
  };

  
  const handleEditCategory = async () => {
    console.log("Category Edited:", editedCategory);

    // if (!editedCategory) {
    //   Swal.fire({
    //     title: "Error",
    //     text: "Category name cannot be empty.",
    //     icon: "error",
    //     confirmButtonText: "OK",
    //   });
    //   return;
    // }

    // try {
    //   const response = await axiosUrl.put(`/category/update/${editModal.id}`, {
    //     title: editedCategory,
    //   });

    //   if (response.status === 200) {
    //     Swal.fire({
    //       title: "Success",
    //       text: response.data.message || "Category updated successfully!",
    //       icon: "success",
    //       confirmButtonText: "OK",
    //     });
    //     refetch();
    //   } else {
    //     Swal.fire({
    //       title: "Error",
    //       text: "Failed to update the category. Please try again.",
    //       icon: "error",
    //       confirmButtonText: "OK",
    //     });
    //   }
    // } catch (error) {
    //   console.error("Error updating category:", error);
    //   Swal.fire({
    //     title: "Error",
    //     text: "Something went wrong! Please try again later.",
    //     icon: "error",
    //     confirmButtonText: "OK",
    //   });
    // }

    setEditModal({ isOpen: false, id: null });
    setEditedCategory("");
  };

  const hndleDelet = async (id) => {
    // Swal.fire({
    //   title: "Are you sure?",
    //   text: "You won't be able to revert this!",
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonColor: "#3085d6",
    //   cancelButtonColor: "#d33",
    //   confirmButtonText: "Yes, Delete it!",
    // }).then(async (result) => {
    //   if (result.isConfirmed) {
    //     try {
    //       const response = await axiosUrl.delete(`/category/delete/${id}`);
    //       if (response.status === 200) {
    //         Swal.fire({
    //           title: "Deleted!",
    //           text: response.data.message || "Category has been deleted.",
    //           icon: "success",
    //         });
    //         refetch();
    //       } else {
    //         Swal.fire({
    //           title: "Error",
    //           text: "Failed to delete the category. Please try again.",
    //           icon: "error",
    //         });
    //       }
    //     } catch (error) {
    //       console.error("Error deleting category:", error);
    //       Swal.fire({
    //         title: "Error",
    //         text: "Something went wrong! Please try again later.",
    //         icon: "error",
    //       });
    //     }
    //   }
    // });
  };

  

  return (
    <div className="mb-7 mt-4">
    <h1 className="flex gap-4">
      <button className="text-[#EF4849] " onClick={() => navigate(-1)}>
        <FaArrowLeft />
      </button>
      <span className="text-lg font-semibold">Category Management</span>
    </h1>

    <div className="flex justify-between mt-9">
      <button className="bg-[#E0CCCD] px-6 py-1 rounded">Category</button>
      <button
        onClick={() => setOpenAddModal(true)}
        className="bg-[#2F799E] px-3 text-white rounded"
      >
        + Add Category
      </button>
    </div>

    <div className="mt-16">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">SL no.</th>
              <th className="px-4 py-2 text-center">Event Name</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>  
          {/* category remove kore table data diyeci just check korar jonno  */}
            {tableData.map((item, index) => (
              <tr key={item.id}>
                <td className="px-4 py-2 text-left">{index + 1}</td>
                <td className="px-4 py-2 text-center">{item.name}</td>
                <td className="px-4 py-2 text-center">{item.title}</td>

                <td className="px-4 py-2 text-right flex gap-2 justify-end">
                  <div
                    onClick={() =>
                      setEditModal({ isOpen: true, id: item._id })
                    }
                    className="w-[36px] h-[36px] text-lg bg-[#2F799E] flex justify-center items-center text-white rounded cursor-pointer"
                  >
                    <MdOutlineModeEdit />
                  </div>

                  <div
                    onClick={() => hndleDelet(item._id)}
                    className="w-[36px] h-[36px] text-lg bg-[#FF5454] flex justify-center items-center text-white rounded cursor-pointer"
                  >
                    <RiDeleteBin6Line />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    <Modal
      centered
      open={openAddModal}
      onCancel={() => setOpenAddModal(false)}
      footer={null}
      width={600}
    >
      <div className="mb-20 mt-4">
        <div className="">
          <div className="font-bold text-center mb-11">+ Add Category</div>
          <div>
            <div className="mx-20">
              <p className="mb-2">Category</p>
              <input
                className="border w-full border-neutral-400 rounded p-2 px-4 bg-[#00000000]"
                type="text"
                placeholder="Enter category name"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
              <div className="w-full flex gap-3 mt-11">
                <button
                  onClick={() => setOpenAddModal(false)}
                  className="bg-[#D9000A] w-full rounded py-2 px-4 text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddCategory}
                  className="bg-[#2F799E] w-full py-2 px-4 rounded text-white"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>

    <Modal
      centered
      open={editModal.isOpen}
      onCancel={() => setEditModal({ isOpen: false, id: null   })  }
      footer={null}
      width={600}
    >
      <div className="mb-20 mt-4">
        <div className="">
          <div className="font-bold text-center mb-11">Edit Category</div>
          <div>
            <div className="mx-20">
              <p className="mb-2">Category</p>
              <input
                className="border w-full border-neutral-400 rounded p-2 px-4 bg-[#00000000]"
                type="text"
                placeholder="Edit category name"
                value={
                  editedCategory ||
                  category.find((item) => item._id === editModal.id)?.title ||
                  ""
                }
                onChange={(e) => setEditedCategory(e.target.value)}
              />
              <div className="w-full flex gap-3 mt-11">
                <button
                  onClick={() => setEditModal({ isOpen: false, id: null })}
                  className="bg-[#D9000A] w-full rounded py-2 px-4 text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditCategory}
                  className="bg-[#004466] w-full py-2 px-4 rounded text-white"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  </div>
  );
};

export default CategoryManagements;
