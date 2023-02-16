import axios from "../axios";
const resetPassword = (token, password) => async (dispatch) => {
  try {
    dispatch({
      type: "ResetRequest",
    });

    const { data } = await axios.post(
      `/password/reset/${token}`,
      { password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "ResetSucess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "ResetFail",
      payload: error.response.data.message,
    });
  }
};

export default resetPassword;
