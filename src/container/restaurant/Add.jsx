import React, { Component } from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import { Button, Checkbox, Form } from 'semantic-ui-react';
export default class Add extends Component {
  state = {
    name: '',
    image: '',
    address: '',
    link: false
  };

  dataPost = () => {
    axios
      .post('http://localhost:8000/api/restaurants', {
        name: this.state.name,
        image: this.state.image,
        address: this.state.address,
        link: true
      })
      .then(res => {
        this.setState({
          link: true
        });
      });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div>
        <div>
          <h1>Tambah Data</h1>
          <Form>
            <Form.Field>
              <label>Nama Toko</label>
              <input
                placeholder="Nama Toko"
                onChange={this.handleChange}
                name="name"
                value={this.state.name}
              />
            </Form.Field>
            <Form.Field>
              <label>Image</label>
              <input
                placeholder="Image"
                onChange={this.handleChange}
                name="image"
                value={this.state.image}
              />
            </Form.Field>
            <Form.Field>
              <label>Alamat</label>
              <input
                placeholder="address"
                onChange={this.handleChange}
                name="address"
                value={this.state.address}
              />
            </Form.Field>
            <Button
              type="submit"
              onClick={() => {
                this.dataPost();
              }}>
              Submit
            </Button>
            <Button as={Link} to="/restaurant">
              Cancel
            </Button>
          </Form>
        </div>

        {this.state.link ? <Redirect to="/restaurant" /> : ''}
      </div>
    );
  }
}
