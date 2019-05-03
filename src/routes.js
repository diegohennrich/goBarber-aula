const express = require('express')
const routes = express.Router()
const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')
const DashboardController = require('./app/controllers/DashboardController')
const FileController = require('./app/controllers/FileController')
const AppointmentController = require('./app/controllers/AppointmentController')
const AvailableController = require('./app/controllers/AvailableController')

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

routes.get('/files/:file', FileController.show)

routes.get('/', (req, res) => res.render('auth/signin'))
routes.get('/signup', GuestMiddleware, UserController.create)
routes.post('/signup', upload.single('avatar'), UserController.store)

routes.get('/signin', GuestMiddleware, SessionController.create)
routes.post('/signin', SessionController.login)

// usando o "use", qualquer rota que vier para /app/* passará por esse middleware
routes.use('/app', AuthMiddleware)

routes.get('/app/logout', SessionController.destroy)
routes.get('/app/dashboard', DashboardController.index)

routes.get('/app/appointments/new/:provider', AppointmentController.create)
routes.post('/app/appointments/new/:provider', AppointmentController.store)

routes.get('/app/available/:provider', AvailableController.index)

module.exports = routes
