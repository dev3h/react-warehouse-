import fetchApi from "@/auth/FetchInterceptor";

export const getSubSystemModuleData = async () => {
  try {
    const response = await fetchApi({
      url: "/api/subsystemmodule",
      method: "get",
    });
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const createSubSystemModuleData = async (subsystemId, moduleId) => {
  try {
    const response = await fetchApi({
      url: "api/subsystemmodule",
      method: "post",
      data: {
        subsystemId,
        moduleId,
      },
    });
    console.log("response", response);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const deleteSubSystemModuleData = async ({id}) => {
  try {
    const response = await fetchApi({
      url: `/api/subsystemmodule/${id}`,
      method: "delete",
    });
    console.log("response", response);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};
