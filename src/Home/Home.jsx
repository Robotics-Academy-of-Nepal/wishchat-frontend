import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import goodwishLogo from "../assets/wishchat-logo.png";
import goodwishvideo from "../assets/wishchat.mp4";
import Footer from "../Components/footer/Footer";

function Home() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [userPicture, setUserPicture] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const pic = localStorage.getItem("Picture");
    if (token) {
      setIsAuthenticated(true);
      setUserPicture(pic);
    }
  }, []);

  const token =localStorage.getItem('token');

  const handleGetStarted = () => {
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/signin");
    }
  };

  return (
    // Add min-h-screen to ensure full-page height and flex to keep footer at bottom
<div className="flex flex-col min-h-screen ">
  {/* Main Content Wrapper */}
  <div className="flex-1" >
    <div className="flex flex-col items-center justify-between px-6 py-10 md:flex-row">
      <div className="flex flex-col items-start justify-center space-y-4">
        <p className="text-5xl font-bold text-center md:text-left">Welcome to WishChat</p>
        <p className="text-lg font-semibold text-center md:text-left">
          The power of AI-powered Chatbots at the click of your mouse.
        </p>
        <button className="px-6 py-2 text-white transition bg-blue-500 rounded-md shadow-md hover:bg-blue-600" onClick={handleGetStarted}>
          {token? "Go to Dashboard →" : "Login →"}
          
        </button>
      </div>
      <div className="w-full md:w-[700px] mt-4 md:mt-0">
        <video
          className="w-full h-auto border-2 border-black border-solid rounded-lg md:h-auto"
          src={goodwishvideo}
          muted
          autoPlay
          loop
          playsInline
        ></video>
      </div>
    </div>
  </div>

  {/* Footer */}
  <Footer />
</div>

  );
}

export default Home;
