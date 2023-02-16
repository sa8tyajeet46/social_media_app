import axios from "../axios";
const follow = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "FollowRequest",
    });
    const { data } = await axios.get(`/follow/${id}`);
    dispatch({
      type: "FollowSucess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "FollowFail",
      payload: error.response.data.message,
    });
  }
};
export default follow;
