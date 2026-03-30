import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4">
      
      {/* 404 Text */}
      <h1 className="text-8xl font-bold text-blue-500">404</h1>

      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-semibold mt-4">
        Page Not Found
      </h2>

      {/* Description */}
      <p className="text-gray-400 mt-2 text-center max-w-md">
        Oops! The page you are looking for doesn’t exist or has been moved.
      </p>

      {/* Button */}
      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-300"
      >
        Go Back Home
      </button>
      
    </div>
  );
};

export default NotFound;