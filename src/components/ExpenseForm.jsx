import React, { Component } from "react";
import {
  Form,
  Grid,
  Button,
  Dropdown,
  Message,
  Label
} from "semantic-ui-react";
import { connect } from "react-redux";
import { updateExpense, addExpense } from "../store/actions/expenseActions";
import { expenseTrackerApi } from "../api/expense-tracker-api";
import { DateInput } from "semantic-ui-calendar-react";
import Joi from "joi-browser";

class ExpenseForm extends Component {
  state = {
    expense: {
      id: null,
      name: "",
      amount: 0,
      date: "",
      category: ""
    },
    categories: [],
    errors: {}
  };

  schema = {
    name: Joi.string()
      .required()
      .label("Name"),
    amount: Joi.number()
      .required()
      .positive()
      .label("Amount"),
    date: Joi.date()
      .required()
      .label("Date"),
    category: Joi.string()
      .required()
      .label("Category")
  };

  async componentDidMount() {
    const { data: categories } = await expenseTrackerApi.get(
      "/expenses/categories"
    );

    if (this.props.match.params.id) {
      const { data: expense } = await expenseTrackerApi.get(
        `/expenses/${this.props.match.params.id}`
      );

      expense.date = expense.date.split("T")[0];
      this.setState({
        expense,
        categories
      });
    } else {
      this.setState({
        categories
      });
    }
  }

  handleSubmit = () => {
    const errors = this.validate();

    this.setState({
      errors: errors || {}
    });

    if (errors) return;

    if (this.state.expense._id) {
      this.props.updateExpense(this.state.expense);
    } else {
      this.props.addExpense({
        ...this.state.expense,
        id: undefined
      });
    }
  };

  validate = () => {
    const { error } = Joi.validate(this.state.expense, this.schema, {
      abortEarly: false,
      allowUnknown: true
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

    const expense = { ...this.state.expense };

    if (input.name === "amount") {
      expense[input.name] = +input.value;
    } else {
      expense[input.name] = input.value;
    }
    this.setState({
      expense,
      errors
    });
  };

  handleSpecialInputChange = (e, { name, value }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty({ name, value });

    if (errorMessage) errors[name] = errorMessage;
    else delete errors[name];

    const expense = { ...this.state.expense };

    expense[name] = value;

    this.setState({
      expense,
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
    if (this.props.match.params.id && !this.state.expense._id) return "";
    return (
      <div>
        <Grid columns={3}>
          <Grid.Row>
            <Grid.Column>
              <Form onSubmit={this.handleSubmit} loading={this.props.loading}>
                <Form.Input
                  label="Name"
                  id="name"
                  name="name"
                  value={this.state.expense.name}
                  onChange={this.handleChange}
                />
                {this.state.errors.name && (
                  <Message color="red" size="tiny">
                    {this.state.errors.name}
                  </Message>
                )}
                <Form.Input
                  label="Amount"
                  id="amount"
                  name="amount"
                  value={this.state.expense.amount}
                  onChange={this.handleChange}
                />
                {this.state.errors.amount && (
                  <Message color="red" size="tiny">
                    {this.state.errors.amount}
                  </Message>
                )}
                <div className="field">
                  <label>Date</label>
                  <DateInput
                    name="date"
                    id="date"
                    placeholder="Date"
                    dateFormat="YYYY-MM-DD"
                    value={this.state.expense.date}
                    iconPosition="left"
                    onChange={this.handleSpecialInputChange}
                  />
                  {this.state.errors.date && (
                    <Message color="red" size="tiny">
                      {this.state.errors.date}
                    </Message>
                  )}
                </div>

                <div className="field">
                  <label>Category</label>
                  <Dropdown
                    id="category"
                    name="category"
                    onChange={this.handleSpecialInputChange}
                    options={this.state.categories.map(cat => {
                      return {
                        key: cat._id,
                        text: cat.name,
                        value: cat._id
                      };
                    })}
                    placeholder="Choose an option"
                    selection
                    value={this.state.expense.category}
                  />
                  {this.state.errors.category && (
                    <Message color="red" size="tiny">
                      {this.state.errors.category}
                    </Message>
                  )}
                </div>

                <br />
                <Button
                  type="submit"
                  primary
                  loading={this.props.loading}
                  disabled={this.validate() ? true : false}
                >
                  {this.state.expense._id ? "Update" : "Add"}
                </Button>
              </Form>
            </Grid.Column>
            <Grid.Column />
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.expense.loading
  };
};

export default connect(
  mapStateToProps,
  { updateExpense, addExpense }
)(ExpenseForm);
