import { connect } from "react-redux";
import LChat from "../../components/LChat/LChat";
import { roomListMessages, roomCreateMessage } from "../../redux/actions";
import "./Chat.css";

const mapStateToProps = state => ({
  messages: state.messageReducer
});

const mapDispatchToProps = dispatch => ({
  handleSubmitMessage: (roomId, text, password) => {
    dispatch(roomCreateMessage({ _id: roomId }, password, { text }));
  },
  listMessages: (room, password = null) => {
    dispatch(roomListMessages(room, password));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LChat);
