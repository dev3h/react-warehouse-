import fetchApi from "@/auth/FetchInterceptor";

export const getActionData = async () => {
  try {
    const response = await fetchApi({
      url: "/api/action",
      method: "get",
    });
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const createActionData = async (data) => {
  try {
    const response = await fetchApi({
      url: "/api/action",
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

export const updateActionData = async (data) => {
  try {
    const response = await fetchApi({
      url: `/api/action/${data.id}`,
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

export const deleteActionData = async (params) => {
  console.log("params", params);
  try {
    const response = await fetchApi({
      url: `/api/action/${params.id}`,
      method: "delete",
    });
    console.log("response", response);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};
