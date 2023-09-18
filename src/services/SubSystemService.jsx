import fetchApi from "@/auth/FetchInterceptor";

export const getSubSystemData = async () => {
  try {
    const response = await fetchApi({
      url: "/api/subsystem",
      method: "get",
    });
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const createSubSystemData = async (data) => {
  console.log("data", data);
  try {
    const response = await fetchApi({
      url: "/api/subsystem",
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

export const updateSubSystemData = async (data) => {
  try {
    const response = await fetchApi({
      url: `/api/subsystem/${data.id}`,
      method: "put",
      data,
    });
    console.log("response", response);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
}

export const deleteSubSystemData = async (params) => {
  console.log('params', params);
  try {
    const response = await fetchApi({
      url: `/api/subsystem/${params.id}`,
      method: "delete",
    });
    console.log("response", response);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
}
