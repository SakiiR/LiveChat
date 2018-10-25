export const service = store => next => action => {
  if (!action.__http) {
    if (action.onEnd != null) action.onEnd(store);
    return next(action);
  }
  // The request is now pending
  store.dispatch({
    ...action,
    __http: false,
    type: action.type.replace("REQUEST", "PENDING")
  });

  // Retrieve the correct service if we need an http request to be send
  const associatedService = require(`../services/${
    action.__service
  }.service.js`).default;

  (async () => {
    try {
      const result = await associatedService[action.__method](...action.params);
      store.dispatch({
        ...action,
        __http: false,
        type: action.type.replace("REQUEST", "SUCCESS"),
        result
      });
      if (action.onSuccess != null) await action.onSuccess(store, result);
    } catch (error) {
      store.dispatch({
        ...action,
        __http: false,
        type: action.type.replace("REQUEST", "FAILURE"),
        error
      });
      if (action.onError != null) await action.onError(store, error);
    }
  })();
  return next(action);
};

export const logger = store => next => action => {
  console.group(action.type);
  console.info("Dispatching", action);
  const result = next(action);
  console.log("Next state", store.getState());
  console.groupEnd();
  return result;
};
