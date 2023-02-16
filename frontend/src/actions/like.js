import axios from "../axios";
const like = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "likeRequest",
    });
    const { data } = await axios.get(`/posts/likedislike/${id}`);
    dispatch({
      type: "likeSucess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "likeFail",
      payload: error,
    });
  }
};
export default like;
