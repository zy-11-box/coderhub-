const { createMoment, selectMoment, listMoment, updateMoment, removeMoment, addLablesMoment, isExistsLanble } = require('../service/moment.service')
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
        const momentid = ctx.params.momentId
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
        const { momentId } = ctx.params
        const result = await updateMoment(momentId, content)
        ctx.body = result
    }
    remove = async (ctx, next) => {
        const { momentId } = ctx.params
        const result = await removeMoment(momentId)
        ctx.body = result
    }
    addLables = async (ctx, next) => {
        const { momentId } = ctx.params
        // console.log(ctx.lables);
        for (let lable of ctx.lables) {
            const isExists = await isExistsLanble(lable.id, momentId)
            // console.log(isExists);
            if (!isExists) {
                const result = await addLablesMoment(lable.id, momentId)
                // console.log(result);
            }
        }
        ctx.body = "添加标签成功"
    }
}



module.exports = new momentController()