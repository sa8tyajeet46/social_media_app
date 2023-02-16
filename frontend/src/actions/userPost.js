import axios from "../axios";
const userPost = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "sPostUserRequest",
    });

    const { data } = await axios.get(`/posts/user/${id}`);

    dispatch({
      type: "sPostUserSucess",
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: "sPostUserFail",
      payload: error.response.data.message,
    });
  }
};

export default userPost;
