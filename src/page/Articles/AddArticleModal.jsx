import { Modal, Form, Input, Button, Select, Upload } from "antd";
import React, { useRef, useState } from "react";
import ImgCrop from "antd-img-crop";
import { usePostArticleMutation } from "../../redux/Api/articleApi";
import { useGetCategoryQuery } from "../../redux/Api/categoryApi";
import JoditEditor from "jodit-react";

const AddArticleModal = ({ setOpenAddModal, openAddModal }) => {
  const [content, setContent] = useState(""); // Content for the article
  const [addArticle, { isLoading }] = usePostArticleMutation();
  const [fileList, setFileList] = useState([]); // FileList state for image uploads
  const { data: categories, isLoading: isCategoryLoading } =
    useGetCategoryQuery(); // Fetch categories
  const editor = useRef(null);

  const handleAddArticle = async (values) => {
    
    if (!content.trim()) {
      return alert("Description content is required!");
    }

    const formData = new FormData();
    formData.append("category", values.categoryId);
    formData.append("title", values.title);
    formData.append("description", content);

    fileList.forEach((file) => {
      console.log(file)
      if (file.originFileObj) {
        
        formData.append("article_images", file.originFileObj);
      }
    });

    try {
      await addArticle(formData).unwrap();
      alert("Article added successfully!");
      setOpenAddModal(false);
    } catch (error) {
      console.error("Failed to add article:", error);
      alert("Failed to add article. Please try again.");
    }
  };

  const config = {
    readonly: false,
    placeholder: "Start typing...",
    buttons: [
      "bold",
      "italic",
      "underline",
      "|",
      "font",
      "fontsize",
      "brush",
      "align",
      "|",
      "image",
      "link",
    ],
  };

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList); // Update file list when files are added/removed
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

  return (
    <Modal
      centered
      open={openAddModal}
      onCancel={() => setOpenAddModal(false)}
      footer={null}
      width={1000}
    >
      <div className="mb-11">
        <h2 className="font-bold text-center mb-11">+ Add Article</h2>
        <Form layout="vertical" onFinish={handleAddArticle}>
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: "Please enter the title!" }]}
            >
              <Input placeholder="Enter Title" className="bg-[#00000000]" />
            </Form.Item>
            <Form.Item
              name="categoryId"
              label="Category Name"
              rules={[{ required: true, message: "Please select a category!" }]}
            >
              <Select
                placeholder="Select Category"
                loading={isCategoryLoading}
                options={categories?.data?.map((category) => ({
                  value: category._id,
                  label: category.name,
                }))}
              />
            </Form.Item>
          </div>
          <div>
            <p className="font-semibold mb-2">Description</p>
            <JoditEditor
              ref={editor}
              value={content}
              config={config}
              tabIndex={1}
              onBlur={(newContent) => setContent(newContent)} // Save content on blur
            />
          </div>
          <Form.Item label="Upload Images">
          
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
                beforeUpload={() => false} // Prevent auto-upload
              >
                {fileList.length < 5 && "+ Upload"}
              </Upload>
          
          </Form.Item>
          <div className="w-full flex gap-3 mt-11">
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              className="w-full"
              style={{ background: "#2F799E", borderColor: "#2F799E" }}
            >
              Save
            </Button>
            <Button
              type="default"
              className="w-full"
              onClick={() => setOpenAddModal(false)}
              style={{
                background: "#D9000A",
                color: "#fff",
                borderColor: "#D9000A",
              }}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default AddArticleModal;
