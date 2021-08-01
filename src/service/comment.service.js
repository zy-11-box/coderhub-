const connection = require('../app/database')
class CommentService {
    async createComment(user_id, moment_id, content) {
        const statement = `
            INSERT INTO comment(user_id, moment_id, content) VALUES(?,?,?)
        `
        const result = await connection.execute(statement, [user_id, moment_id, content])
        return result[0]
    }
    async replyComment(user_id, moment_id, comment_id, content) {
        const statement = `
            INSERT INTO comment(user_id, moment_id, comment_id, content) VALUES(?,?,?,?)
        `
        const result = await connection.execute(statement, [user_id, moment_id, comment_id, content])
        return result[0]
    }
    async updateComment(comment_id, content) {
        const statement = `
           UPDATE comment SET comment.content = ? WHERE comment.id = ?
        `
        const result = await connection.execute(statement, [content, comment_id])
        return result[0]
    }
    async removeComment(commentId) {
        const statement = `
            DELETE FROM comment WHERE id = ?
        `
        const result = await connection.execute(statement, [commentId])
        return result[0]
    }
    async listComment(moment_id) {
        const statement = `
            SELECT
            c.id id,c.content content,c.moment_id momentId,c.createTime,c.updateTime,
            JSON_OBJECT('id',u.id,'username',u.username) user
            FROM comment c
            LEFT JOIN users u
            ON c.user_id = u.id
            WHERE c.moment_id = ?
        `
        const result = await connection.execute(statement, [moment_id])
        return result[0]
    }
}

module.exports = new CommentService()