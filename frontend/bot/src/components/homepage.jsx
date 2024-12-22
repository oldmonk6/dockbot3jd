import { useNavigate } from "react-router-dom";
import { Navbar2 } from "./navabar2";
import video1 from "../assets/video1.mp4";

export function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen bg-gray-900 text-white">
      <div>
        <Navbar2 />
      </div>
      <div className="w-screen mt-8 flex flex-col items-center">
        <div className="mb-6">
          {/* Image or Video Component */}
          <video 
  className="rounded-lg shadow-md" 
  src={video1} 
  autoPlay 
  loop 
  muted 
  width="650"
>
  Your browser does not support the video tag.
</video>

          {/* Alternatively, you can replace the above video component with an image */}
          {/* <img 
            className="rounded-lg shadow-md" 
            src="/path-to-your-image.jpg" 
            alt="DocBot" 
            width="600" 
          /> */}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Upload Document Section */}
          <div className="bg-gray-800 rounded-lg p-6 flex flex-col items-center justify-around shadow-md">
            <p className="text-2xl font-semibold mb-4">Upload Your Document</p>
            <button
              className="bg-gray-700 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition"
              onClick={() => navigate("/upload")}
            >
              Click Here to Upload
            </button>
          </div>

          {/* Chat with Bot Section */}
          <div className="bg-gray-800 rounded-lg p-6 flex flex-col items-center justify-around shadow-md">
            <p className="text-2xl font-semibold mb-4">Chat with the Bot</p>
            <button
              className="bg-gray-700 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition"
              onClick={() => navigate("/chat")}
            >
              Click Here to Start
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}