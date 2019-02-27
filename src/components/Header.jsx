import React, { Component } from "react";
import { Button, Menu, Label } from "semantic-ui-react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../store/actions/authActions";

class Header extends Component {
  state = { activeItem: "home" };

  handleLogoutClick = () => {
    this.props.logout();
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { isAuthenticated } = this.props.auth;
    const { activeItem } = this.state;

    return (
      <Menu>
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={this.handleItemClick}
          as={Link}
          to="/"
        />

        {isAuthenticated && (
          <Menu.Item
            name="add"
            active={activeItem === "add"}
            onClick={this.handleItemClick}
            as={Link}
            to="/expenses"
          >
            Expenses
            {this.props.expenses.length > 0 && (
              <Label color="red">{this.props.total}</Label>
            )}
          </Menu.Item>
        )}

        {!isAuthenticated && (
          <React.Fragment>
            <Menu.Menu position="right">
              <Menu.Item
                name="register"
                active={activeItem === "register"}
                onClick={this.handleItemClick}
                as={Link}
                to="/register"
              >
                Register
              </Menu.Item>

              <Menu.Item
                name="login"
                active={activeItem === "login"}
                onClick={this.handleItemClick}
                as={Link}
                to="/login"
              >
                Log-in
              </Menu.Item>
            </Menu.Menu>
          </React.Fragment>
        )}
        {isAuthenticated && (
          <React.Fragment>
            <Menu.Item
              position="left"
              name="new"
              active={activeItem === "new"}
              onClick={this.handleItemClick}
              as={Link}
              to="/expenses/new"
            >
              Add Expense
            </Menu.Item>
            <Menu.Item
              position="right"
              name="logout"
              active={activeItem === "logout"}
              onClick={this.handleItemClick}
            >
              <Button onClick={this.handleLogoutClick}>Logout</Button>
            </Menu.Item>
          </React.Fragment>
        )}
      </Menu>
    );
  }
}

const mapStateToProps = state => {
  let total = 0;

  if (state.expense.expenses.length > 0) {
    total = state.expense.expenses.reduce((acc, cur) => {
      return acc + cur.amount;
    }, 0);
  }

  return {
    expenses: state.expense.expenses,
    auth: state.auth,
    total
  };
};

export default connect(
  mapStateToProps,
  { logout }
)(withRouter(Header));
