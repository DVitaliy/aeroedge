import { AUTH_ACTION } from "../constants";

const initialState = {
  isRequest: false,
  data: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_ACTION.LOGIN_REQUEST:
      return { ...initialState, isRequest: true };
    case AUTH_ACTION.LOGIN_SUCCESS:
      const { id, company, name, roleList } = action.data;
      return { ...initialState, data: { id, company, name, roleList } };
    case AUTH_ACTION.LOGIN_FAILURE:
    case AUTH_ACTION.LOGOUT:
      return initialState;
    default:
      return state;
  }
};
