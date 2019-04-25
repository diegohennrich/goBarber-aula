// sequelize -> é a instâcia do sequelize, através do arquivo /models/index.js, é possível acessar essa instância dentro de todos os models
// DataTypes -> são os tipos de dados do model (string, date, booolean, etc)

const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      avatar: DataTypes.STRING,
      password: DataTypes.VIRTUAL,
      password_hash: DataTypes.STRING,
      provider: DataTypes.BOOLEAN
    },
    {
      // o segundo parâmetro do model são os HOOKS (triggers chamados após alguma alteração no registro)
      hooks: {
        beforeSave: async user => {
          if (user.password) {
            user.password_hash = await bcrypt.hash(user.password, 8)
          }
        }
      }
    }
  )

  // não uso arrow function para poder acessar o THIS (objeto do user) dentro da função criada
  User.prototype.checkPassword = function (password) {
    return bcrypt.compare(password, this.password_hash)
  }

  return User
}
