const { User } = require('../models')

class SessionController {
  create (req, res) {
    return res.render('auth/signin')
  }

  async login (req, res) {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })

    if (!user) {
      console.log('Não existe este usuário')
      return res.redirect('/signin')
    }

    if (!(await user.checkPassword(password))) {
      console.log('senha incorreta')
      return res.redirect('/signin')
    }

    req.session.user = user

    res.redirect('/app/dashboard/')
  }
}

module.exports = new SessionController()
