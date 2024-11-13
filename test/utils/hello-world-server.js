'use strict'

const { createServer } = require('node:http')
const hostname = '127.0.0.1'

const server = createServer(async (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello World')
})

server.listen(0, hostname, () => {
  if (process.send) {
    process.send(`http://${hostname}:${server.address().port}/`)
  } else {
    console.log(`http://${hostname}:${server.address().port}/`)
  }
})
