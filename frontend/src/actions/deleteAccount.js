import axios from "../axios";
const deleteAccount = () => async (dispatch) => {
  try {
    dispatch({
      type: "deleteProfileRequest",
    });
    const { data } = await axios.delete(`/profile/deleteUser`);
    dispatch({
      type: "deleteProfileSucess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteProfileFail",
      payload: error.response.data.message,
    });
  }
};
export default deleteAccount;
