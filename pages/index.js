import React from 'react'
import Layout from '../components/Layout.js'
import UserList from '../components/UserList.js'
import {requestUsers} from '../lib/github-api.js'

export default class extends React.Component {
  static async getInitialProps({ req }) {
    const res = await requestUsers(32, 0)
    const since = /since=(\d+)?/m.exec(res.headers.get('link'))[1]
    const users = await res.json()

    return { users, since }
  }

  render() {
    return (
      <Layout>
        <h1>Users</h1>
        <UserList users={this.props.users} since={this.props.since}/>
      </Layout>
    )
  }
}
