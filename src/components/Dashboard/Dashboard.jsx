import article from "../../assets/userdashboard/totalArticles.png";
import totalUser from "../../assets/userdashboard/totalUser.png";
import totalVideo from "../../assets/userdashboard/totalVideo.png";
import dash from "../../assets/routerImg/dash.png";

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Legend,
  ResponsiveContainer,
} from "recharts";
const Dashboard = () => {



  const topPodcasts = [
    { id: 1, eventName: "Classics Music", total: 84, image: dash },
    { id: 2, eventName: "Modern Beats", total: 67, image: dash },
    { id: 3, eventName: "Jazz Vibes", total: 52, image: dash },
    { id: 4, eventName: "Pop Hits", total: 45, image: dash },
    { id: 5, eventName: "Rock Anthems", total: 40, image: dash },
    { id: 6, eventName: "Chill Lo-Fi", total: 37, image: dash },
    { id: 7, eventName: "Classical Melodies", total: 35, image: dash },
    { id: 8, eventName: "Hip-Hop Essentials", total: 30, image: dash },
  ];



  const dataa = [
    { name: "Jan", value: 20 },
    { name: "Feb", value: 80 },
    { name: "Mar", value: 40 },
    { name: "Apr", value: 100 },
    { name: "May", value: 60 },
    { name: "Jun", value: 80 },
    { name: "Jul", value: 50 },
    { name: "Aug", value: 40 },
  ];
  return (
    <div className=" min-h-screen ">
      <div className="">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
        <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 ">
          <div className="bg-white p-4 rounded-xl shadow text-center">
            <h3 className="text-[#2F799E] text-xl font-semibold">Total User</h3>
            <div className="flex justify-center my-2">
              <div className="bg-[#2F799E] p-2  rounded-full">
                <img className="" src={totalUser} alt="" />
              </div>
            </div>
            <p className="text-2xl ">324</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow text-center">
            <h3 className="text-[#2F799E] text-xl font-semibold">
              Total Video's
            </h3>
            <div className="flex justify-center my-2">
              <div className="bg-[#2F799E] p-2  rounded-full">
                <img className="" src={totalVideo} alt="" />
              </div>
            </div>
            <p className="text-2xl ">345</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow text-center">
            <h3 className="text-[#2F799E] text-xl font-semibold">
              Total Articles
            </h3>
            <div className="flex justify-center my-2">
              <div className="bg-[#2F799E] p-2  rounded-full">
                <img className="" src={article} alt="" />
              </div>
            </div>
            <p className="text-2xl ">345</p>
          </div>

          
        </div>
        </div>
        <div className="bg-white rounded mt-4">
        <div className="items-center mb-4">
            <h3 className="text-gray-700 font-bold pt-3 pl-7">
              User Growth
            </h3>
            <div className="flex justify-end">
              <select
                className=" text-[#2F799E] rounded -mt-5 p-2 px-4 bg-[#00000000] mr-11"
                name=""
                id=""
              >
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
              </select>
            </div>
          </div>
        <ResponsiveContainer width="95%" height={300}>
            <AreaChart
              data={dataa}
              margin={{
                top: 10,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#2F799E"
                fill="#2F799E"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        </div>

        <div className="col-span-1">
          <div className="bg-white h-[533px] overflow-scroll p-4 rounded shadow ">
  <h3 className="text-gray-700 font-bold mb-4">Top - Video's</h3>
  <div className="overflow-x-auto">
    <table className="min-w-full">
      <thead>
        <tr className="text-[#2F799E]">
          <th className="px-4 py-2 text-left">SL no.</th>
          <th className="px-4 py-2">Video</th>
          <th className="px-4 py-2 text-left">View</th>
        </tr>
      </thead>
      <tbody>
        {topPodcasts.map((podcast, index) => (
          <tr key={podcast.id}>
            <td className="px-4 py-2">{index + 1}</td>
            <td className="px-4 py-2 flex gap-2">
              <img src={podcast.image} alt={podcast.eventName} />
              <span className="mt-2">{podcast.eventName}</span>
            </td>
            <td className="px-4 py-2">{podcast.total}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
        </div>
      </div>



      <div className="bg-white overflow-scroll h-[350px] mt-4 p-4 rounded shadow mb-6">
  <h3 className="text-gray-700 font-bold mb-4">Recent User</h3>
  <div className="overflow-x-auto">
    <table className="min-w-full">
      <thead>
        <tr className="text-[#2F799E]">
          <th className="px-4 py-2 text-left">SL no.</th>
          <th className="px-4 py-2 text-start">Name</th>
          <th className="px-4 py-2 text-left">Date of Birth</th>
          <th className="px-4 py-2 text-start">Email</th>
          <th className="px-4 py-2 text-left">Contuct Number</th>
        
          
        </tr>
      </thead>
      <tbody>
        {topPodcasts.map((podcast, index) => (
          <tr key={podcast.id}>
            <td className="px-4 py-2">{index + 1}</td>
            <td className="px-4 py-2 flex gap-2">
              <img src={podcast.image} alt={podcast.eventName} />
              <span className="mt-2">{podcast.eventName}</span>
            </td>
            <td className="px-4 py-2">{podcast.total}</td>
            <td className="px-4 py-2">{podcast.total}</td>
            <td className="px-4 py-2">{podcast.total}</td>
            
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

      </div>

    </div>
  );
};

export default Dashboard;
