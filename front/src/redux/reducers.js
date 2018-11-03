import { combineReducers } from "redux";
import { initialState } from "./constants";

const generalReducer = (state = {}, action) => {
  switch (action.type.split("_").slice(-1)[0]) {
    case "PENDING":
      state = { ...state, requestProcessing: true };
      break;
    case "SUCCESS":
      state = { ...state, requestProcessing: false };
      break;
    case "FAILURE":
      state = { ...state, requestProcessing: false };
      break;
    default:
      state = { ...state };
  }

  switch (action.type) {
    case "WS_CONNECTED_ACTION": {
      if (state.socket != null) state.socket.disconnect();
      return { ...state, socket: action.socket };
    }
    case "WS_ROOM_CONNECTED_ACTION": {
      if (state.roomSocket != null) state.roomSocket.disconnect();
      return { ...state, roomSocket: action.socket };
    }
    case "LOGIN_SUCCESS":
      return { ...state, loggedIn: true, jwt: action.result.data.user.token };
    case "LOGOUT_REQUEST":
      return {
        ...state,
        loggedIn: false,
        jwt: null
      };
    case "START_ERROR_ACTION":
      return { ...state, error: action.message };
    case "END_ERROR_ACTION":
      return { ...state, error: null };
    case "LOGOUT_ACTION":
      return { ...initialState.generalReducer };
    default:
      return state;
  }
};

const roomReducer = (state = {}, action) => {
  switch (action.type) {
    case "NEW_ROOM_ACTION":
      return [...state, action.room];
    case "ROOM_LIST_SUCCESS":
      return [...state, ...action.result.data.data.rooms];
    case "REMOVED_ROOM_ACTION": {
      const { _id: roomId } = action.room;
      state = state.filter(item => item._id !== roomId);
      return [...state];
    }
    case "LOGOUT_REQUEST":
      return [];
    default:
      return state;
  }
};

const messageReducer = (state = {}, action) => {
  switch (action.type) {
    case "MESSAGE_LIST_SUCCESS":
      return [...action.result.data.data.messages];
    case "NEW_MESSAGE_ACTION":
      return [...state, action.message.message_body];
    case "REMOVED_MESSAGE_ACTION": {
      console.log("REMOVEDEFOIZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ", action);
      return [...state.filter(item => item._id !== action.message._id)];
    }
    case "LOGOUT_REQUEST":
      return [];
    default:
      return state;
  }
};

const liveChat = combineReducers({
  generalReducer,
  roomReducer,
  messageReducer
});

export default liveChat;
