import fetchApi from "@/auth/FetchInterceptor";

export const getModuleData = async () => {
  try {
    const response = await fetchApi({
      url: "/api/module",
      method: "get",
    });
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const createModuleData = async (data) => {
  console.log("data", data);
  try {
    const response = await fetchApi({
      url: "/api/module",
      method: "post",
      data,
    });
    console.log("response", response);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const updateModuleData = async (data) => {
  try {
    const response = await fetchApi({
      url: `/api/module/${data.id}`,
      method: "put",
      data,
    });
    console.log("response", response);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const deleteModuleData = async (params) => {
  console.log("params", params);
  try {
    const response = await fetchApi({
      url: `/api/module/${params.id}`,
      method: "delete",
    });
    console.log("response", response);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};
