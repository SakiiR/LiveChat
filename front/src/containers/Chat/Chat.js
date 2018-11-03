import { connect } from "react-redux";
import LChat from "../../components/LChat/LChat";
import {
  roomListMessages,
  roomCreateMessage,
  messageRemove
} from "../../redux/actions";
import "./Chat.css";

const mapStateToProps = state => ({
  messages: state.messageReducer.reverse()
});

const mapDispatchToProps = dispatch => ({
  handleSubmitMessage: (roomId, text, password) => {
    dispatch(roomCreateMessage({ _id: roomId }, password, { text }));
  },
  listMessages: (room, password = null) => {
    dispatch(roomListMessages(room, password));
  },
  handleRemove: message => {
    dispatch(messageRemove(message));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LChat);
