const express = require('express')
const sessions = require('express-session')
const LokiStorage = require('connect-loki')(sessions)
const path = require('path')
const nunjucks = require('nunjucks')
const flash = require('connect-flash')

class App {
  constructor () {
    // this.express agora será a nossa variável app
    this.express = express()
    this.isDev = process.env.NODE_ENV !== 'production'

    this.middlewares()
    this.views()
    this.routes()
  }

  middlewares () {
    this.express.use(express.urlencoded({ extended: true }))
    this.express.use(flash())
    this.express.use(
      sessions({
        store: new LokiStorage({
          path: path.resolve(__dirname, 'tmp', 'session.db')
        }),
        name: 'root',
        secret: 'asdn89as6d7as67dna7sd',
        resave: false,
        saveUninitialized: true
      })
    )
  }

  views () {
    nunjucks.configure(path.resolve(__dirname, 'app', 'views'), {
      autoescape: true,
      express: this.express,
      watch: this.isDev
    })

    this.express.use(express.static(path.resolve(__dirname, 'public')))
    this.express.set('view engine', 'njk')
  }

  routes () {
    this.express.use(require('./routes'))
  }
}

module.exports = new App().express
