import io from "socket.io-client";
import { wsNewRoom, wsConnected, wsRemovedRoom } from "../redux/actions";

const roomWS = async store => {
  const socket = io("ws://localhost:4242/rooms");

  socket.on("connect", () => {
    console.log("[+] Connected to socket!");
    const state = store.getState();
    const { jwt: token } = state.generalReducer;
    socket.emit("authentication", { token });
    store.dispatch(wsConnected(socket));
  });

  socket.on("new-room", data => {
    store.dispatch(wsNewRoom(data));
  });

  socket.on("removed-room", data => {
    store.dispatch(wsRemovedRoom(data));
  });

  return socket;
};

export default roomWS;
