import fetchApi from "@/auth/FetchInterceptor";

export const getModuleActionData = async () => {
  try {
    const response = await fetchApi({
      url: "/api/moduleaction",
      method: "get",
    });
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const createModuleActionData = async (moduleId, actionId) => {
  try {
    const response = await fetchApi({
      url: "api/moduleaction",
      method: "post",
      data: {
        moduleId,
        actionId,
      },
    });
    console.log("response", response);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const deleteModuleActionData = async ({id}) => {
  try {
    const response = await fetchApi({
      url: `/api/moduleaction/${id}`,
      method: "delete",
    });
    console.log("response", response);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};
