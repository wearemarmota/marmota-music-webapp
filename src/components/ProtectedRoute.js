import { compose } from "redux";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({onlyAuthorized, onlyUnauthorized, ...props}) => {
  if(onlyAuthorized && !props.auth.isLogged){
    return <Redirect to="/login" />;
  }else if(onlyUnauthorized && props.auth.isLogged){
    return <Redirect to="/" />
  }
  return <Route {...props} />;
}

const mapStateToProps = state => {
  const { auth } = state;
  return { auth };
}

export default compose(
  connect(mapStateToProps)
)(ProtectedRoute);