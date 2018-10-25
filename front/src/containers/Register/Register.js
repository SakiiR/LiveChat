import "./Register.css";
import { connect } from "react-redux";
import { register } from "../../redux/actions";
import LRegister from "../../components/LRegister/LRegister";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  handleSubmit: user => {
    dispatch(register(user));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LRegister);
