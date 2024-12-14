import { Table, Input, Space, Modal } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { MdBlockFlipped } from "react-icons/md";
import { LuEye } from "react-icons/lu";
import { FaArrowLeft } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "../../assets/header/profileLogo.png";
import Swal from "sweetalert2";
import UseUserManagement from "../../hook/UseUserManagement";
import UseAxios from "../../hook/UseAxios";
import AdminUrl from "../../hook/AdminUrl";



const adminUrl = AdminUrl()

const blockUser = async (id) => {
    try {
        console.log("Blocking user with ID:", id); 
        const response = await adminUrl.post(`/dashboard/block/${id}`);
        console.log("Block response:", response.data); 
        return response.data;
    } catch (error) {
        console.error("Error blocking user:", error);
        throw error;
    }
};


const unblockUser = async (id) => {
    try {
        console.log("Unblocking user with ID:", id); 
        const response = await adminUrl.post(`/dashboard/unblock/${id}`);
        console.log("Unblock response:", response.data); 
        return response.data;
    } catch (error) {
        console.error("Error unblocking user:", error);
        throw error;
    }
};

const handleBlock = async (record, setBlocked, refetch) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Block it!",
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                console.log("Attempting to block user:", record.key);
                await blockUser(record.key);
                setBlocked((prevState) => ({
                    ...prevState,
                    [record.key]: true,
                }));
                console.log("User blocked successfully:", record.key); 
                Swal.fire({
                    title: "Blocked",
                    text: "The user has been blocked.",
                    icon: "success",
                });
                refetch();
            } catch (error) {
                console.error("Failed to block user:", error); 
                Swal.fire("Error", "Failed to block the user.", "error");
            }
        }
    });
};


const handleUnblock = async (record, setBlocked, refetch) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You want to unblock this user!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Unblock it!",
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                console.log("Attempting to unblock user:", record.key); 
                await unblockUser(record.key);
                setBlocked((prevState) => ({
                    ...prevState,
                    [record.key]: false,
                }));
                console.log("User unblocked successfully:", record.key); 
                Swal.fire({
                    title: "Unblocked",
                    text: "The user has been unblocked.",
                    icon: "success",
                });
                refetch();
            } catch (error) {
                console.error("Failed to unblock user:", error); 
                Swal.fire("Error", "Failed to unblock the user.", "error");
            }
        }
    });
};


const columns = (openModal, setBlocked, blocked, refetch) => [
    {
        title: "SL no.",
        dataIndex: "sl",
        width: 70,
        align: "center",
    },
    {
        title: "User's Name",
        dataIndex: "userName",
        width: 150,
        render: (text) => (
            <Space>
                <img
                    src="https://via.placeholder.com/32"
                    alt="avatar"
                    style={{ borderRadius: "50%", width: 32, height: 32 }}
                />
                {text}
            </Space>
        ),
    },
    {
        title: "Address",
        dataIndex: "address",
    },
    {
        title: "Date of birth",
        dataIndex: "dateOfBirth",
    },
    {
        title: "Contact Number",
        dataIndex: "contactNumber",
    },
    {
        title: "Email",
        dataIndex: "email",
    },
    {
        title: "Subscription",
        dataIndex: "subscription",
        align: "center",
    },
    {
        title: "Action",
        dataIndex: "action",
        align: "center",
        render: (_, record) => (
            <Space size="middle">
                {!blocked[record.key] ? (
                    <button className="mt-2" onClick={() => openModal(record)}>
                        <span className="text-xl">
                            <LuEye />
                        </span>
                    </button>
                ) : (
                    <button
                        onClick={() => handleUnblock(record, setBlocked, refetch)}
                        className="bg-green-600 text-white w-[80px] h-[30px] flex justify-center text-sm items-center rounded-md"
                    >
                        Unblock
                    </button>
                )}
                {!blocked[record.key] ? (
                    <button
                        onClick={() => handleBlock(record, setBlocked, refetch)}
                        className="bg-red-600 text-white w-[30px] h-[30px] flex justify-center text-xl items-center rounded-md"
                    >
                        <MdBlockFlipped />
                    </button>
                ) : null}
            </Space>
        ),
    },
];


const UserManagement = () => {

    const [modal2Open, setModal2Open] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [blocked, setBlocked] = useState({});
    const navigate = useNavigate();
    const [alluser, isLoading, refetch] = UseUserManagement();

    const openModal = (record) => {
        setSelectedRecord(record);
        setModal2Open(true);
    };

    const closeModal = () => {
        setModal2Open(false);
        setSelectedRecord(null);
    };

    const userData = alluser.map((user, index) => ({
        key: user._id,
        sl: `#${index + 1}`,
        userName: user.name,
        address: user.address,
        dateOfBirth: user.dateOfBirth || "N/A",
        contactNumber: user.contactNumber || "-",
        email: user.auth.email,
        subscription: user.auth.subscriptionType,
    }));
    
    return (
        <div>
            <div className="flex justify-between mb-7 mt-4">
                <h1 className="flex gap-4 text-[#2F799E]">
                    <button
                        className=" -mt-[20px]"
                        onClick={() => navigate(-1)}
                    >
                        <FaArrowLeft />
                    </button>
                    <span className="text-lg font-semibold">User Management</span>
                </h1>
                <Input
                    placeholder="Search here..."
                    prefix={<SearchOutlined />}
                    style={{ marginBottom: "16px", maxWidth: "300px" }}
                />
            </div>

            <Table
                columns={columns(openModal, setBlocked, blocked, refetch)}
                dataSource={userData}
                loading={isLoading}
                pagination={{
                    position: ["bottomCenter"],
                    hideOnSinglePage: false,
                }}
            />

            <Modal
                centered
                open={modal2Open}
                onCancel={closeModal}
                footer={null}
                closable={true}
                width={400}
                bodyStyle={{ borderRadius: 0 }}
                className="no-border-radius-modal"
                closeIcon={<span className="text-lg text-black">×</span>}
            >
                <div className="flex justify-center py-8">
                    <img
                        className="w-[70px] h-[70px] rounded-full"
                        src={Profile}
                        alt="profile"
                    />
                </div>
                <div>
                    <div className="grid grid-cols-2">
                        <div className="text-lg gap-4">
                            <h4>Name:</h4>
                            <h4>Date of birth:</h4>
                            <h4>Contact Number:</h4>
                            <h4>Email:</h4>
                            <h4>Subscription:</h4>
                            <h4>Address:</h4>
                        </div>
                        <div className="gap-4 text-lg text-neutral-500">
                            <h3>{selectedRecord?.userName}</h3>
                            <h3>{selectedRecord?.dateOfBirth}</h3>
                            <h3>{selectedRecord?.contactNumber}</h3>
                            <h3>{selectedRecord?.email}</h3>
                            <h3>{selectedRecord?.subscription}</h3>
                            <div className="bg-[#D9D9D9] p-3 rounded">
                                {selectedRecord?.address}
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default UserManagement;
