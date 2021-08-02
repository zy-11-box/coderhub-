//只用来注册路由，不处理逻辑
const Router = require('koa-router')
const { create, getUserInfo, getUserAvater, getUserOldAvater } = require('../controller/user.controller')
const { verifyUser, handlePassword } = require('../middleware/user.middleware')
const { verifyAuth } = require('../middleware/auth.middleware')
const userRouter = new Router({ prefix: '/user' })
//用户注册
userRouter.post('/', verifyUser, handlePassword, create)
//数据库中密码不能为明文，需要在验证中间件后配置一个加密中间件
//获取用户信息
userRouter.get('/', verifyAuth, getUserInfo)
//查询最新头像图片
userRouter.get('/:userId/avater', getUserAvater)
//查看历史头像图片
userRouter.get('/:userId/avater/:filename', getUserOldAvater)
module.exports = userRouter