import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import StudentTableRow from './StudentTableRow';
import { Pagination } from "react-bootstrap";


export default class StudentList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      limit: 8,
      students: {

      },
    };
  }
  fetchStudents (page) {
    axios.get(`http://localhost:4000/students/?page=${page}&limit=${this.state.limit}`)
      .then(res => {
        this.setState({
          students: res.data
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  componentDidMount() {
    this.fetchStudents(this.state.page)
  }

  changePage(page) {
    this.setState({page})
    this.fetchStudents(page)
  }
  DataTable() {
    return this.state.students.docs && this.state.students.docs.map((res, i) => {
      return <StudentTableRow obj={res} key={i} />;
    });
  }


  render() {
    const paginationItems = []
    if (this.state.students.pages > 0) {
      for (let index = 0; index < this.state.students.pages; index++) {
        paginationItems.push(
          <Pagination.Item
            key={index}
            active={this.state.page === index + 1}
            onClick={
              () => {
                this.changePage(index + 1)
              }
            }
          >
            {index+1}
          </Pagination.Item>
        )
      }
    }
    return (<div className="table-wrapper">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th><center>Name</center></th>
            <th><center>Email</center></th>
            <th><center>Roll No</center></th>
            <th><center>Profile Img</center></th>
            <th><center>Action</center></th>
          </tr>
        </thead>
        <tbody>
          {this.DataTable()}
        </tbody>
      </Table>
      <Pagination>
        {paginationItems}
      </Pagination>
    </div>);
  }
}