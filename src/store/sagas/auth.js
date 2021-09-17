import { put } from "redux-saga/effects";
import { delay } from "@redux-saga/core/effects";
import axios from "axios";
import * as actions from "../actions";

export function* logoutSaga(action) {
  yield localStorage.removeItem("token");
  yield localStorage.removeItem("userId");
  yield localStorage.removeItem("expirationTime");
  yield put(actions.authLogoutSucceed());
}

export function* autoLogoutSaga(action) {
  yield delay(action.expiresIn * 1000);
  yield put(actions.authLogout());
}

export function* authSaga(action) {
  yield put(actions.authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };
  let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAIU9aKwSIDPcTM8yMgi-mGQf-N3FFK0wg";
  if (!action.isSignUp) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAIU9aKwSIDPcTM8yMgi-mGQf-N3FFK0wg";
  }

  try {
    // yield + async function - execution will wait until promise is resolved or rejected
    const response = yield axios.post(url, authData);
    const expirationTime = yield new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );
    console.log("expires @ " + expirationTime);
    yield localStorage.setItem("token", response.data.idToken);
    yield localStorage.setItem("userId", response.data.localId);
    yield localStorage.setItem("expirationTime", expirationTime);
    yield put(
      actions.authSuccess(response.data.idToken, response.data.localId)
    );
    yield put(actions.autoLogout(response.data.expiresIn));
  } catch (error) {
    console.log(error);
    yield put(actions.authFailed(error.response.data.error));
  }
}

export function* loginStatusCheckSaga(action) {  
  const token = yield localStorage.getItem("token");
    if (token) {
      console.log('[login status check] token exists');
      const expirationTime = yield new Date(localStorage.getItem("expirationTime"));
      if (expirationTime > new Date()) {
        console.log('[login status check] not expired yet');
        const localId = yield localStorage.getItem("userId");
        yield put(actions.authSuccess(token, localId));
        yield put(actions.autoLogout((expirationTime.getTime() - new Date().getTime()) / 1000));
      } else {
        yield put(actions.authLogout());
      }
    }
}