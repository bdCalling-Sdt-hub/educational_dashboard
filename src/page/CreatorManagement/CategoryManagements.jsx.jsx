import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Input, Upload, message } from "antd";
import { FaArrowLeft } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { imageUrl } from "../../redux/Api/baseApi";
import {
  useGetCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  usePostCategoryMutation,
} from "../../redux/Api/categoryApi";

const CategoryManagements = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [editModal, setEditModal] = useState({ isOpen: false, id: null });
  const [newCategory, setNewCategory] = useState("");
  const [editedCategory, setEditedCategory] = useState("");
  const [fileList, setFileList] = useState([]);

  const {
    data: categoriesData,
    isLoading,
    error,
    refetch: refetchCategories,
  } = useGetCategoryQuery();
  const [addCategory] = usePostCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();

  const navigate = useNavigate();

  const handleAddCategory = async () => {
    if (!newCategory || fileList.length === 0) {
      alert("Please fill out all fields and upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", newCategory);
    formData.append("category_image", fileList[0].originFileObj);

    try {
      await addCategory(formData).unwrap();
      message.success("Category added successfully!");
      setOpenAddModal(false);
      setNewCategory("");
      setFileList([]);
      refetchCategories();
    } catch (err) {
      console.error("Failed to add category:", err);
      message.error("Failed to add category.");
    }
  };

  const handleUpdateCategory = async (values) => {
    console.log(values)
    console.log(editedCategory)
    const formData = new FormData();
    formData.append("name", editedCategory);

    if (fileList.length > 0) {
      // Check if the user uploaded a new image
      if (fileList[0].originFileObj) {
        formData.append("category_image", fileList[0].originFileObj);
      } else if (fileList[0].url) {
        // Use the existing image URL
        formData.append("category_image", fileList[0].url.replace(imageUrl, ""));
      }
    }


    try {
      const response = await updateCategory({
      
        categoryId: editModal.id,
        data: formData,
      }).unwrap();

      
      message.success("Category updated successfully!");
      setEditModal({ isOpen: false, id: null });
      setEditedCategory("");
      setFileList([]);
      refetchCategories();
    } catch (err) {
      console.error("Failed to update category:", err);
      message.error("Failed to update category.");
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory(id).unwrap();
      message.success("Category deleted successfully!");
      refetchCategories();
    } catch (err) {
      console.error("Failed to delete category:", err);
      message.error("Failed to delete category.");
    }
  };

  const handleOpenEditModal = (record) => {
    setEditModal({ isOpen: true, id: record._id });
    setEditedCategory(record.name);
    const existingImage = record.category_image
      ? [
          {
            uid: "-1",
            name: "Existing Image",
            status: "done",
            url: `${imageUrl}/${record.category_image}`,
          },
        ]
      : [];
    setFileList(existingImage);
  };

  const handleCloseEditModal = () => {
    setEditModal({ isOpen: false, id: null });
    setEditedCategory("");
    setFileList([]);
  };

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

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
            src={`${imageUrl}/${record.category_image}?t=${Date.now()}`}
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
        <button className="bg-[#2F799E] text-white px-6 py-1 rounded">
          Category
        </button>
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
          setFileList([]);
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
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
                beforeUpload={() => false} // Prevent automatic upload
              >
                {fileList.length < 1 && "+ Upload"}
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
                  setFileList([]);
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
        onCancel={handleCloseEditModal}
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
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
                beforeUpload={() => false} // Prevent automatic upload
              >
                {fileList.length < 1 && "+ Upload"}
              </Upload>
            </div>
            <div className="w-full flex gap-3 mt-6">
              <button
                onClick={handleCloseEditModal}
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
