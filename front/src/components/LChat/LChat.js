import PropTypes from "prop-types";
import React, { Component } from "react";
import "./LChat.css";
import TextField from "@material-ui/core/TextField";
import { Send } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import LPasswordDialog from "../LPasswordDialog/LPasswordDialog";

export default class LChat extends Component {
  constructor() {
    super();
    this.state = { text: "", password: "", open: false };
  }

  componentDidMount() {
    // if it crashes, it is becauseyou accessed the component without the <Link state>
    const {
      location: {
        state: { room: r }
      },
      listMessages
    } = this.props;
    if (r.private === false) listMessages(r, null);
    this.setState({ open: r.private });
  }

  internalHandlePasswordDialogClose = password => {
    const { listMessages } = this.props;
    const {
      location: {
        state: { room: r }
      }
    } = this.props;
    this.setState({ password, open: false });
    listMessages(r, password);
  };

  internalHandleTextChange = event => {
    const { value: text } = event.target;

    this.setState({ text });
  };

  internalHandleSubmit = event => {
    event.preventDefault();
    const { text, password } = this.state;
    const {
      handleSubmitMessage,
      match: {
        params: { id: roomId }
      }
    } = this.props;

    handleSubmitMessage(roomId, text, password);
    this.setState({ text: "" });
  };

  render() {
    const { messages } = this.props;
    const { open, text } = this.state;
    const {
      match: {
        params: { id: roomId }
      }
    } = this.props;
    return (
      <div>
        <div className="chat-content">
          {messages.map(
            message =>
              message.room._id === roomId && (
                <div className="message">
                  <span key={message._id}>
                    {message.text} from {message.from.username}
                  </span>
                </div>
              )
          )}
        </div>
        <div className="chat-bar">
          <form onSubmit={this.internalHandleSubmit}>
            <TextField
              label="Message"
              name="message"
              id="message-text"
              onChange={this.internalHandleTextChange}
              value={text}
            />
            <Button type="submit">
              <Send />
            </Button>
          </form>
        </div>
        <LPasswordDialog
          open={open}
          handleClose={this.internalHandlePasswordDialogClose}
        />
      </div>
    );
  }
}

LChat.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      from: PropTypes.shape({
        username: PropTypes.string.isRequired
      }),
      text: PropTypes.bool.isRequired,
      _id: PropTypes.string.isRequired,
      room: PropTypes.shape({
        _id: PropTypes.string.isRequired
      })
    }).isRequired
  ).isRequired,
  handleSubmitMessage: PropTypes.func.isRequired,
  listMessages: PropTypes.func.isRequired
};
