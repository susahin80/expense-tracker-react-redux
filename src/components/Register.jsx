import React, { Component } from "react";
import { Grid, Button, Form, Loader, Message } from "semantic-ui-react";
import { connect } from "react-redux";
import { register } from "../store/actions/authActions";
import { withRouter } from "react-router-dom";
import Joi from "joi-browser";

class Register extends Component {
  state = {
    account: {
      email: "",
      password: "",
      fullname: ""
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
      .label("Password"),
    fullname: Joi.string()
      .required()
      .min(4)
      .max(30)
      .label("Fullname")
  };

  handleSubmit = () => {
    const errors = this.validate();
    this.setState({
      errors: errors || {}
    });

    if (errors) return;

    this.props.register(this.state.account);
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
        <h1>Register</h1>
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
                  label="Fullname"
                  name="fullname"
                  value={this.state.account.fullname}
                  onChange={this.handleChange}
                />
                {this.state.errors.fullname && (
                  <Message color="red" size="tiny">
                    {this.state.errors.fullname}
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
                  primary
                  loading={this.props.loading}
                  disabled={this.validate() ? true : false}
                >
                  Register
                </Button>
              </Form>
            </Grid.Column>
            <Grid.Column />
          </Grid.Row>
        </Grid>
        {this.props.errors.register && (
          <div style={{ width: "33%", paddingTop: "5px" }}>
            <Message negative>
              <Message.Header>Register Error</Message.Header>
              <p>{this.props.errors.register}</p>
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
    { register }
  )(Register)
);
