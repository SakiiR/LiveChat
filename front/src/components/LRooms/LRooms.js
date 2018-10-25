import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import React, { Component } from "react";
import "./LRooms.css";
import { List, ListItemIcon, ListItem, ListItemText } from "@material-ui/core";
import { Lock, LockOpen, Delete } from "@material-ui/icons";
import LCreateRoom from "../LCreateRoom/LCreateRoom";
import LPasswordDialog from "../LPasswordDialog/LPasswordDialog";

class LRooms extends Component {
  constructor() {
    super();
    this.state = { open: false, room: null };
  }

  internalHandleSubmit = room => {
    const { handleCreate } = this.props;

    handleCreate(room);
  };

  internalHandleRemove = room => event => {
    event.stopPropagation();
    const { handleRemove } = this.props;

    if (room.private === true) {
      return this.setState({
        open: true,
        room: room
      });
    }
    handleRemove(room);
  };

  internalHandlePasswordDialogClose = password => {
    const { handleRemove } = this.props;
    const { room } = this.state;

    this.setState({
      open: false,
      room: null
    });
    handleRemove(room, password);
  };

  render() {
    const { rooms } = this.props;
    const { open } = this.state;

    return (
      <div className="rooms">
        <h1>Rooms</h1>
        <LCreateRoom handleSubmit={this.internalHandleSubmit} />
        <div className="rooms-list">
          <List>
            {rooms != null && rooms.length > 0 ? (
              rooms.map(room => (
                <ListItem button key={room._id}>
                  <ListItemIcon className="icon">
                    {room.private ? <Lock /> : <LockOpen />}
                  </ListItemIcon>
                  <Link to={{ pathname: `/room/${room._id}`, state: { room } }}>
                    <ListItemText
                      inset
                      primary={room.name}
                      secondary={room.description}
                    />
                  </Link>
                  <Delete onClick={this.internalHandleRemove(room)} />
                </ListItem>
              ))
            ) : (
              <span>No Rooms</span>
            )}
          </List>
        </div>
        <LPasswordDialog
          open={open}
          handleClose={this.internalHandlePasswordDialogClose}
        />
      </div>
    );
  }
}

LRooms.propTypes = {
  rooms: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      private: PropTypes.bool.isRequired,
      description: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  handleCreate: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired
};

export default LRooms;
