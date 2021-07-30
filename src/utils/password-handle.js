const crypto = require('crypto')
const md5password = (ctx, password) => {
    //1.使用md5的加密方式
    const md5 = crypto.createHash('md5')
    //2.使用md5将原密码以16进制的方式进行加密
    ctx.request.body.password = md5.update(password).digest('hex')
    // console.log(password);
    // return md5.update(password).digest('hex')
}

module.exports = md5password