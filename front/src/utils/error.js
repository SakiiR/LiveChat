import { errorStart, errorEnd } from "../redux/actions";

const dispatchError = (store, errorMsg, duration = 5000) => {
  store.dispatch(errorStart(errorMsg));
  setTimeout(() => store.dispatch(errorEnd()), duration);
};

export default dispatchError;
