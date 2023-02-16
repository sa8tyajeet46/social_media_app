import axios from "../axios";
const deletePost = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deletepostRequest",
    });
    const { data } = await axios.delete(`/posts/likedislike/${id}`);
    dispatch({
      type: "deletepostSucess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deletepostFail",
      payload: error.response.data.message,
    });
  }
};
export default deletePost;
