const { User } = require('../models')

class SessionController {
  create (req, res) {
    return res.render('auth/signin')
  }

  async login (req, res) {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })

    if (!user) {
      req.flash('error', 'Usuário não encontrado')
      return res.redirect('/signin')
    }

    if (!(await user.checkPassword(password))) {
      req.flash('error', 'Senha incorreta')
      return res.redirect('/signin')
    }

    req.session.user = user

    res.redirect('/app/dashboard/')
  }

  destroy (req, res) {
    req.session.destroy(() => {
      // root é o nome definido do meu session no arquivo server.js
      res.clearCookie('root')
      return res.redirect('/')
    })
  }
}

module.exports = new SessionController()
