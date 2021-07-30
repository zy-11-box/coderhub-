const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const useRoutes = require('../router')
const errHandle = require('../app/err-handle')

const app = new Koa()

app.use(bodyparser())

app.useRoutes = useRoutes
app.useRoutes()

app.on('error', errHandle)
module.exports = app