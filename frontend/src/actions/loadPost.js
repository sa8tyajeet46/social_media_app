import axios from "../axios";
const loadPost = () => async (dispatch) => {
  try {
    dispatch({
      type: "followingPostRequest",
    });

    const { data } = await axios.get("/posts/view");

    dispatch({
      type: "followingPostSucess",
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: "followingPostFail",
      payload: error.response.data.message,
    });
  }
};

export default loadPost;
