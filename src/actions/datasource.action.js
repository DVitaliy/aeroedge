const listing = ({ datasource, parameters }) => (dispatch, getState, api) => {
  return api
    .setToken(getState().token.token)
    .getListing("/" + datasource + parameters)
    .then(json => Promise.resolve(json))
    .catch(error => Promise.reject(error));
};

export const dsAction = { listing };
