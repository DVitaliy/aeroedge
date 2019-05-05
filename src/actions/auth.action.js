import { AUTH_ACTION, AUTH_URLS } from "../constants";

const login = ({ username, password }) => (dispatch, getState, api) => {
  dispatch({ type: AUTH_ACTION.LOGIN_REQUEST });

  return api
    .setToken()
    .login({ url: AUTH_URLS.USERS_AUTHENTICATE, username, password })
    .then(json => {
      const payload = JSON.parse(
        decodeURIComponent(escape(window.atob(json.token.split(".")[1])))
      );

      dispatch({
        type: AUTH_ACTION.LOGIN_SUCCESS,
        data: { ...json, ...payload },
      });
      return Promise.resolve(payload);
    })
    .catch(error => {
      dispatch({ type: AUTH_ACTION.LOGIN_FAILURE });
      return Promise.reject(error);
    });
};

const logout = () => ({
  type: AUTH_ACTION.LOGOUT,
});

export const authAction = { login, logout };
