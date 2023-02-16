import axios from "../axios";
const verifyUser = (token) => async (dispatch) => {
  try {
    dispatch({
      type: "registerRequest",
    });

    const { data } = await axios.get(`/confirm/signUp/${token}`);

    dispatch({
      type: "registerSucess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "registerFail",
      payload: error,
    });
  }
};

export default verifyUser;
