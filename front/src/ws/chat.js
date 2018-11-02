import io from "socket.io-client";
import { wsRoomConnected, wsNewMessage } from "../redux/actions";

const chatWS = async (store, room, password) => {
  const { _id: roomId } = room;
  const socket = io(`ws:///ws/rooms-${roomId}`, { path: "/ws/socket.io/" });
  socket.on("connect", () => {
    const state = store.getState();
    const { jwt: token } = state.generalReducer;
    socket.emit("authentication", { token, password });
    store.dispatch(wsRoomConnected(socket));
  });

  socket.on("new-message", data => {
    store.dispatch(wsNewMessage(data));
  });

  return socket;
};

export default chatWS;
