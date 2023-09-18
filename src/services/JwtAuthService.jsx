import fetchApi from "../auth/FetchInterceptor";

const JwtAuthService = {};

JwtAuthService.login = async function (username, password) {
  try {
    const response = await fetchApi({
      url: "/api/auth/signin",
      method: "post",
      headers: {
        "public-request": "true",
      },
      data: {
        username,
        password,
      },
    });
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

JwtAuthService.signUp = function (data) {
  return fetch({
    url: "/auth/signup",
    method: "post",
    headers: {
      "public-request": "true",
    },
    data: data,
  });
};

export default JwtAuthService;
