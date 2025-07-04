import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-36">
      <h1 className="text-6xl font-bold mb-12">Página não encontrada.</h1>
      <Link to="/" className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-500 transition-colors mt-4">
        Home 
      </Link>
    </div>
  );
};

export default NotFound;
