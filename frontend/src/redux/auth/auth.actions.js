import axios from "axios";
import jwt_decode from "jwt-decode";
import history from "../../utils/history";
import setAuthToken from "../../utils/setAuthToken";
import { SET_CURRENT_USER } from "../types";

export const signUp = user => {
  return async function(dispatch) {
    try {
      const res = await axios.post("/api/users/register", user);
      console.log(res);
      dispatch(setCurrentUser(res.data));
      history.push("/");
    } catch (error) {
      console.log(error.response.data);
    }
  };
};

export const signIn = user => {
  return async function(dispatch) {
    try {
      const res = await axios.post("/api/users/login", user);
      const { token } = res.data;
      //set token to localstorage
      localStorage.setItem("jwtToken", token);
      //set token to auth header
      setAuthToken(token);
      //decode token to get user data
      const decoded = jwt_decode(token);
      //set current user
      dispatch(setCurrentUser(decoded));
      history.push("/profile");
    } catch (error) {
      console.log(error.response.data);
    }
  };
};
//Set logged in user

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
