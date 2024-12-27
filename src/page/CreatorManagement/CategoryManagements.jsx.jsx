import React, { useState } from "react";
import { Table, Button, Modal, Input, Upload, message } from "antd";
import { FaArrowLeft } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line, RiGalleryFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { imageUrl } from "../../redux/Api/baseApi";
import {
  useGetCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "../../redux/Api/categoryApi";

const CategoryManagements = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [editModal, setEditModal] = useState({ isOpen: false, id: null });
  const [newCategory, setNewCategory] = useState("");
  const [editedCategory, setEditedCategory] = useState("");
  const [image, setImage] = useState(null);
  const [editedImage, setEditedImage] = useState(null);

  // Fetch categories from the API
  const { data: categoriesData, isLoading, error } = useGetCategoryQuery();
  const [addCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();

  const navigate = useNavigate();

  // Add new category
  const handleAddCategory = async () => {
    if (!newCategory || !image) {
      alert("Please fill out all fields and upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", newCategory);
    formData.append("category_image", image);

    try {
      await addCategory(formData).unwrap();
      message.success("Category added successfully!");
      setOpenAddModal(false);
      setNewCategory("");
      setImage(null);
    } catch (err) {
      console.error("Failed to add category:", err);
      message.error("Failed to add category.");
    }
  };

  // Update category
  const handleUpdateCategory = async () => {
    if (!editedCategory) {
      alert("Category name cannot be empty.");
      return;
    }

    const formData = new FormData();
    formData.append("name", editedCategory);
    if (editedImage) {
      formData.append("category_image", editedImage);
    }

    try {
      await updateCategory({ id: editModal.id, body: formData }).unwrap();
      message.success("Category updated successfully!");
      setEditModal({ isOpen: false, id: null });
      setEditedCategory("");
      setEditedImage(null);
    } catch (err) {
      console.error("Failed to update category:", err);
      message.error("Failed to update category.");
    }
  };

  // Delete category
  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory(id).unwrap();
      message.success("Category deleted successfully!");
    } catch (err) {
      console.error("Failed to delete category:", err);
      message.error("Failed to delete category.");
    }
  };

  // Open edit modal with default values
  const handleOpenEditModal = (record) => {
    setEditModal({ isOpen: true, id: record._id });
    setEditedCategory(record.name); // Prepopulate the category name
    setEditedImage(null); // Reset image to avoid prepopulating
  };

  // Table columns definition
  const columns = [
    {
      title: "SL no.",
      dataIndex: "_id",
      key: "_id",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Image",
      key: "category_image",
      align: "center",
      render: (_, record) => (
        <div className="flex justify-center">
          <img
            className="w-16 h-16 object-cover rounded"
            src={`${imageUrl}/${record.category_image}`}
            alt={record.name}
          />
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      align: "right",
      render: (_, record) => (
        <div className="flex gap-2 justify-end">
          <Button
            icon={<MdOutlineModeEdit />}
            style={{ backgroundColor: "#2F799E", color: "#fff" }}
            onClick={() => handleOpenEditModal(record)}
          />
          <Button
            icon={<RiDeleteBin6Line />}
            style={{ backgroundColor: "#FF5454", color: "#fff" }}
            onClick={() => handleDeleteCategory(record._id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="mb-7 mt-4">
      <h1 className="flex gap-4 text-[#2F799E]">
        <button onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        <span className="text-lg font-semibold">Category Management</span>
      </h1>

      <div className="flex justify-between mt-9">
        <button className="bg-[#2F799E] text-white px-6 py-1 rounded">Category</button>
        <button
          onClick={() => setOpenAddModal(true)}
          className="bg-[#2F799E] px-3 text-white rounded"
        >
          + Add Category
        </button>
      </div>

      <div className="mt-16">
        {isLoading ? (
          <p>Loading categories...</p>
        ) : error ? (
          <p>Failed to load categories.</p>
        ) : (
          <Table
            dataSource={categoriesData?.data}
            columns={columns}
            rowKey="_id"
            pagination={false}
            bordered
          />
        )}
      </div>

      {/* Add Category Modal */}
      <Modal
        centered
        open={openAddModal}
        onCancel={() => {
          setOpenAddModal(false);
          setNewCategory("");
          setImage(null);
        }}
        footer={null}
        width={600}
      >
        <div className="mb-20 mt-4">
          <div className="font-bold text-center mb-11">+ Add Category</div>
          <div className="mx-20">
            <p className="mb-2">Category Name</p>
            <Input
              placeholder="Enter category name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <div>
              <p className="mt-4 mb-2">Thumbs Image</p>
              <Upload
                showUploadList={false}
                beforeUpload={(file) => {
                  setImage(file);
                  return false;
                }}
              >
                <div className="border-2 border-dashed border-neutral-400 rounded h-[124px] flex flex-col items-center justify-center relative">
                  {image ? (
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Uploaded"
                      className="object-contain w-full h-full"
                    />
                  ) : (
                    <>
                      <p className="text-gray-600">Drop image file here to upload</p>
                      <p className="text-4xl text-gray-600 mt-5">
                        <RiGalleryFill />
                      </p>
                    </>
                  )}
                </div>
              </Upload>
            </div>
            <div className="w-full flex gap-3 mt-11">
              <button
                onClick={handleAddCategory}
                className="bg-[#2F799E] w-full py-2 px-4 rounded text-white"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setOpenAddModal(false);
                  setNewCategory("");
                  setImage(null);
                }}
                className="bg-[#D9000A] w-full rounded py-2 px-4 text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Edit Category Modal */}
      <Modal
        centered
        open={editModal.isOpen}
        onCancel={() => setEditModal({ isOpen: false, id: null })}
        footer={null}
        width={600}
      >
        <div className="mb-11 mt-4">
          <div className="font-bold text-center mb-11">Edit Category</div>
          <div className="mx-20">
            <p className="mb-2">Category</p>
            <Input
              placeholder="Edit category name"
              value={editedCategory}
              onChange={(e) => setEditedCategory(e.target.value)}
            />
            <div>
              <p className="mt-4 mb-2">Thumbs Image</p>
              <Upload
                showUploadList={false}
                beforeUpload={(file) => {
                  setEditedImage(file);
                  return false;
                }}
              >
                <div className="border-2 border-dashed border-neutral-400 rounded h-[124px] flex flex-col items-center justify-center relative">
                  {editedImage ? (
                    <img
                      src={URL.createObjectURL(editedImage)}
                      alt="Uploaded"
                      className="object-contain w-full h-full"
                    />
                  ) : (
                    <p className="text-gray-600">(Optional) Upload new image</p>
                  )}
                </div>
              </Upload>
            </div>
            <div className="w-full flex gap-3 mt-6">
              <button
                onClick={() => setEditModal({ isOpen: false, id: null })}
                className="bg-[#D9000A] w-full rounded py-2 px-4 text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateCategory}
                className="bg-[#2F799E] w-full py-2 px-4 rounded text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CategoryManagements;
