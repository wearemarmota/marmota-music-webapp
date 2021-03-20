import request from "./api-service";

function register(user, email, password) {
  return request({
    url: `/register`,
    method: "POST",
    data: {
      name: user,
      email,
      password,
    },
  });
}

function login(email, password) {
  return request({
    url: `/login`,
    method: "POST",
    data: {
      email,
      password,
    },
  });
}

const AuthService = {
  register,
  login,
};

export default AuthService;
