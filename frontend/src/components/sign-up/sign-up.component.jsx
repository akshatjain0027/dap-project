import React from "react";
import { connect } from "react-redux";
import { signup } from "../../redux/auth/auth.actions";
import "./sign-up.styles.css";
import FormInput from "../form-input/form-input.component";

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      confirm_password: ""
    };
  }

  handleSubmit = async event => {
    event.preventDefault();
    const { name, email, password, confirm_password } = this.state;

    if (password !== confirm_password) {
      alert("Password doesn't match");
      return;
    }

    const data = {
      name: name,
      email: email,
      password: password,
      password2: confirm_password
    };
    this.props.signup(data);
    this.setState({
      name: "",
      email: "",
      password: "",
      confirm_password: ""
    });
  };

  handleChange = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="sign-up">
        <h1>I don't have an account</h1>
        <span>Sign up with your email</span>

        <form action="" onSubmit={this.handleSubmit}>
          <FormInput
            label="User Name"
            type="text"
            name="name"
            value={this.state.name}
            required
            handleChange={this.handleChange}
          />
          <FormInput
            label="Email"
            type="email"
            name="email"
            value={this.state.email}
            required
            handleChange={this.handleChange}
          />
          <FormInput
            label="Password"
            type="password"
            name="password"
            value={this.state.password}
            required
            handleChange={this.handleChange}
          />
          <FormInput
            label="Confirm Password"
            type="password"
            name="confirm_password"
            value={this.state.confirm_password}
            required
            handleChange={this.handleChange}
          />

          <button className="signupbutton btn btn-primary" type="submit">
            SignUp
          </button>
        </form>
      </div>
    );
  }
}

export default connect(null, { signup: signup })(SignUp);
