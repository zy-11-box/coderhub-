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
        default:
            status = 404
            message = "NOT FOUND"
    }
    ctx.status = status
    ctx.body = message
}




module.exports = errHandle