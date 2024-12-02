import React from 'react';
import { FaArrowLeft, FaTrashAlt } from 'react-icons/fa';

import {  Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { IoArrowUndoSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
const FeedBack = () => {

    const navigate = useNavigate()
  const feedbackData = [
    { name: 'Ian', description: 'Our Bachelor of Commerce program is ACBS-accredited.', time: '8:38 AM', status: 'Pending' },
    { name: 'Ian', description: 'Our Bachelor of Commerce program is ACBS-accredited.', time: '8:38 AM', status: 'Replied' },
    { name: 'Ian', description: 'Our Bachelor of Commerce program is ACBS-accredited.', time: '8:38 AM', status: 'Replied' },
    { name: 'Ian', description: 'Our Bachelor of Commerce program is ACBS-accredited.', time: '8:38 AM', status: 'Replied' },
    { name: 'Ian', description: 'Our Bachelor of Commerce program is ACBS-accredited.', time: '8:38 AM', status: 'Replied' },
    { name: 'Ian', description: 'Our Bachelor of Commerce program is ACBS-accredited.', time: '8:38 AM', status: 'Replied' },
    { name: 'Ian', description: 'Our Bachelor of Commerce program is ACBS-accredited.', time: '8:38 AM', status: 'Replied' },
    { name: 'Ian', description: 'Our Bachelor of Commerce program is ACBS-accredited.', time: '8:38 AM', status: 'Replied' },
  ];

  return (
    <div className="">

<div className="flex justify-between mb-7 mt-4">
                <h1 className="flex gap-4">
                    <button
                        className="text-[#EF4849] -mt-[20px]"
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
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Description</th>
              <th className="py-2 px-4 text-left">Time</th>
              <th className="py-2 px-4 text-right">Status</th>
              
            </tr>
          </thead>
          <tbody>
            {feedbackData.map((feedback, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-4">{feedback.name}</td>
                <td className="py-2 px-4">{feedback.description}</td>
                <td className="py-2 px-4">{feedback.time}</td>
                <td className="py-2 px-4 text-right ">
                  <span
                    className={`inline-block px-2 py-1 rounded  ${
                      feedback.status === 'Pending'
                        ? 'border border-[#2F799E] text-[#2F799E]'
                        : 'border border-[#7CC84E] text-[#7CC84E]'
                    }`}
                  >
                    <span className='flex'><IoArrowUndoSharp  className='text-xl mt-[2px] mr-2'/>
                    {feedback.status}</span>
                  </span>
                  <button className="text-[#6A6D7C] ml-4">
                    <FaTrashAlt />
                  </button>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeedBack;
