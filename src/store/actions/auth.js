import * as actionTypes from "./actionTypes";
import axios from "axios";

const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

const authSuccess = (idToken, localId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken,
    localId,
  };
};

const authFailed = (error) => {
  return {
    type: actionTypes.AUTH_FAILED,
    error,
  };
};

export const authLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("expirationTime");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

const autoLogout = (expiresIn) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(authLogout());
    }, expiresIn * 1000);
  };
};

export const auth = (email, password, isSignUp) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };

    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDSNGsFdPxsTHPh7VEtBdD_mCjNcMBQ7i4";
    if (!isSignUp) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDSNGsFdPxsTHPh7VEtBdD_mCjNcMBQ7i4";
    }

    axios
      .post(url, authData)
      .then((response) => {
        console.log(response.data);
        const expirationTime = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        console.log("expires @ " + expirationTime);
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("userId", response.data.localId);
        localStorage.setItem("expirationTime", expirationTime);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(autoLogout(response.data.expiresIn));
      })
      .catch((error) => {
        console.log(error);
        dispatch(authFailed(error.response.data.error));
      });
  };
};

export const loginStatusCheck = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log('[login status check] token exists');
      const expirationTime = new Date(localStorage.getItem("expirationTime"));
      if (expirationTime > new Date()) {
        console.log('[login status check] not expired yet');
        const localId = localStorage.getItem("userId");
        dispatch(authSuccess(token, localId));
        dispatch(autoLogout((expirationTime.getTime() - new Date().getTime()) / 1000));
      } else {
        dispatch(authLogout());
      }
    }
  };
};
