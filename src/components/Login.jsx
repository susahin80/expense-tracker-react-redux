import React, { Component } from "react";
import { Grid, Button, Form, Message } from "semantic-ui-react";
import { connect } from "react-redux";
import { auth } from "../store/actions/authActions";
import { withRouter } from "react-router-dom";
import Joi from "joi-browser";

class Login extends Component {
  state = {
    account: {
      email: "",
      password: ""
    },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .required()
      .email()
      .label("Email"),
    password: Joi.string()
      .required()
      .min(4)
      .max(10)
      .label("Password")
  };

  handleSubmit = () => {
    const { email, password } = this.state.account;

    const errors = this.validate();
    this.setState({
      errors: errors || {}
    });

    if (errors) return;

    this.props.auth(email, password);
  };

  validate = () => {
    const { error } = Joi.validate(this.state.account, this.schema, {
      abortEarly: false
    });

    if (!error) return null;

    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({
      account,
      errors
    });
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <Grid columns={3}>
          <Grid.Row>
            <Grid.Column>
              <Form onSubmit={this.handleSubmit}>
                <Form.Input
                  label="Email"
                  name="email"
                  value={this.state.account.email}
                  onChange={this.handleChange}
                />
                {this.state.errors.email && (
                  <Message color="red" size="tiny">
                    {this.state.errors.email}
                  </Message>
                )}
                <Form.Input
                  label="Password"
                  type="password"
                  name="password"
                  value={this.state.account.password}
                  onChange={this.handleChange}
                />
                {this.state.errors.password && (
                  <Message color="red" size="tiny">
                    {this.state.errors.password}
                  </Message>
                )}
                <Button
                  type="submit"
                  loading={this.props.loading}
                  primary
                  disabled={this.validate() ? true : false}
                >
                  Login
                </Button>
              </Form>
            </Grid.Column>
            <Grid.Column />
          </Grid.Row>
        </Grid>
        {this.props.errors.login && (
          <div style={{ width: "33%", paddingTop: "5px" }}>
            <Message negative>
              <Message.Header>Login Error</Message.Header>
              <p>{this.props.errors.login}</p>
            </Message>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    errors: state.auth.errors
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { auth }
  )(Login)
);
