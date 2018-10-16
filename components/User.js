import React, { Component } from 'react'
import { Menu, Label, Icon, Table, Card, Grid} from 'semantic-ui-react'
import { requestUsers } from '../lib/github-api.js'
import '../styles/User.scss'

export default class User extends Component {
  state = {
    user: this.props.user,
    repos: this.props.repos
  }


  render() {
    const user = this.state.user;
    const repos = this.state.repos;

    const repoList = repos.map((repo, i) =>
        <Table.Row key={i}>
          <Table.Cell>{repo.id}</Table.Cell>
          <Table.Cell>{repo.name}</Table.Cell>
          <Table.Cell>{repo.html_url}</Table.Cell>
        </Table.Row>
    );

    return (
      <Grid container>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={4} computer={4}>
            <Card centered className='user-card' image={user.avatar_url} header={user.name} meta={user.login}/>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={12} computer={12}>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Id</Table.HeaderCell>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Url</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {repoList}
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}
