import fetchApi from "@/auth/FetchInterceptor";

export const getSystemData = async () => {
  try {
    const response = await fetchApi({
      url: "/api/system",
      method: "get",
    });
    return response;
  } catch (err) {
    console.log('err', err);
    return err;
  }
};

export const createSystemData = async (data) => {
  try {
    const response = await fetchApi({
      url: "/api/system",
      method: "post",
      data,
    });
    return response;
  } catch (err) {
    console.log('err', err);
    return err;
  }
};

export const updateSystemData = async (data) => {
  try {
    const response = await fetchApi({
      url: `/api/system/${data.id}`,
      method: "put",
      data,
    });
    console.log("response", response);
    return response;
  } catch (err) {
    console.log('err', err);
    return err;
  }
};

export const deleteSystemData = async (params) => {
  try {
    const response = await fetchApi({
      url: `/api/system/${params.id}`,
      method: "delete",
    });
    console.log("response", response);
    return response;
  } catch (err) {
    console.log('err', err);
    return err;
  }
};
