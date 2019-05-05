import { AUTH_ACTION } from "../constants";

const initialState = {
  iat: null,
  exp: null,
  delta: null,
  token: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_ACTION.LOGIN_SUCCESS:
      const { exp, iat, token } = action.data;
      return {
        exp,
        iat,
        token,
        delta: Math.floor(new Date().getTime() / 1000) - iat,
      };
    case AUTH_ACTION.LOGIN_REQUEST:
    case AUTH_ACTION.LOGIN_FAILURE:
    case AUTH_ACTION.LOGOUT:
      return initialState;
    default:
      return state;
  }
};
