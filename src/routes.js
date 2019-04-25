const express = require('express')
const routes = express.Router()
const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')

const AuthMiddleware = require('./app/middlewares/auth')
const GuestMiddleware = require('./app/middlewares/guest')

const multer = require('multer')
const multerConfig = require('./config/multer')
const upload = multer(multerConfig)

routes.use((req, res, next) => {
  // estou definando que o nunjucks conseguirá acessas sempre as variáveis globais de flashSuccess e flashError

  res.locals.flashSuccess = req.flash('success')
  res.locals.flashError = req.flash('error')

  return next()
})

routes.get('/', (req, res) => res.render('auth/signin'))
routes.get('/signup', GuestMiddleware, UserController.create)
routes.post('/signup', upload.single('avatar'), UserController.store)

routes.get('/signin', GuestMiddleware, SessionController.create)
routes.post('/signin', SessionController.login)

// usando o "use", qualquer rota que vier para /app/* passará por esse middleware
routes.use('/app', AuthMiddleware)

routes.get('/app/logout', SessionController.destroy)
routes.get('/app/dashboard', (req, res) => res.render('dashboard'))
module.exports = routes
