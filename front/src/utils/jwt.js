import decode from "jwt-decode";

const getUsernameFromJwt = jwt => {
  if (jwt !== null) {
    let { username } = decode(jwt);
    return username;
  }
  return "";
};

export default getUsernameFromJwt;
