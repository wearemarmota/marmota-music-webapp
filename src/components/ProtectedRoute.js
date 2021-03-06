import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = props => {

  const storage = window.localStorage;
  const apiUri = storage.getItem("api_uri");

  return apiUri ?
    <Route {...props} /> :
    <Redirect to="/api-settings" />;

}

export default ProtectedRoute;