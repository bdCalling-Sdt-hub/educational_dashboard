import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const FAQ = () => {
  const navigate = useNavigate();

  const faq = [
    {
      qus:"how do 1",
      ans: "Answer quiesion1 Answer quiesion1 Answer quiesion1 Answer quiesion1 Answer quiesion1Answer quiesion1Answer quiesion1Answer quiesion1Answer quiesion1Answer quiesion1"
    },
    {
      qus:"how do 2",
      ans: "Answer quiesion1 Answer quiesion1 Answer quiesion1 Answer quiesion1 Answer quiesion1Answer quiesion1Answer quiesion1Answer quiesion1Answer quiesion1Answer quiesion1"
    },
    {
      qus:"how do 2",
      ans: "Answer quiesion1 Answer quiesion1 Answer quiesion1 Answer quiesion1 Answer quiesion1Answer quiesion1Answer quiesion1Answer quiesion1Answer quiesion1Answer quiesion1"
    }
  ]
  
  return (
    <div>
      <h1 className="flex gap-4 mb-7 mt-4">
          <button
            className="text-[#EF4849] "
            onClick={() => navigate(-1)} 
          >
            <FaArrowLeft />
          </button>
          <span className="text-lg font-semibold">Faq</span>
        </h1>
      <div className="grid grid-cols-2 gap-4 mt-8">
        {faq.map((item)=> <>
        
        <div className=" mb-11">
          <p>Question no: 1</p>
          <h1>{item.qus}</h1>
          <p className="mt-4">Answer</p>
          <p>{item.ans}</p>
        </div>
        
        </>)}
      </div>

      <div className="flex justify-center mt-11">
            <button 
              
              className="bg-[#2F799E] rounded py-2 px-4 text-white"
            >
              Update
            </button>
          </div>
    </div>
  );
};

export default FAQ;
