const multer = require('koa-multer')
const path = require('path')
const { PATH_AVATER, PATH_PICTURE } = require('../constans/errType')
const upload = multer({
    dest: PATH_AVATER
})
const avatarHandler = upload.single('avater')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, PATH_PICTURE)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const pictureUpload = multer({
    storage
})

const pictureHandler = pictureUpload.array('picture', 9)

module.exports = {
    avatarHandler,
    pictureHandler
}