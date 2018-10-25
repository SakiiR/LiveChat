import { connect } from "react-redux";
import LMenu from "../../components/LMenu/LMenu";
import { logout } from "../../redux/actions";
import "./Menu.css";

const mapStateToProps = state => ({
  loggedIn: state.generalReducer.loggedIn,
  loading: state.generalReducer.requestProcessing,
  error: state.generalReducer.error,
  jwt: state.generalReducer.jwt
});

const mapDispatchToProps = dispatch => ({
  handleLogout: user => dispatch(logout(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LMenu);
