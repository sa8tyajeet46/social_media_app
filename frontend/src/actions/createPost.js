import axios from "../axios";
const uploadPost = (caption, image) => async (dispatch) => {
  try {
    dispatch({
      type: "PostRequest",
    });

    const { data } = await axios.post(
      "/posts/upload",
      { caption, image },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "postSucess",
      payload: data.message,
    });
  } catch (error) {
    //console.log(error);
    dispatch({
      type: "postFail",
      payload: error.response.data.message,
    });
  }
};

export default uploadPost;
