import React, { Component } from 'react'
import Link from 'next/link'
import { Menu, Button, Icon, Grid, Card } from 'semantic-ui-react'
import { requestUsers } from '../lib/github-api.js'
import '../styles/UserList.scss'

export default class UserList extends Component {
  state = {
    users: this.props.users,
    since: this.props.since,
    perPage: 32,
    pageNumber: 0,
    loading: false
  }

  getUsers = async () => {
    const res = await requestUsers(32, this.state.since)
    const since = /since=(\d+)?/m.exec(res.headers.get('link'))[1]
    const users = await res.json()

    this.setState({ users: this.state.users.concat(users) })
    this.setState({ since })
    this.state.loading = false;
  }

  nextPage = async () => {
    //Check if page is already on state
    if( this.state.users.length/this.state.perPage <= this.state.pageNumber + 1 ) {
      this.setState({ loading: true })
      await this.getUsers();
      this.setState({ loading: false })
    }

    this.setState({ pageNumber: this.state.pageNumber + 1 })
  }

  prevPage = () => {
    this.setState({ pageNumber: this.state.pageNumber - 1 })
  }

  paginatedUsers() {
    const start = this.state.pageNumber * this.state.perPage,
          end = start + this.state.perPage;
    return this.state.users.slice(start, end);
  }

  render() {
    const users = this.paginatedUsers();

    const userList = users.map((user, i) =>
        <Grid.Column key={i} mobile={16} tablet={8} computer={4}>
          <Link as={`/user/${user.login}`} href={`/user?login=${user.login}`}>
            <Card centered className='user-card' image={user.avatar_url} header={user.login}/>
          </Link>
        </Grid.Column>
    );

    return (
      <Grid container>
        <Grid.Row>
          <Grid.Column width={8}>
            <Button icon labelPosition='left' onClick={this.prevPage} disabled={this.state.pageNumber == 0}>
              <Icon name='left arrow' />
              Prev
            </Button>
          </Grid.Column>
          <Grid.Column width={8} textAlign='right'>
            <Button icon labelPosition='right' onClick={this.nextPage} disabled={this.state.loading}>
              Next
              <Icon name='right arrow' />
            </Button>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          {userList}
        </Grid.Row>
      </Grid>
    )
  }
}
