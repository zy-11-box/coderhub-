const { createComment, replyComment, updateComment, removeComment, listComment } = require('../service/comment.service')
class CommentController {
    async create(ctx, next) {
        try {
            const user_id = ctx.user.id
            const { moment_id, content } = ctx.request.body
            // console.log(user_id, moment_id, content);
            const result = await createComment(user_id, moment_id, content)
            ctx.body = result
        } catch (err) {
            console.log(err);
        }
    }
    async reply(ctx, next) {
        try {
            const user_id = ctx.user.id
            const comment_id = ctx.params.commentId
            const { moment_id, content } = ctx.request.body
            // console.log(user_id, comment_id, moment_id);
            const result = await replyComment(user_id, moment_id, comment_id, content)
            ctx.body = result
        } catch (err) {
            console.log(err);
        }
    }
    async update(ctx, next) {
        const comment_id = ctx.params.commentId
        const { content } = ctx.request.body
        const result = await updateComment(comment_id, content)
        ctx.body = result
    }
    async remove(ctx, next) {
        const { commentId } = ctx.params
        const result = await removeComment(commentId)
        ctx.body = result
    }
    async list(ctx, next) {
        const { momentId } = ctx.query
        console.log(momentId);
        const result = await listComment(momentId)
        ctx.body = result
    }
}

module.exports = new CommentController()