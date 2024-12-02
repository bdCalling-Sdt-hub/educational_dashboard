import { FaArrowLeft } from "react-icons/fa";
import img from "../../assets/userdashboard/img.png";
import img1 from "../../assets/userdashboard/img1.png";
import { useNavigate } from "react-router-dom";
const ArticleDetailsPage = () => {
    const navigate = useNavigate()
  return (
    <div>
        <h1 className="flex gap-4 mb-7 mt-4">
        <button className="text-[#EF4849] " onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        <span className="text-lg font-semibold">Video</span>
      </h1>
      <div>
        <div className="grid grid-cols-3 gap-4">
          <img className="w-full col-span-1" src={img} alt="" />
          <div className="col-span-2">
            <h3>Importance of Science Exhibition in Schools</h3>
            <p>
              In today’s era education is not only confined to read and write.
              It is now linked to the holistic development of the children. With
              the efforts of the Government and parents, education has now
              reached everyone and every child is knowledgeable nowadays. Now
              the challenge and the dtechnical events, etc.......{" "}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 mt-11 gap-4">
          
          <div className="col-span-2">
            <h3>Importance of Science Exhibition in Schools</h3>
            <p>
              In today’s era education is not only confined to read and write.
              It is now linked to the holistic development of the children. With
              the efforts of the Government and parents, education has now
              reached everyone and every child is knowledgeable nowadays. Now
              the challenge and the dtechnical events, etc. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates et deleniti tempora sequi nam dicta tenetur porro tempore rerum delectus iusto repellat fuga repudiandae, earum blanditiis non vero ut quo facere molestiae eveniet nostrum eaque aliquam! Deleniti nisi distinctio asperiores quas voluptatem delectus ullam tenetur, quam atque maxime nobis omnis nulla iure pariatur laborum exercitationem culpa debitis laudantium voluptatibus eligendi dicta sapiente facilis. Cum aperiam alias dolores soluta, odio mollitia architecto, recusandae quaerat sunt provident et, consequatur nihil dolore beatae aut itaque? Voluptatum, nemo, quisquam similique amet harum facilis neque tenetur vitae soluta laudantium quidem facere libero? Excepturi, recusandae maiores..{" "}
            </p>
          </div>
          <img className="w-full col-span-1" src={img1} alt="" />
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailsPage;
