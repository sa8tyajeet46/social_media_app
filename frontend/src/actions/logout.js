import axios from "../axios";
const logoutUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "logoutRequest",
    });

    const { data } = await axios.get("/users/logout");

    dispatch({
      type: "logoutSucess",
    });
  } catch (error) {
    dispatch({
      type: "logoutFail",
      payload: error.response.data,
    });
  }
};

export default logoutUser;
