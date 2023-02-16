import axios from "../axios";
const editprofile = (name, avatar) => async (dispatch) => {
  try {
    dispatch({
      type: "editProfileRequest",
    });

    const { data } = await axios.put(
      `/profile/update`,
      { name, avatar },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "editProfileSucess",
      payload: data.message,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "editProfileFail",
      payload: error.response.data.message,
    });
  }
};

export default editprofile;
