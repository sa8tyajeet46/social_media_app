import axios from "../axios";
const loadsUser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "sUserRequest",
    });

    const { data } = await axios.get(`/user/${id}`);

    dispatch({
      type: "sUserSucess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "sUserFail",
      payload: error.response.data.message,
    });
  }
};

export default loadsUser;
