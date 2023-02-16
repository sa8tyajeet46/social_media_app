import axios from "../axios";
const deleteCommentPost = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteCommentRequest",
    });
    const { data } = await axios.delete(`/posts/comment/${id}`);
    dispatch({
      type: "deleteCommentSucess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deletecommentFail",
      payload: error,
    });
  }
};
export default deleteCommentPost;
