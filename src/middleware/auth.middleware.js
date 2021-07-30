//对登录前进行数据验证
const jwt = require('jsonwebtoken')
const { PUBLIC_KEY } = require('../app/config')
const service = require('../service/user.service')
const errType = require('../constans/errType')
const md5password = require('../utils/password-handle')

const verifyLogin = async (ctx, next) => {
    //1.用户和密码不能为空
    const { username, password } = ctx.request.body
    if (!username || !password) {
        const err = new Error(errType.NAME_OR_PASSWORD_IS_REQUIRED)
        return ctx.app.emit('error', err, ctx)
    }

    //2.用户未存在
    const result = await service.getUser(username)
    // console.log(result);
    if (result.length == 0) {
        const err = new Error(errType.USER_DOES_EXISTS)
        return ctx.app.emit('error', err, ctx)
    }

    //3.判断密码是否正确    
    const user = result[0]//获得用户数据
    // console.log(user);
    //通过对传入密码进行加密，再与原密码进行比较
    md5password(ctx, password)
    if (ctx.request.body.password !== user.password) {
        const err = new Error(errType.PASSWORD_ERROR)
        return ctx.app.emit('error', err, ctx)
    }
    ctx.user = user
    await next()
}
//验证token授权的中间件（很重要，之后的接口要用到）
const verifyAuth = (ctx, next) => {
    console.log("验证授权middleware");
    let token = ctx.headers.authorization
    if (!token) {
        const error = new Error(errType.UNAUTHORIZATION);
        return ctx.app.emit('error', error, ctx);
    }
    token = token.replace('Bearer ', '')
    try {
        const result = jwt.verify(token, PUBLIC_KEY, {
            algorithms: ['RS256']
        })
        ctx.body = result
    } catch (err) {
        const error = new Error(errType.UNAUTHORIZATION)
        return ctx.app.emit('error', error, ctx)
    }
}

module.exports = {
    verifyLogin,
    verifyAuth
}