import React, { Component } from "react";
import classes from "./Login.module.scss";
import Data from "../../Assets/Data/data";
var jwt = require("jsonwebtoken");
class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
    };
  }

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  loginFunc = () => {
    const { username, password } = this.state;
    if (username && password) {
      let token = jwt.sign({ username, password }, process.env.REACT_APP_JWT_SECRET_KEY);
      sessionStorage.setItem("jwtAuth", token);
      this.props.history.push("/home");
      console.log(token);
    }
  };

  render() {
    const { username, password } = this.state;
    return (
      <div className={classes.container}>
        <h1 className={classes.header}>{Data.login}</h1>
        <form>
          <div className={classes.label}>{Data.username}</div>
          <input
            type="text"
            placeholder={"Username"}
            value={username}
            onChange={this.handleInput}
            name={"username"}
            className={classes.input}
          />
          <div className={classes.label}>{Data.password}</div>
          <input
            type="password"
            placeholder={"password"}
            value={password}
            onChange={this.handleInput}
            name={"password"}
            className={classes.input}
          />
          <button
            type="button"
            className={classes.button}
            onClick={this.loginFunc}
          >
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
