//注册登录路由
const { verify } = require('jsonwebtoken')
const Router = require('koa-router')
const { login } = require('../controller/auth.controller')
const { verifyLogin, verifyAuth } = require('../middleware/auth.middleware')
const authRouter = new Router({ prefix: '/login' })

authRouter.post('/', verifyLogin, login)
authRouter.get('/text', verifyAuth)//测试token授权的路由，没有实际业务

module.exports = authRouter