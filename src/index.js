const server = require('./server')
const { PORT } = process.env

server.listen(PORT || 3000, () =>
  console.log(`Rodando server na porta ${PORT}`)
)
