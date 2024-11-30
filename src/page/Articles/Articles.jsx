import React, { useState } from "react";
import img from "../../assets/userdashboard/img.png";
import { FaArrowLeft } from "react-icons/fa";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import UseCategory from "../../hook/UseCategory";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
const videos = [
  {
    id: 1,
    title: "Education is the most powerful weapon",
    description: "Education is the most powerful weapon",
    views: "1.3M views",
    time: "2 day's ago",
    thumbnail: img,
  },
  {
    id: 2,
    title: "Education is the most powerful weapon",
    description: "Education is the most powerful weapon",
    views: "1.3M views",
    time: "2 day's ago",
    thumbnail: img,
  },
  {
    id: 3,
    title: "Education is the most powerful weapon",
    description: "Education is the most powerful weapon",
    views: "1.3M views",
    time: "2 day's ago",
    thumbnail: img,
  },
  {
    id: 4,
    title: "Education is the most powerful weapon",
    description: "Education is the most powerful weapon",
    views: "1.3M views",
    time: "2 day's ago",
    thumbnail: img,
  },
  {
    id: 5,
    title: "Education is the most powerful weapon",
    description: "Education is the most powerful weapon",
    views: "1.3M views",
    time: "2 day's ago",
    thumbnail: img,
  },
  {
    id: 6,
    title: "Education is the most powerful weapon",
    description: "Education is the most powerful weapon",
    views: "1.3M views",
    time: "2 day's ago",
    thumbnail: img,
  },
  {
    id: 7,
    title: "Education is the most powerful weapon",
    description: "Education is the most powerful weapon",
    views: "1.3M views",
    time: "2 day's ago",
    thumbnail: img,
  },
  // Add more videos as needed
];

const Articles = () => {

    const [openAddModal, setOpenAddModal] = useState(false);
  const [editModal, setEditModal] = useState({ isOpen: false, id: null });
  const navigate = useNavigate();

  const [newCategory, setNewCategory] = useState("");
  const [editedCategory, setEditedCategory] = useState("");

  // const axiosUrl = UseAxios();

  const [category, isLoading, refetch] = UseCategory();
  console.log(category);
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
      <div className="flex justify-between mb-7 mt-4">
        <h1 className="flex gap-4">
          <button
            className="text-[#EF4849] -mt-3 "
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft />
          </button>
          <span className="text-lg font-semibold">User Management</span>
        </h1>
        <button
          onClick={() => setOpenAddModal(true)}
          className="bg-[#2F799E] px-3 py-2 text-white rounded"
        >
          + Add Video
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {videos.map((video) => (
          <div
            key={video.id}
            className="bg-white shadow-md rounded-t-3xl overflow-hidden"
          >
            <div className="relative">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-90 object-cover"
              />
              
            </div>
            <div className="p-4 bg-[#2F799E] text-white">
              <h2 className="text-lg font-bold truncate">{video.title}</h2>
              <p className="text-sm text-gray-200 truncate">
                {video.description}
              </p>
              
              <div className="flex justify-between gap-2 ">
              <div className=" text-sm text-gray-200 mt-3">
                <span>{video.views}</span>
                <span>{video.time}</span>
              </div>
                <div>
                <button className="text-blue-600 hover:underline">
                <div
                    onClick={() =>
                      setEditModal({ isOpen: true,  })
                    }
                    className="w-[36px] h-[36px] text-lg  flex justify-center items-center text-white  cursor-pointer"
                  >
                    <MdOutlineModeEdit />
                  </div>

                  
                </button>
                <button className=" ">
                <div
                    onClick={() => hndleDelet(item._id)}
                    className="w-[36px] h-[36px] text-lg  flex justify-center items-center text-white cursor-pointer"
                  >
                    <RiDeleteBin6Line />
                  </div>
                </button>
                </div>
              </div>
            </div>
          </div>
        ))}
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
        onCancel={() => setEditModal({ isOpen: false, id: null })}
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

export default Articles;