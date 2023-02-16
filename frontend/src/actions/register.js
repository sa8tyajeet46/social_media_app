import axios from "../axios";
const registerUser = (email, password, name, avatar) => async (dispatch) => {
  try {
    dispatch({
      type: "mailRequest",
    });

    const { data } = await axios.post(
      "/users/createprofile",
      { email, password, name, avatar },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "mailSucess",
      payload: data.message,
    });
  } catch (error) {
    // console.log(error);
    dispatch({
      type: "mailFail",
      payload: error.response.data.message,
    });
  }
};

export default registerUser;
