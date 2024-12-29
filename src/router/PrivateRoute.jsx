import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { FadeLoader } from "react-spinners";

const PrivetRouter = ({ children }) => {
  const { user, loading } = useAuth()
  if (loading) {
    return (
      <div className="flex justify-center">
        <FadeLoader color="#36d7b7" loading={true} size={80} />
      </div>
    );
  }
  if (user) {
    return children;
  }
  return <Navigate to="/login"></Navigate>;
};

export default PrivetRouter;

