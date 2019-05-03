const { Appointment } = require('../models')
const { Op } = require('sequelize')
const moment = require('moment')

class AvailableController {
  async index (req, res) {
    const { provider } = req.params
    // retorno objeto do moment com métodos do moment
    const date = moment(parseInt(req.query.date))

    const agendamentos = await Appointment.findAll({
      where: {
        provider_id: provider,
        date: {
          // sequelize efetua query between pelo objeto do Op(operador) que é um array que recebe dois valores de datas(iniciais e finais)
          [Op.between]: [
            date.startOf('day').format(), // método do moment
            date.endOf('day').format()
          ]
        }
      }
    })

    const horarios = [
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00'
    ]

    const available = horarios.map(curr => {
      // estou pegando cada elemento do array data e quebrando nos ":", assim de um lado fica as horas e do outro os minutos
      const [hours, minutes] = curr.split(':')
      const montaHora = date
        .hour(hours)
        .minute(minutes)
        .second(0)

      return {
        horario: curr,
        montaHora: montaHora.format(),
        available:
          montaHora.isAfter(moment()) &&
          !agendamentos.find(a => moment(a.date).format('HH:mm') === curr)
      }
    })

    console.log(available)

    res.render('available/index', { available })
  }
}

module.exports = new AvailableController()
