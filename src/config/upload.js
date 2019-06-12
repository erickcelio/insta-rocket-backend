import { diskStorage } from 'multer'
import { resolve } from 'path'

module.exports = {
  storage: new diskStorage({
    destination: resolve(__dirname, '..', '..', 'uploads'),
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    }
  })
}
