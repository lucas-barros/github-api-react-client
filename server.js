const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const proxy = require('http-proxy-middleware');

require('dotenv').config()

// Only allow users endpoint
const filter = function (pathname, req) {
  return !!pathname.match('^/api/users');
};

const rewriteFn = function (path, req) {
  //Rewrite localhost/api to https://api.github.com/
  let rewritePath = path.replace(/(^\/api)/, '');

  return rewritePath;
};

const onProxyReq =  function (proxyReq, req, res) {
  proxyReq.setHeader('client_id', process.env.GITHUB_API_CLIENT_ID);
  proxyReq.setHeader('client_secret', process.env.GITHUB_API_CLIENT_SECRET);
};

const apiProxy = proxy(filter, {
  target: 'https://api.github.com/',
  pathRewrite: rewriteFn,
  changeOrigin: true,
  onProxyReq
});

app.prepare()
.then(() => {
  const server = express()

  //Proxy all request to github's api
  server.use(apiProxy);

  server.get('/user/:login', (req, res) => {
    const actualPage = '/user'
    const queryParams = { login: req.params.login }
    app.render(req, res, actualPage, queryParams)
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(process.env.PORT || 3000, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${process.env.PORT}`)
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})
