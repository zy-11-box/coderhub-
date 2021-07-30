const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../app/config')
class AuthContriller {
    login = (ctx, next) => {
        const { id, username } = ctx.user
        const user = { id, username }
        //登录成功后颁发令牌
        let token = jwt.sign(user, PRIVATE_KEY, {
            algorithm: 'RS256',
            expiresIn: 60 * 60 * 24
        })
        ctx.body = { id, username, token }
    }
}


module.exports = new AuthContriller()