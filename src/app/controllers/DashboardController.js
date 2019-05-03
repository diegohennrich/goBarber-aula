const { User, Appointment } = require('../models')
const { Op } = require('sequelize')
const moment = require('moment')

class DashboardController {
  async index (req, res) {
    const { provider } = req.query

    if (provider) {
      const agendamentos = await Appointment.findAll({
        include: [{ model: User, as: 'user' }],
        where: {
          provider_id: provider,
          date: {
            [Op.between]: [
              moment()
                .startOf('day')
                .format(),
              moment()
                .endOf('day')
                .format()
            ]
          }
        }
      })

      return res.render('appointments/schedule', {
        agendamentos
      })
    }
    const providers = await User.findAll({ where: { provider: true } })

    res.render('dashboard', { providers })
  }
}

module.exports = new DashboardController()
