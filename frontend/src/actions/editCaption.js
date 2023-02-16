import axios from "../axios";
const editCaption = (id, caption) => async (dispatch) => {
  try {
    dispatch({
      type: "editCaptionRequest",
    });

    const { data } = await axios.post(
      `/posts/edit/${id}`,
      { caption },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "editCaptionSucess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "editCaptionFail",
      payload: error,
    });
  }
};

export default editCaption;
