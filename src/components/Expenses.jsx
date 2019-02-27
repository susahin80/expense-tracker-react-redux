import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchExpenses,
  removeExpense,
  updateExpense
} from "../store/actions/expenseActions";
import { Loader } from "semantic-ui-react";
import history from "../history";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
//import { Paginator } from "primereact/paginator";
import { Column } from "primereact/column";

class Expenses extends Component {
  state = {
    //pageSize: 5
    // currentPage: 0,
    // totalRecords: 0,
    // first: 0
  };

  componentDidMount() {
    this.props.fetchExpenses();
  }

  navigateToEdit = id => {
    history.push(`/expenses/edit/${id}`);
  };

  actionTemplate = (rowData, column) => {
    return (
      <div>
        <Button
          type="button"
          icon="pi pi-pencil"
          className="p-button-warning"
          onClick={() => history.push(`/expenses/edit/${rowData._id}`)}
          style={{ marginRight: "5px" }}
        />

        <Button
          type="button"
          icon="pi pi-times"
          className="p-button-danger"
          onClick={() => this.props.removeExpense(rowData._id)}
        />
      </div>
    );
  };

  dateTemplate = (rowData, column) => {
    return <span> {rowData.date.split("T")[0]} </span>;
  };

  // changePage = e => {
  //   console.log(e);

  //   this.props.fetchExpenses(e.page, this.state.pageSize);

  //   this.setState({
  //     currentPage: e.page,
  //     first: e.first
  //   });
  // };

  render() {
    return (
      <div className={this.props.loading ? "ui loading form" : ""}>
        <DataTable
          value={this.props.expenses}
          paginator={true}
          rows={5}
          rowsPerPageOptions={[5, 10, 20]}
        >
          {/* <Column field="_id" header="Id" /> */}
          <Column field="name" header="Name" sortable={true} filter={true} />
          <Column
            field="amount"
            header="Amount"
            sortable={true}
            filter={true}
          />
          <Column
            field="date"
            header="Date"
            body={this.dateTemplate}
            sortable={true}
            filter={true}
          />
          <Column
            field="CategoryName"
            header="Category"
            sortable={true}
            filter={true}
          />
          <Column body={this.actionTemplate} />
        </DataTable>

        {/* <Paginator
          first={this.state.first}
          rows={this.state.pageSize}
          totalRecords={this.props.totalRecords}
          onPageChange={e => this.changePage(e)}
        /> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { expenses, loading } = state.expense;
  return {
    loading,
    expenses
  };
};

export default connect(
  mapStateToProps,
  { fetchExpenses, removeExpense, updateExpense }
)(Expenses);
