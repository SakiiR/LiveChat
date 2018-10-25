import { connect } from "react-redux";
import LRooms from "../../components/LRooms/LRooms";
import "./Rooms.css";
import { roomCreation, roomRemove } from "../../redux/actions";

const mapStateToProps = state => ({
  rooms: state.roomReducer
});

const mapDispatchToProps = dispatch => ({
  handleCreate: room => {
    dispatch(roomCreation(room));
  },
  handleRemove: (room, password = null) => {
    dispatch(roomRemove(room, password));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LRooms);
