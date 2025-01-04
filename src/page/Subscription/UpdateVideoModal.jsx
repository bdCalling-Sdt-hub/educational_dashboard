import { useEffect, useState } from "react";
import { Modal, Form, Input, Upload, Button } from "antd";
import { imageUrl } from "../../redux/Api/baseApi";
import toast from "react-hot-toast";
import { useUpdateVideosMutation } from "../../redux/Api/videoApi";

const UpdateVideoModal = ({ isModalOpen, setEditModal, video }) => {
  const [form] = Form.useForm();
  const [fileListImage, setFileListImage] = useState([]);
  const [fileListVideo, setFileListVideo] = useState([]);
  const [updateVideo] = useUpdateVideosMutation();

  // Populate form and uploads when video data is provided
  useEffect(() => {
    if (video) {
      console.log("Editing Video:", video); // Debugging

      const { title, description, category, thumbnail_image, video: videoPath } = video;

      // Set default form values
      form.setFieldsValue({
        title,
        description,
        category,
      });

      // Pre-fill image and video upload fields
      setFileListImage([
        {
          uid: "-1",
          name: "thumbnail",
          status: "done",
          url: `${imageUrl}/${thumbnail_image}`,
        },
      ]);

      setFileListVideo([
        {
          uid: "-2",
          name: "video",
          status: "done",
          url: `${imageUrl}${videoPath}`,
        },
      ]);
    }
  }, [video, form]);

  const onImageChange = ({ fileList }) => {
    setFileListImage(fileList);
  };

  const onVideoChange = ({ fileList }) => {
    setFileListVideo(fileList);
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("category", values.category);

    if (fileListImage[0]?.originFileObj) {
      formData.append("thumbnail_image", fileListImage[0].originFileObj);
    }

    if (fileListVideo[0]?.originFileObj) {
      formData.append("video", fileListVideo[0].originFileObj);
    }

    try {
      await updateVideo({ id: video._id, formData }).unwrap();
      toast.success("Video updated successfully!");
      setEditModal({ isOpen: false, id: null });
    } catch (error) {
      toast.error("Failed to update the video.");
      console.error(error);
    }
  };

  return (
    <Modal
      centered
      open={isModalOpen}
      onCancel={() => setEditModal({ isOpen: false, id: null })}
      footer={null}
      width={600}
    >
      <div className="mb-20 mt-4">
        <h2 className="text-center font-bold mb-11">Update Video</h2>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter the title" }]}
          >
            <Input placeholder="Enter title" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter the description" }]}
          >
            <Input.TextArea rows={3} placeholder="Enter description" />
          </Form.Item>

          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please enter the category" }]}
          >
            <Input placeholder="Enter category" />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            {/* Thumbnail Image */}
            <Form.Item label="Thumbnail Image">
              <Upload
                listType="picture-card"
                fileList={fileListImage}
                onChange={onImageChange}
                accept="image/*"
                maxCount={1}
              >
                {fileListImage.length < 1 && "+ Upload Image"}
              </Upload>
            </Form.Item>

            {/* Video File */}
            <Form.Item label="Video File">
              <Upload
                listType="picture-card"
                fileList={fileListVideo}
                onChange={onVideoChange}
                accept="video/*"
                maxCount={1}
              >
                {fileListVideo.length < 1 ? "+ Upload Video" : null}
              </Upload>
            </Form.Item>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <Button type="primary" htmlType="submit" className="bg-[#2F799E] text-white">
              Save
            </Button>
            <Button
              type="danger"
              onClick={() => setEditModal({ isOpen: false, id: null })}
              className="bg-[#D9000A] text-white"
            >
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default UpdateVideoModal;
