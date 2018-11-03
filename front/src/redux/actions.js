import redirect from "../utils/redirect";
import dispatchError from "../utils/error";
import actions from "./constants";
import roomWS from "../ws/rooms";
import chatWS from "../ws/chat";

/**
 * Room creation
 *
 * @param {Object{roomPassword, roomName, roomPrivate}} room  the room to create
 */
export const roomCreation = room => ({
  type: actions.ROOM_CREATION_ACTION,
  __http: true,
  __method: "create",
  __service: "room",
  params: [room],
  onSuccess: async (store, result) => {
    const state = store.getState();
    const { socket } = state.generalReducer;

    if (socket !== null) socket.emit("new-room", result.data);
  },
  onError: async (store, error) => {
    dispatchError(store, error.response.data.message, 5000);
  }
});

/**
 * Remove a room
 *
 * @param {String} roomId Room id to remove
 */
export const roomRemove = (room, password) => ({
  type: actions.ROOM_REMOVE_ACTION,
  __http: true,
  __method: "remove",
  __service: "room",
  params: [room, password],
  onSuccess: async (store, result) => {
    dispatchError(store, result.data.message);

    const state = store.getState();
    const { socket } = state.generalReducer;

    socket.emit("removed-room", result.data.room);
  },
  onError: async (store, error) => {
    dispatchError(store, error.response.data.message);
  }
});

/**
 * Remove a message
 *
 * @param {String} messageId Messages's id
 */
export const messageRemove = message => ({
  type: actions.MESSAGE_REMOVE_ACTION,
  __http: true,
  __method: "remove",
  __service: "messages",
  params: [message],
  onSuccess: async (store, result) => {
    dispatchError(store, result.data.message);

    const state = store.getState();
    const { roomSocket: socket } = state.generalReducer;

    socket.emit("removed-message", result.data.message_body);
  },
  onError: async (store, error) => {
    dispatchError(store, error.response.data.message);
  }
});

/**
 * List room messages
 *
 * @param {Object{_id, private}} room The room to list the messages from
 * @param {String} password The room password if needed
 */
export const roomListMessages = (room, password = null) => ({
  type: actions.MESSAGE_LIST_ACTION,
  __http: true,
  __method: "list",
  __service: "messages",
  params: [room, password],
  onSuccess: async (store, result) => {
    dispatchError(store, result.data.data.message);

    chatWS(store, room, password);
  },
  onError: async (store, error) => {
    dispatchError(store, error.response.data.message);
    redirect("/rooms", 500);
  }
});

/**
 * List the rooms
 */
export const roomList = () => ({
  type: actions.ROOM_LIST_ACTION,
  __http: true,
  __method: "list",
  __service: "room",
  params: [],
  onSuccess: async (store, result) => {
    dispatchError(store, result.data.message);
  },
  onError: async (store, error) => {}
});

/**
 * Authenticate a user.
 *
 * @param {Object{username, password}} user The user to login
 */
export const login = user => ({
  type: actions.LOGIN_ACTION,
  __http: true,
  __method: "login",
  __service: "auth",
  onSuccess: async (store, result) => {
    dispatchError(store, result.message, 5000);
    store.dispatch(roomList());
    redirect("/rooms", 1000);

    roomWS(store);
  },
  onError: async (store, error) => {
    dispatchError(store, error.response.data.message, 5000);
  },
  params: [user]
});

/**
 * Register a new user.
 *
 * @param {Object{username, password}} user The user to register
 */
export const register = user => ({
  type: actions.REGISTER_ACTION,
  __http: true,
  __method: "register",
  __service: "auth",
  params: [user],
  onSuccess: async (store, result) => {
    redirect("/login", 1000);
    dispatchError(store, result.message, 5000);
  },
  onError: async (store, error) => {
    dispatchError(store, error.response.data.message, 5000);
  }
});

/**
 * Logout the current user
 */
export const logout = () => ({
  type: actions.LOGOUT_ACTION,
  __http: false,
  onEnd: async store => {
    redirect("/", 1000);
    const {
      generalReducer: { socket, roomSocket }
    } = store.getState();
    if (socket != null) socket.disconnect();
    if (roomSocket != null) roomSocket.disconnect();
  }
});

/**
 * Shows an error notification
 *
 * @param {String} message The error message to display
 */
export const errorStart = message => ({
  type: actions.START_ERROR_ACTION,
  message,
  __http: false
});

/**
 * Hides an error notification
 *
 * @param {String} message The error message to display
 */
export const errorEnd = () => ({
  type: actions.END_ERROR_ACTION,
  __http: false
});

/**
 * This action is dispatched when we are connected to the main websocket
 *
 * @param {*} socket the connected socket
 */
export const wsConnected = socket => ({
  type: actions.WS_CONNECTED_ACTION,
  __http: false,
  socket
});

/**
 * This action is dispatched when we are connected to the room websocket
 *
 * @param {*} socket the connected socket
 */
export const wsRoomConnected = socket => ({
  type: actions.WS_ROOM_CONNECTED_ACTION,
  __http: false,
  socket
});

/**
 * This event is triggered when a new room arrives.
 *
 * @param {Object{room}} room The new arrived room
 */
export const wsNewRoom = room => ({
  type: actions.NEW_ROOM_ACTION,
  __http: false,
  room,
  onEnd: store => {
    dispatchError(store, "New room created!", 5000);
  }
});

/**
 * This event is triggered when a new message arrives.
 *
 * @param {Object{message}} message The new arrived message
 */
export const wsNewMessage = message => ({
  type: actions.NEW_MESSAGE_ACTION,
  __http: false,
  message,
  onEnd: store => {
    dispatchError(store, "New message arrived!", 5000);
  }
});

/**
 * This event is triggered when a room is removed.
 *
 * @param {Object{room}} room The removed room
 */
export const wsRemovedRoom = room => ({
  type: actions.REMOVED_ROOM_ACTION,
  __http: false,
  room
});

/**
 * This event is triggered when a message is removed.
 *
 * @param {Object{message}} message The removed message
 */
export const wsRemovedMessage = message => ({
  type: actions.REMOVED_MESSAGE_ACTION,
  __http: false,
  message
});

/**
 * Create a new message
 *
 * @param {*} room
 * @param {*} password
 * @param {*} message
 */
export const roomCreateMessage = (room, password = null, message) => ({
  type: actions.MESSAGE_CREATE_ACTION,
  __http: true,
  __method: "create",
  __service: "messages",
  params: [room, password, message],
  onSuccess: async (store, result) => {
    const state = store.getState();
    const { roomSocket: socket } = state.generalReducer;

    if (socket != null) socket.emit("new-message", result.data);
  },
  onError: async (store, error) => {
    dispatchError(store, error.response.data.message, 5000);
  }
});
