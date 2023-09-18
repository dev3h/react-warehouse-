const dev = {
  VITE_API_ENDPOINT_URL: "https://api2.epu.edu.vn/openid",
};

const prod = {
  VITE_API_ENDPOINT_URL: "https://api.prod.com",
};

const test = {
  VITE_API_ENDPOINT_URL: "https://api.test.com",
};

const getEnv = () => {
  switch (import.meta.env.NODE_ENV) {
    case "development":
      return dev;
    case "production":
      return prod;
    case "test":
      return test;
    default:
      break;
  }
};

export const env = getEnv();
