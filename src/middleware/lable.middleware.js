const { getLableName, lableCreate } = require('../service/lable.service')
const verifyLableExists = async (ctx, next) => {
    try {
        const { names } = ctx.request.body
        const { momentId } = ctx.params
        const newLables = []
        //1.遍历lables数组,得到每一个lable名
        for (let name of names) {
            //2.判断每一个lable是否存在,不存在创建,存在返回信息
            const lables = { name }

            const result = await getLableName(name)
            // console.log(result);
            if (result.length == 0) {
                //3.不存在标签需要创建
                const result = await lableCreate(name)
                lables.id = result.insertId
            } else {
                // console.log(result);
                lables.id = result[0].id
            }
            newLables.push(lables)
        }
        ctx.lables = newLables
        // console.log(newLables);
        await next()
    } catch (err) {
        console.log(err);
    }
}

module.exports = verifyLableExists