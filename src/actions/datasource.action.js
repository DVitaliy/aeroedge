const listing = ({ datasource, parameters }) => (dispatch, getState, api) => {
  //dispatch({ type: AUTH_ACTION.LOGIN_REQUEST });
  return api
    .setToken(getState().token.token)
    .getListing("/" + datasource + parameters)
    .then(json => {
      /*const payload = JSON.parse(
        decodeURIComponent(escape(window.atob(json.token.split(".")[1])))
      );*/

      /*dispatch({
        type: AUTH_ACTION.LOGIN_SUCCESS,
        data: { ...json, ...payload },
      });*/
      return Promise.resolve(json);
    })
    .catch(error => {
      //dispatch({ type: AUTH_ACTION.LOGIN_FAILURE });
      return Promise.reject(error);
    });
};

export const dsAction = { listing };
