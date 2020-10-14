import API from "api";

const apiActionMiddleware = (store) => {
  const api = new API(store);

  return (next) => (action) => {
    if (typeof action === "function") {
      const actionWithApi = (dispatch, getState) => {
        return action(dispatch, getState, { api }); // provide api as extra data
      };

      return next(actionWithApi);
    }

    return next(action);
  };
};

export default apiActionMiddleware;
