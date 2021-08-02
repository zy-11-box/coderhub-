//处理中间件逻辑，不负责查询数据
const fs = require('fs')
const path = require('path')
const { PATH_AVATER } = require('../constans/errType')
const { create, getUserInfoService, getUserAvaterService } = require('../service/user.service')
class UserController {
    async create(ctx, next) {
        //1.获得参数
        const user = ctx.request.body
        //2.查询数据
        const result = await create(user)
        //3.返回数据
        // console.log(result);
        if (!result) {
            ctx.body = "注册失败"
        } else {
            ctx.body = "注册成功"
        }
    }
    async getUserInfo(ctx, next) {
        const { id } = ctx.user
        const result = await getUserInfoService(id)
        ctx.body = result
    }
    async getUserAvater(ctx, netx) {
        const { userId } = ctx.params
        const [result] = await getUserAvaterService(userId)
        // console.log(result);
        const filename = result.filename
        const pathName = path.join(PATH_AVATER, filename)
        ctx.response.set('content-type', result.mimetype);
        ctx.body = fs.createReadStream(pathName)
    }
    async getUserOldAvater(ctx, next) {
        const { userId, filename } = ctx.params
        const [result] = await getUserAvaterService(userId)
        // console.log(result);
        const pathName = path.join(PATH_AVATER, filename)
        ctx.response.set('content-type', result.mimetype);
        ctx.body = fs.createReadStream(pathName)
    }
}

module.exports = new UserController()