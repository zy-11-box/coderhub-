const Router = require('koa-router')
const { verifyAuth } = require('../middleware/auth.middleware')
const { saveAvaterInfo, savePictureInfo } = require('../controller/file.controller')
const { avatarHandler, pictureHandler } = require('../middleware/file.middleware')
const fileRouter = new Router({ prefix: '/upload' })
//上传头像
fileRouter.post('/avater', verifyAuth, avatarHandler, saveAvaterInfo)
//上传文件(动态配图)
fileRouter.post('/picture', verifyAuth, pictureHandler, savePictureInfo)

module.exports = fileRouter