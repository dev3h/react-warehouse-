import fetchApi from "@/auth/FetchInterceptor";

export const getSystemSubSystemData = async () => {
  try {
    const response = await fetchApi({
      url: "/api/systemsubsystem",
      method: "get",
    });
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const createSystemSubSystemData = async (systemId, subsystemId) => {
  console.log("system: ", systemId);
  console.log("subsystem: ", subsystemId);
  try {
    const response = await fetchApi({
      url: "api/systemsubsystem",
      method: "post",
      data: {
        systemId,
        subsystemId,
      },
    });
    console.log("response", response);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const deleteSystemSubSystemData = async ({id}) => {
  try {
    const response = await fetchApi({
      url: `/api/systemsubsystem/${id}`,
      method: "delete",
    });
    console.log("response", response);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};
