import React, { useState } from "react";
import img from "../../assets/userdashboard/img.png";
import { FaArrowLeft } from "react-icons/fa";
import { Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";

import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line, RiGalleryFill } from "react-icons/ri";
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

const Videos = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [editModal, setEditModal] = useState({ isOpen: false, id: null });
  const navigate = useNavigate();

  const [newCategory, setNewCategory] = useState("");
  const [editedCategory, setEditedCategory] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [videoPreview, setVideoPreview] = useState(null);

  const [image, setImage] = useState(null);

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Create video preview
    const videoURL = URL.createObjectURL(file);
    setVideoPreview(videoURL);

    setIsUploading(true);
    setUploadProgress(0);

    // Simulating upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10; // Increase progress by 10%
      });
    }, 500); // Update progress every 500ms
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Set the image URL in state
      };
      reader.readAsDataURL(file);
    }
  };
  // const axiosUrl = UseAxios();




  return (
    <div className="mb-7 mt-4">
      <div className="flex justify-between mb-7 mt-4">
        <h1 className="flex gap-4 text-[#2F799E]">
          <button className=" -mt-3" onClick={() => navigate(-1)}>
            <FaArrowLeft />
          </button>
          <span className="text-lg font-semibold">Videos</span>
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
            <Link to={"/dashboard/videos/videodetails"}>
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-90 object-cover"
                />
                <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6 text-black"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.752 11.168l-5.197-3.482a1 1 0 00-1.555.832v6.964a1 1 0 001.555.832l5.197-3.482a1 1 0 000-1.664z"
                    />
                  </svg>
                </button>
              </div>
            </Link>
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
                      onClick={() => setEditModal({ isOpen: true })}
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
        onCancel={() => {setOpenAddModal(false)



        } }

        

        footer={null}
        width={600}
      >
        <div className="mb-20 mt-4">
          <div className="">
            <div className="font-bold text-center mb-11">+ Add Category</div>
            <div>
              <div className="mx-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="mb-2">Category Name</p>
                    <input
                      className="border w-full border-neutral-400 rounded p-2 px-4 bg-[#00000000]"
                      type="text"
                      placeholder="Enter category name"
                    
                    />
                  </div>

                  <div>
                    <p className="mb-2">Category Name</p>
                    <input
                      className="border w-full border-neutral-400 rounded p-2 px-4 bg-[#00000000]"
                      type="text"
                      placeholder="Enter category name"
                    
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <p className="mb-2">Category Name</p>
                  <textarea
                    className="border w-full border-neutral-400 rounded p-2 px-4 bg-[#00000000]"
                    type="text"
                    placeholder="Enter category name"
                    
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="mt-4 mb-2">Thumbs Image</p>

                    <div className="border px-5 py-4 rounded">
                      <p className="text-gray-600 text-center pb-3">
                        Suggested dimension [344×184]
                      </p>
                      <div className="border-2 border-dashed border-neutral-400 rounded h-[124px] flex flex-col items-center justify-center relative">
                        {image ? (
                          <img
                            src={image}
                            alt="Uploaded"
                            className="object-contain w-full h-full"
                          />
                        ) : (
                          <>
                            <p className="text-gray-600">
                              Drop image file here to upload
                            </p>
                            <p className="text-gray-600">(or click)</p>
                            <p className="text-4xl text-gray-600 mt-5">
                              <RiGalleryFill />
                            </p>
                          </>
                        )}
                        {/* Hidden input for file upload */}
                        <input
                          type="file"
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          onChange={handleImageChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <p className="mt-4 mb-2">Add Video</p>

                    <div className="border px-5 py-4 rounded">
                      <p className="text-gray-600 text-center pb-3">
                        Suggested dimension [344×184]
                      </p>
                      <div className="border-2 border-dashed border-neutral-400 rounded h-[76px] flex flex-col items-center justify-center relative overflow-hidden">
                        {videoPreview ? (
                          <video
                            src={videoPreview}
                            className="absolute inset-0 w-full h-full object-cover"
                            controls
                          />
                        ) : (
                          <>
                            <p className="text-gray-600">
                              Drop video file here to upload
                            </p>
                            <p className="text-gray-600">(or click)</p>
                            <p className="text-4xl text-gray-600">
                              <RiGalleryFill />
                            </p>
                            {/* Hidden input for file upload */}
                            <input
                              type="file"
                              className="absolute inset-0 opacity-0 cursor-pointer"
                              accept="video/*"
                              onChange={handleVideoUpload}
                            />
                          </>
                        )}
                      </div>
                    </div>

                    {isUploading && (
                      <p className="border text-cyan-800 p-2 text-center mt-2 rounded">
                        Loading... {uploadProgress}%
                      </p>
                    )}

                    {!isUploading && uploadProgress === 100 && (
                      <p className="border text-green-800 p-2 text-center mt-2 rounded">
                        Upload Complete!
                      </p>
                    )}
                  </div>
                </div>

                <div className="w-full flex gap-3 mt-11">
                  <button className="bg-[#2F799E] w-full py-2 px-4 rounded text-white">
                    Save
                  </button>
                  <button
                    onClick={() => setOpenAddModal(false)}
                    className="bg-[#D9000A] w-full rounded py-2 px-4 text-white"
                  >
                    Cancel
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
            <div className="font-bold text-center mb-11">+ Edit Category</div>
            <div>
              <div className="mx-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="mb-2">Category Name</p>
                    <input
                      className="border w-full border-neutral-400 rounded p-2 px-4 bg-[#00000000]"
                      type="text"
                      placeholder="Enter category name"
                      
                    />
                  </div>

                  <div>
                    <p className="mb-2">Category Name</p>
                    <input
                      className="border w-full border-neutral-400 rounded p-2 px-4 bg-[#00000000]"
                      type="text"
                      placeholder="Enter category name"
                      
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <p className="mb-2">Category Name</p>
                  <textarea
                    className="border w-full border-neutral-400 rounded p-2 px-4 bg-[#00000000]"
                    type="text"
                    placeholder="Enter category name"
                   
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="mt-4 mb-2">Thumbs Image</p>

                    <div className="border px-5 py-4 rounded">
                      <p className="text-gray-600 text-center pb-3">
                        Suggested dimension [344×184]
                      </p>
                      <div className="border-2 border-dashed border-neutral-400 rounded h-[124px] flex flex-col items-center justify-center relative">
                        {image ? (
                          <img
                            src={image}
                            alt="Uploaded"
                            className="object-contain w-full h-full"
                          />
                        ) : (
                          <>
                            <p className="text-gray-600">
                              Drop image file here to upload
                            </p>
                            <p className="text-gray-600">(or click)</p>
                            <p className="text-4xl text-gray-600 mt-5">
                              <RiGalleryFill />
                            </p>
                          </>
                        )}
                        {/* Hidden input for file upload */}
                        <input
                          type="file"
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          onChange={handleImageChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <p className="mt-4 mb-2">Add Video</p>

                    <div className="border px-5 py-4 rounded">
                      <p className="text-gray-600 text-center pb-3">
                        Suggested dimension [344×184]
                      </p>
                      <div className="border-2 border-dashed border-neutral-400 rounded h-[76px] flex flex-col items-center justify-center relative overflow-hidden">
                        {videoPreview ? (
                          <video
                            src={videoPreview}
                            className="absolute inset-0 w-full h-full object-cover"
                            controls
                          />
                        ) : (
                          <>
                            <p className="text-gray-600">
                              Drop video file here to upload
                            </p>
                            <p className="text-gray-600">(or click)</p>
                            <p className="text-4xl text-gray-600">
                              <RiGalleryFill />
                            </p>
                            {/* Hidden input for file upload */}
                            <input
                              type="file"
                              className="absolute inset-0 opacity-0 cursor-pointer"
                              accept="video/*"
                              onChange={handleVideoUpload}
                            />
                          </>
                        )}
                      </div>
                    </div>

                    {isUploading && (
                      <p className="border text-cyan-800 p-2 text-center mt-2 rounded">
                        Loading... {uploadProgress}%
                      </p>
                    )}

                    {!isUploading && uploadProgress === 100 && (
                      <p className="border text-green-800 p-2 text-center mt-2 rounded">
                        Upload Complete!
                      </p>
                    )}
                  </div>
                </div>

                <div className="w-full flex gap-3 mt-11">
                  <button className="bg-[#2F799E] w-full py-2 px-4 rounded text-white">
                    Save
                  </button>
                  <button
                    onClick={() => setEditModal({ isOpen: false, id: null })}
                    className="bg-[#D9000A] w-full rounded py-2 px-4 text-white"
                  >
                    Cancel
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

export default Videos;
