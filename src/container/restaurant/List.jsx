import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Header, Table, Rating, Grid, Button } from 'semantic-ui-react';
export default class List extends Component {
  state = {
    data: [],
    loading: false
  };

  getData = () => {
    console.log(this.state.data);
    axios.get('http://localhost:8000/api/restaurants').then(res => {
      console.log(res.data);
      this.setState({
        data: res.data,
        loading: true
      });
      console.log(this.state.data, '>>>>>>');
    });
  };

  dataDelete = id => {
    axios.delete(`http://localhost:8000/api/restaurants/${id}`).then(res => {
      this.getData();
    });
  };

  componentDidMount() {
    this.getData();
  }
  render() {
    return (
      <div>
        <h1>List Toko</h1>
        <Table celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell singleLine>Image</Table.HeaderCell>
              <Table.HeaderCell>Nama Toko</Table.HeaderCell>
              <Table.HeaderCell>Alamat</Table.HeaderCell>
              <Table.HeaderCell>Consensus</Table.HeaderCell>
              <Table.HeaderCell>Comments</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          {this.state.data.map(datum => {
            return (
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    <Header as="h2" textAlign="center">
                      {datum.image}
                    </Header>
                  </Table.Cell>
                  <Table.Cell singleLine>{datum.name}</Table.Cell>
                  <Table.Cell>{datum.address}</Table.Cell>

                  <Table.Cell>
                    <Button as={Link} to={`/restaurant/${datum._id}/update`}>
                      Edit
                    </Button>
                    <Button
                      onClick={() => {
                        this.dataDelete(datum._id);
                      }}>
                      Hapus
                    </Button>
                  </Table.Cell>
                  <Table.Cell>
                    <Button as={Link} to={`/restaurant/${datum._id}/foods`}>
                      Lihat
                    </Button>

                    <Button as={Link} to={`/restaurant/${datum._id}/foods/add`}>
                      Tambahkan
                    </Button>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            );
          })}
        </Table>
      </div>
    );
  }
}
