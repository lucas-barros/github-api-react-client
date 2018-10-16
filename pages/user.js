import React from 'react'
import Layout from '../components/Layout.js'
import User from '../components/User.js'
import { requestUser, requestRepos } from '../lib/github-api.js'

class UserPage extends React.Component {
  static async getInitialProps(context) {
    const { login } = context.query
    const userRes = await requestUser(login)
    const user = await userRes.json()
    const reposRes = await requestRepos(login)
    const repos = await reposRes.json()

    return {user, repos}
  }

  render() {
    return (
      <Layout>
        <h1>User</h1>
        <User user={this.props.user} repos={this.props.repos}/>
      </Layout>
    )
  }
}

export default UserPage
