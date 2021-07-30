//用来验证请求参数是否符合
const errType = require('../constans/errType')
const service = require('../service/user.service')
const md5password = require('../utils/password-handle')
const verifyUser = async (ctx, next) => {
    //1.用户或密码不能为空
    const { username, password } = ctx.request.body
    if (!username || !password) {
        const err = new Error(errType.NAME_OR_PASSWORD_IS_REQUIRED)
        return ctx.app.emit('error', err, ctx)
    }
    //2.用户已存在
    const result = await service.getUser(username)
    // console.log(result);
    if (result.length != 0) {
        const err = new Error(errType.USER_ALREADY_EXISTS)
        return ctx.app.emit('error', err, ctx)
    }
    await next()
}

const handlePassword = async (ctx, next) => {
    //使用node中自带的加密模块crypto
    //还有一种加密是使用第三方库bcrypjs
    const { password } = ctx.request.body
    md5password(ctx, password)
    // console.log(ctx.request.body.password);
    await next()
}



module.exports = {
    verifyUser,
    handlePassword
}