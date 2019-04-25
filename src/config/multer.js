const multer = require('multer')
const crypto = require('crypto')
const path = require('path')

module.exports = {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, resp) => {
        if (err) return cb(err)

        // primeiro parâmetro do callback é o erro
        // concatena a hash criada pelo crypt com a extensao do file
        cb(null, resp.toString('hex') + path.extname(file.originalname))
      })
    }
  })
}
