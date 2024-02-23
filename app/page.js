import Navbar from "./components/Navbar";
import Slider from "./components/Slider";
function app() {
  return (
    <div>
      <div className="text-center ">
        <h1 className="mt-5 text-2xl font-bold pb-2 border-b-4 inline-block border-solid border-[#66bfbf]">
          COURSES
        </h1>
        <Slider/>
      </div>

      <div className="text-center mt-28 mb-10">
        <h1 className="mt-5 text-2xl font-bold pb-2 border-b-4 inline-block border-solid border-[#66bfbf]">
          SECTIONS
        </h1>
        <Slider/>
      </div>
    </div>
  );
}

export default app;
