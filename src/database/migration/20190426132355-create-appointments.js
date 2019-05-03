'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('appointments', {
      id: {
        allowsNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        allowsNull: true,
        type: Sequelize.DATE
      },
      user_id: {
        allowsNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' }, // serve para referenciar qual tabela está ligado e o campo da users que irá nesta campo. Neste caso, a tabela appointments terá um campo user_id que receberá o id da tabela users
        onUpdate: 'CASCADE', // toda vez que o id do usuário alterar na TABELA DE USUÁRIO, ele irá alterar aqui também
        onDelete: 'CASCADE' // se um usuário for removido na tabel de usuários, irá remover aqui os appointments dele também
      },
      provider_id: {
        allowsNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      created_at: {
        allowsNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowsNull: false,
        type: Sequelize.DATE
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('appoinsments')
  }
}
