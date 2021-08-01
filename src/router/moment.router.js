const Router = require('koa-router')
const { verifyAuth, verifyPermission } = require('../middleware/auth.middleware')
const verifyLableExists = require('../middleware/lable.middleware')
const momentRouter = new Router({ prefix: '/moment' })
const { create, getMoment, list, update, remove, addLables } = require('../controller/moment.controller')
//添加动态接口
momentRouter.post('/', verifyAuth, create)
//查看一条动态详情(无需登录也能查看动态)
momentRouter.get('/:momentId', getMoment)
//查看动态列表
momentRouter.get('/', list)
//修改动态接口(修改动态必须先登录，然后只能删除自己发布的动态)
momentRouter.patch('/:momentId', verifyAuth, verifyPermission, update)
//删除动态接口
momentRouter.delete('/:momentId', verifyAuth, verifyPermission, remove)
//为动态创建标签
momentRouter.post('/:momentId/lables', verifyAuth, verifyPermission, verifyLableExists, addLables)


module.exports = momentRouter