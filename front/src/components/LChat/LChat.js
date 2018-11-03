import PropTypes from "prop-types";
import React, { Component } from "react";
import "./LChat.css";
import TextField from "@material-ui/core/TextField";
import { Send, Message, Delete } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Moment from "react-moment";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import store from "../../redux/store";
import LPasswordDialog from "../LPasswordDialog/LPasswordDialog";
import getUsernameFromJwt from "../../utils/jwt";

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

  internalHandleRemove = message => event => {
    event.stopPropagation();
    const { handleRemove } = this.props;

    handleRemove(message);
  };

  render() {
    const { messages } = this.props;
    const { open, text } = this.state;
    const {
      generalReducer: { jwt }
    } = store.getState();
    const username = getUsernameFromJwt(jwt);
    const {
      match: {
        params: { id: roomId }
      }
    } = this.props;
    return (
      <div>
        <div className="chat-content">
          <List dense>
            {messages.map(
              message =>
                message.room._id === roomId && (
                  <ListItem key={message._id}>
                    <ListItemAvatar>
                      <Avatar>
                        <Message />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={message.text}
                      secondary={
                        <span>
                          <b>{message.from.username}</b>
                          <span> - </span>
                          <Moment fromNow date={message.created_at} />
                        </span>
                      }
                    />
                    {message.from.username === username && (
                      <ListItemSecondaryAction>
                        <IconButton aria-label="Delete">
                          <Delete
                            onClick={this.internalHandleRemove(message)}
                          />
                        </IconButton>
                      </ListItemSecondaryAction>
                    )}
                  </ListItem>
                )
            )}
          </List>
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
      text: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
      room: PropTypes.shape({
        _id: PropTypes.string.isRequired
      })
    }).isRequired
  ).isRequired,
  handleSubmitMessage: PropTypes.func.isRequired,
  listMessages: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired
};
