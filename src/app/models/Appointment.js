module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define('Appointment', {
    date: DataTypes.DATE
  })

  // estou associando o model Appointment ao User, armazenando a chave estrangeira na tabela de appointment
  Appointment.associate = models => {
    // models.user é o modelo no qual está relacionado
    // foreignKey é o campo que ficará armazenado
    Appointment.belongsTo(models.User, { as: 'user', foreignKey: 'user_id' })
    Appointment.belongsTo(models.User, { foreignKey: 'provider_id' })
  }

  return Appointment
}
