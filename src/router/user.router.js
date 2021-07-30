//只用来注册路由，不处理逻辑
const Router = require('koa-router')
const { create } = require('../controller/user.controller')
const { verifyUser, handlePassword } = require('../middleware/user.middleware')
const userRouter = new Router({ prefix: '/user' })

userRouter.post('/', verifyUser, handlePassword, create)
//数据库中密码不能为明文，需要在验证中间件后配置一个加密中间件
module.exports = userRouter