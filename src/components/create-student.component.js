import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class CreateStudent extends Component {

  constructor(props) {
    super(props)

    // Setting up functions
    this.onChangeStudentName = this.onChangeStudentName.bind(this);
    this.onChangeStudentEmail = this.onChangeStudentEmail.bind(this);
    this.onChangeStudentRollno = this.onChangeStudentRollno.bind(this);
    this.onChangeStudentProfileImg = this.onChangeStudentProfileImg.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      name: '',
      email: '',
      rollno: '',
      profileimg:null
    }
  }

  onChangeStudentName(e) {
    this.setState({ name: e.target.value })
  }

  onChangeStudentEmail(e) {
    this.setState({ email: e.target.value })
  }

  onChangeStudentRollno(e) {
    this.setState({ rollno: e.target.value })
  }

  onChangeStudentProfileImg(e) {
    this.setState({ profileimg: e.target.files[0] })
  }

  onSubmit(e) {
    e.preventDefault()

    const studentObject = new FormData()
    studentObject.append('name', this.state.name)
    studentObject.append('email', this.state.email)
    studentObject.append('rollno', this.state.rollno)
    studentObject.append('profileimg', this.state.profileimg)

    axios.post('http://localhost:4000/students/create-student', studentObject, {headers: {
      // 'content-type': 'multipart/form-data'
    }})
      .then(res => console.log(res.data));

    this.setState({
      name: '',
      email: '',
      rollno: '',
      profileimg: ''
    });
  }

  render() {
    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="Name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={this.state.name} onChange={this.onChangeStudentName} />
        </Form.Group>

        <Form.Group controlId="Email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={this.state.email} onChange={this.onChangeStudentEmail} />
        </Form.Group>

        <Form.Group controlId="Name">
          <Form.Label>Roll No</Form.Label>
          <Form.Control type="text" value={this.state.rollno} onChange={this.onChangeStudentRollno} />
        </Form.Group>

        <Form.Group controlId="Name">
          <Form.Label>Profile_Img</Form.Label>
          <Form.Control type="file" accept="image/png, image/jpeg" onChange={this.onChangeStudentProfileImg} />
        </Form.Group>

        <Button variant="danger" size="lg" block="block" type="submit">
          Create Student
        </Button>
      </Form>
    </div>);
  }
}
