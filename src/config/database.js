module.exports = {
  dialect: 'postgres', // mysql, postgres, etc
  host: '127.0.0.1',
  username: 'docker',
  password: 'docker',
  database: 'gonodemodulo2',
  operatorAliases: false,
  define: {
    timestamps: true, // cria created_at e updated_at em todas as tabela
    underscored: true, // para colocar "_" no nome das tabelas
    underscoredAll: true // fazer tb no nome das colunas
  }
}
