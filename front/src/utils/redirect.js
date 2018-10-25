import history from "./history";

const redirect = (location, timeout) => {
  setTimeout(() => {
    history.push(location);
  }, timeout);
};

export default redirect;
