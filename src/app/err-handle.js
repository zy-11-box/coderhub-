const errType = require('../constans/errType')
const errHandle = (err, ctx) => {
    let status, message
    switch (err.message) {
        case errType.NAME_OR_PASSWORD_IS_REQUIRED:
            status = 400
            message = "用户名或者密码不能为空"
            break
        case errType.USER_ALREADY_EXISTS:
            status = 409
            message = "用户名已存在"
            break
        case errType.USER_DOES_EXISTS:
            status = 400
            message = "用户名不存在,请注册"
            break
        case errType.PASSWORD_ERROR:
            status = 400
            message = "密码错误,请重新输入"
            break
        case errType.UNAUTHORIZATION:
            status = 401
            message = "无效的token~"
            break
        default:
            status = 404
            message = "NOT FOUND"
    }
    ctx.status = status
    ctx.body = message
}




module.exports = errHandle