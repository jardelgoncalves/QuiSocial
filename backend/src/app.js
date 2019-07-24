import express from 'express'

import datasource from './config/datasource'
import UsersRoutes from './routes/users'

class App {
  constructor () {
    this.express = express()

    this.config()
    this.middlewares()
    this.routes()
  }

  config () {
    this.express.set('port', 3000)
    this.express.datasource = datasource(this.express)
  }

  middlewares () {
    this.express.use(express.json())
  }
  
  routes () {
    UsersRoutes(this.express)
  }
}

export default new App().express