import axios from "../axios";
const allUser =
  (name = "", limit = 100) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "allUserRequest",
      });

      const { data } = await axios.get(`/user/all?name=${name}&limit=${limit}`);

      dispatch({
        type: "allUserSucess",
        payload: data.users,
      });
    } catch (error) {
      dispatch({
        type: "allUserFail",
        payload: error.response.data.message,
      });
    }
  };

export default allUser;
