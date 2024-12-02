import { FaArrowLeft } from "react-icons/fa";
import img1 from "../../assets/userdashboard/img.png";
import { useNavigate } from "react-router-dom";
const VideDetailsPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1 className="flex gap-4 mb-7 mt-4">
        <button className="text-[#EF4849] " onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        <span className="text-lg font-semibold">Video</span>
      </h1>
      <div className="max-w-[900px] m-auto">
        <div className="relative">
          <img src={img1} alt={img1} className="w-full h-90 object-cover" />
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
        <h1 className="text-2xl text-[#2F799E] font-semibold">Importance of Science Exhibition in Schools</h1>
      <p className="text-[#2F799E]">1.3M views.2day’s sgo</p>
      </div>

      
    </div>
  );
};

export default VideDetailsPage;
