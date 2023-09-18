import fetchApi from "@/auth/FetchInterceptor";

export const getRoleTemplateData = async () => {
  try {
    const response = await fetchApi({
      url: "/api/role_template",
      method: "get",
    });
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const createRoleTemplate = async (data) => {
  try {
    const response = await fetchApi({
      url: "/api/role_template",
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

export const updateRoleTemplate = async (data) => {
  try {
    const response = await fetchApi({
      url: `/api/role_template/${data.id}`,
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

export const deleteRoleTemplate = async (params) => {
  console.log("params", params);
  try {
    const response = await fetchApi({
      url: `/api/role_template/${params.id}`,
      method: "delete",
    });
    console.log("response", response);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};
