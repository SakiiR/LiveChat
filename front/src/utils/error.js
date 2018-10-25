import { errorStart, errorEnd } from "../redux/actions";

const dispatchError = (store, errorMsg, duration) => {
  store.dispatch(errorStart(errorMsg));
  setTimeout(() => store.dispatch(errorEnd()), duration);
};

export default dispatchError;
