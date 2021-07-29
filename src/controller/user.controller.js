//处理中间件逻辑，不负责查询数据
const { create } = require('../service/user.service')
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

}

module.exports = new UserController()