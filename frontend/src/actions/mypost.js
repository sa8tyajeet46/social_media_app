import axios from "../axios";
const loadmyPost = () => async (dispatch) => {
  try {
    dispatch({
      type: "MyPostRequest",
    });

    const { data } = await axios.get("/posts/view/me");

    dispatch({
      type: "MyPostSucess",
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: "MyPostFail",
      payload: error,
    });
  }
};

export default loadmyPost;
