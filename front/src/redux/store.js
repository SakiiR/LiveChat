import { createStore, applyMiddleware } from "redux";
import { logger, service } from "./middlewares";
import liveChat from "./reducers";
import { initialState } from "./constants";

const store = createStore(
  liveChat,
  initialState,
  applyMiddleware(logger, service)
);

export default store;
