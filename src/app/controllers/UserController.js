const { User } = require('../models')

class UserController {
  create (req, res) {
    return res.render('auth/signup')
  }

  store (req, res) {
    const { filename: avatar } = req.file

    // aqui estou mandando para o create a copia do req.body e dizendo que o body agora tem um novo campo avatar = avatar(filename) do req.file
    User.create({ ...req.body, avatar })
    res.redirect('/')
  }
}

module.exports = new UserController()
