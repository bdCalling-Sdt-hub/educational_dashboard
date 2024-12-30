import { Form, Input, Modal, Upload } from "antd";
import React, { useState, useEffect, useRef } from "react";
import Button from "./Button";
import { PlusOutlined } from "@ant-design/icons";
import { toast } from "sonner";

import JoditEditor from "jodit-react";
import { useUpdateArticleMutation } from "../../redux/Api/articleApi";
import { imageUrl } from "../../redux/Api/baseApi";

const UpdateAuctionModal = ({ isModalOpen, setIsModalOpen, singleArticle }) => {
  console.log("single articel", singleArticle);
  const [fileList, setFileList] = useState([]);
  console.log("file list,", fileList);
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [updateArticle, { isLoading: isUpdating }] = useUpdateArticleMutation();
  const [form] = Form.useForm();

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleRemove = (file) => {
    setFileList(fileList.filter((item) => item.uid !== file.uid));
  };

  const onFinish = async (values) => {
    const id = singleArticle?._id;
    const data = {
      ...values,
      
    };

  
    const existingImages = fileList
      .filter((file) => file.url)
      .map((file) => file.url.replace(imageUrl, ""));
    const newImages = fileList.filter((file) => file.originFileObj);

    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        ...data,
        article_images: existingImages,
      })
    );

    newImages.forEach((file) => {
      formData.append("article_images", file.originFileObj);
    });

 
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    try {
      const res = await updateArticle({ formData, id }).unwrap();
      console.log("res", res);
      toast.success(res?.message);
      setIsModalOpen(false);
      form.resetFields();
      setFileList([]);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  
  useEffect(() => {
    if (singleArticle) {
      form.setFieldsValue({
        title: singleArticle?.title,
        description: singleArticle?.description,
      });

      if (singleArticle.article_images && singleArticle.article_images.length > 0) {
        const images = singleArticle?.article_images?.map((url, index) => ({
          uid: index,
          name: `image-${index}.png`,
          status: "done",
          url: `${imageUrl.replace(/\/$/, "")}/${url.replace(/^\//, "")}`,
        }));
        setFileList(images);
      }
    }
  }, [singleArticle, form]);
  
  const config = {
    readonly: false,
    placeholder: "Write description here...",
    style: {
      height: "15vh",
    },
    buttons: [
      "image",
      "fontsize",
      "bold",
      "italic",
      "underline",
      "|",
      "font",
      "brush",
      "align",
    ],
  };

  return (
    <Modal
      centered
      open={isModalOpen}
      footer={false}
      width={800}
      onCancel={() => {
        setIsModalOpen(false);
        form.resetFields();
       
      }}
    >
      <h1 className="text-center font-medium text-[20px]">Update Article</h1>

      <Form form={form} onFinish={onFinish} layout="vertical">
        <div className="flex justify-between items-center gap-2 mt-5">
          <Form.Item
            label="Title"
            name="title"
            className="w-full"
            rules={[{ required: true, message: "Please input item name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Category" name="category" className="w-full">
            {/* Category dropdown or input can go here */}
          </Form.Item>
        </div>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter a description!" }]}
        >
          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            tabIndex={1}
            onBlur={(newContent) => setContent(newContent)}
          />
        </Form.Item>

        <Form.Item label="Upload Images">
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={handleUploadChange}
            onRemove={handleRemove}
            beforeUpload={() => false}
            multiple
          >
            {fileList.length >= 4 ? null : (
              <div className="flex items-center gap-2">
                <PlusOutlined />
                <div>Add Image</div>
              </div>
            )}
          </Upload>
        </Form.Item>

        <div className="flex justify-between gap-3">
          <Form.Item className="w-full">
            <Button className="w-full">Save</Button>
          </Form.Item>
          <Form.Item className="w-full">
            <button
              type="button"
              className="bg-[#d9000a] text-white w-full p-1 rounded-md"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default UpdateAuctionModal;
