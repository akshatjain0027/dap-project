import axios from "axios";
import history from "../../utils/history";
import { SET_CURRENT_USER } from "../types";

export const signup = user => {
  return async function(dispatch) {
    try {
      const res = await axios.post("/api/users/register", user);
      console.log(res);
      dispatch({
        type: SET_CURRENT_USER,
        payload: res.data
      });
      history.push("/");
    } catch (error) {
      console.log(error.response.data);
    }
  };
};
