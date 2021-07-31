const { createMoment, selectMoment, listMoment, updateMoment, removeMoment } = require('../service/moment.service')
class momentController {
    create = async (ctx, next) => {
        //1.获取请求数据
        const user_id = ctx.user.id
        const { content } = ctx.request.body

        //2.将数据添加到数据库
        const result = await createMoment(user_id, content)

        //3.数据响应
        ctx.body = "添加成功"
    }
    getMoment = async (ctx, next) => {
        const momentid = ctx.params.momentid
        // console.log(id);
        const result = await selectMoment(momentid)
        ctx.body = result[0][0]
    }
    list = async (ctx, next) => {
        const { size, offset } = ctx.query
        const result = await listMoment(size, offset)
        ctx.body = result[0]
    }
    update = async (ctx, next) => {
        const { content } = ctx.request.body
        const { momentid } = ctx.params
        const result = await updateMoment(momentid, content)
        ctx.body = result
    }
    remove = async (ctx, next) => {
        const { momentid } = ctx.params
        const result = await removeMoment(momentid)
        ctx.body = result
    }
}



module.exports = new momentController()