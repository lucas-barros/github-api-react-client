import fetch from 'isomorphic-unfetch'

let apiAddress = (process.env.PORT) ? `http://127.0.0.1:${process.env.PORT}/api/users` : '/api/users'

const requestUsers = (perPage, since) => fetch(`${apiAddress}?per_page=${perPage}&since=${since}`)
const requestUser = (login) => fetch(`${apiAddress}/${login}`)
const requestRepos = (login) => fetch(`${apiAddress}/${login}/repos`)

export { requestUsers, requestUser, requestRepos  }
