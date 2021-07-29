const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const userRouter = require('../router/user.router')
const errHandle = require('../app/err-handle')
const app = new Koa()
app.use(bodyparser())
app.use(userRouter.routes())
app.on('error', errHandle)
module.exports = app