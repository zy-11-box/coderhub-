const { lableCreate, listLable } = require('../service/lable.service')
class LableController {
    async create(ctx, next) {
        const { name } = ctx.request.body
        const result = await lableCreate(name)
        ctx.body = "εε»Ίζε"
    }
    async list(ctx, next) {
        const { offset, size } = ctx.query
        const result = await listLable(offset, size)
        ctx.body = result
    }

}

module.exports = new LableController()