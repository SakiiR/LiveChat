import io from "socket.io-client";
import { wsRoomConnected } from "../redux/actions";

const chatWS = async (store, room, password) => {
  const { _id: roomId } = room;
  const socket = io(`ws:///ws/room-${roomId}`);

  socket.on("connect", () => {
    const state = store.getState();
    const { jwt: token } = state.generalReducer;
    socket.emit("authentication", { token, password });
    store.dispatch(wsRoomConnected(socket));
  });

  socket.on("new-message", data => {});

  return socket;
};

export default chatWS;
