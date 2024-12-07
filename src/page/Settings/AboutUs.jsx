import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import about from "../../assets/userdashboard/about.png";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line, RiGalleryFill } from "react-icons/ri";
import { Modal } from "antd";
import { useState } from "react";
const AboutUs = () => {


  const [openAddModal, setOpenAddModal] = useState(false);
  const [editModal, setEditModal] = useState({ isOpen: false, id: null });
  const navigate = useNavigate();

  const [newCategory, setNewCategory] = useState("");
  const [editedCategory, setEditedCategory] = useState("");
  const [image, setImage] = useState(null);

  const handleAddCategory = async () => {
    console.log("New Category Added:", newCategory);

    
    setOpenAddModal(false);
    setNewCategory("");
  };

  const handleEditCategory = async () => {
    console.log("Category Edited:", editedCategory);

   

    setEditModal({ isOpen: false, id: null });
    setEditedCategory("");
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

  return (
    <div>
      <div className="flex justify-between mb-7 mt-4">
        <h1 className="flex gap-4">
          <button className="text-[#EF4849] " onClick={() => navigate(-1)}>
            <FaArrowLeft />
          </button>
          <span className="text-lg font-semibold">About Us</span>
        </h1>
      </div>

      <div className="flex justify-between">
        <div>
          <h1 className="md:text-4xl text-2xl  font-bold">
            Discover Who We Are &
          </h1>
          <h1 className="text-white font-bold md:text-4xl text-2xl  mt-2">
            <span className="text-zinc-600">-</span> what drives us
          </h1>
        </div>
        <div className="flex gap-8 text-xl text-[#2F799E]">
          <button onClick={() => setOpenAddModal(true)}>
            <MdOutlineEdit />
          </button>
          <button onClick={() => hndleDelet(item._id)}>
            <RiDeleteBin6Line />
          </button>
        </div>
      </div>

      <div className="mt-4">
        <img src={about} alt="about" />

        <h1 className="text-2xl font-semibold my-4 mt-8">
          Get to Know Us: Our Journey and Vision for Child Education
        </h1>

        <p>
          Our story begins with a simple yet profound belief: Every child
          deserves the opportunity to learn, grow, and thrive. Driven by this
          conviction, we embarked on a journey to create a future where
          education is not a privilege but a universal right. From the start,
          our mission has been clear—to bridge gaps in education, nurture
          curiosity, and empower children with the tools they need to shape
          their own destinies. We've faced challenges and celebrated successes,
          but our commitment has remained unwavering: to inspire a love of
          learning and unlock the potential in every child. Our vision is bold
          but achievable: a world where every child, regardless of their
          background, has access to quality education that is inclusive,
          engaging, and transformative. We aim to harness the power of
          technology, community collaboration, and innovative teaching practices
          to make this vision a reality. Together, with educators, parents, and
          supporters like you, we’re building a brighter future—one lesson, one
          dream, and one child at a time. Join us in this journey to change
          lives through the power of education.
        </p>

        <div className="text-center">
        <button onClick={() =>
                        setEditModal({ isOpen: true, })
                      } className="bg-[#2F799E] text-white rounded py-2 px-6 mt-5">Edit</button>
        </div>
      </div>

      <Modal
        centered
        open={openAddModal}
        onCancel={() => {
          setOpenAddModal(false);
          setNewCategory(""); // Reset the category value
          setImage(null); // Reset the image value
        }}
        footer={null}
        width={600}
      >
        <div className="mb-20 mt-4">
          <div className="">
            <div className="font-bold text-center mb-11">+ Add </div>
            <div>
              <div className="mx-20">
                <p className="mb-2">Category Name</p>
                <input
                  className="border w-full border-neutral-400 rounded p-2 px-4 bg-[#00000000]"
                  type="text"
                  placeholder="Enter category name"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                />

                <div className="">
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

                  <p className="mb-2 mt-5">Description</p>
                
                <textarea className="border w-full border-neutral-400 rounded p-2 px-4 bg-[#00000000]" name="" id="" type="text"
                  placeholder="Enter Description"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}></textarea>

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
                      setOpenAddModal(false); // Close the modal
                      setNewCategory(""); // Reset category value
                      setImage(null); // Reset image value
                    }}
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
        <div className="mb-11 mt-4">
          <div className="">
            <div className="font-bold text-center mb-11">Edit</div>
            <div>
              <div className="mx-20">
                <p className="mb-2">Category</p>
                <input
                  className="border w-full border-neutral-400 rounded p-2 px-4 bg-[#00000000]"
                  type="text"
                  placeholder="Edit category name"
                  onChange={(e) => setEditedCategory(e.target.value)}
                />

                <div className="">
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
                  <p className="mb-2 mt-5">Description</p>
                  <textarea className="border w-full  border-neutral-400 rounded p-2 px-4 bg-[#00000000]" name="" id="" type="text"
                  placeholder="Enter Description"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}></textarea>
                </div>
                <div className="w-full flex gap-3 mt-6">
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

export default AboutUs;
