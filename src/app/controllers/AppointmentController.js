const { User, Appointment } = require('../models')

class AppointmentController {
  async create (req, res) {
    const { provider } = req.params

    const cabelereiro = await User.findByPk(provider)
    res.render('appointments/new', { provider: cabelereiro })
  }

  async store (req, res) {
    const { id } = req.session.user
    const { provider } = req.params
    const { date } = req.body

    await Appointment.create({
      date,
      user_id: id,
      provider_id: provider
    })

    res.redirect('/app/dashboard/')
  }
}

module.exports = new AppointmentController()
