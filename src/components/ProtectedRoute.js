import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ onlyAuthorized, onlyUnauthorized, ...props }) => {
  const { isLogged } = useSelector((state) => state.auth);

  if (onlyAuthorized && !isLogged) {
    return <Redirect to="/login" />;
  } else if (onlyUnauthorized && isLogged) {
    return <Redirect to="/" />;
  }
  return <Route {...props} />;
};

export default ProtectedRoute;
