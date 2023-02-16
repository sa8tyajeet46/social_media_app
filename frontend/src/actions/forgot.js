import axios from "../axios";
const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: "ForgotRequest",
    });

    const { data } = await axios.post(
      "/forget/password",
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "ForgotSucess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "ForgotFail",
      payload: error.response.data.message,
    });
  }
};

export default forgotPassword;
