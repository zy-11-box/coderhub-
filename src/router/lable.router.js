const Router = require('koa-router')
const { verifyAuth } = require('../middleware/auth.middleware')
const { create, list } = require('../controller/lable.controller')
const lableRouter = new Router({ prefix: '/lable' })

//创建标签
lableRouter.post('/', verifyAuth, create)
//标签列表
lableRouter.get('/', list)
module.exports = lableRouter