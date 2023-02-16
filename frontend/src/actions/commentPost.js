import axios from "../axios";
const commentPost = (id, comment) => async (dispatch) => {
  try {
    dispatch({
      type: "commentRequest",
    });
    const { data } = await axios.put(
      `/posts/comment/${id}`,
      { comment },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: "commentSucess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "commentFail",
      payload: error,
    });
  }
};
export default commentPost;
