import { useContext } from "react";
import AllContext from "../contexts/AllContext";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const SecureRoutes = ({ children }) => {
  const { user, loading } = useContext(AllContext);
  if (loading) {
    return (
      <div className="py-[100px]" height={200} width={200}>
        loading
      </div>
    );
  } else if (user) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};

SecureRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SecureRoutes;
