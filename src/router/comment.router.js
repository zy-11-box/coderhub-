const Router = require('koa-router')
const { verifyAuth, verifyPermission } = require('../middleware/auth.middleware')
const { create, reply, update, remove, list } = require('../controller/comment.controller')
const commentRouter = new Router({ prefix: '/comment' })
//用户发表动态上的评论
commentRouter.post('/', verifyAuth, create)
//用户发表评论的评论
commentRouter.post('/:commentId/reply', verifyAuth, reply)
//用户修改评论
commentRouter.patch('/:commentId', verifyAuth, verifyPermission, update)
//用户删除评论
commentRouter.delete('/:commentId', verifyAuth, verifyPermission, remove)
//获取动态评论列表
commentRouter.get('/', list)
module.exports = commentRouter