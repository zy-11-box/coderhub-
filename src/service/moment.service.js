const connection = require('../app/database')
// const sqlStr = `SELECT
//         m.id id,m.content content,m.createTime createTime,m.updateTime updateTime,
//         JSON_OBJECT('user_id',u.id,'username',u.username) author
//         FROM moment m
//         LEFT JOIN users u ON m.user_id = u.id`
class momentService {
    createMoment(user_id, content) {
        console.log(user_id, content);
        const statement = `INSERT INTO moment(user_id,content) VALUES(?,?)`
        const result = connection.execute(statement, [user_id, content])
        return result[0]
    }
    selectMoment(id) {
        const statement = `
        SELECT
        m.id id,m.content content,m.createTime createTime,m.updateTime updateTime,
        JSON_OBJECT('user_id',u.id,'username',u.username) author
        FROM moment m
        LEFT JOIN users u ON m.user_id = u.id
        WHERE m.id = ?
        `
        const result = connection.execute(statement, [id])
        return result
    }
    listMoment(size, offset) {
        const statement = `
        SELECT
        m.id id,m.content content,m.createTime createTime,m.updateTime updateTime,
        JSON_OBJECT('user_id',u.id,'username',u.username) author,
        (SELECT COUNT(*) FROM comment WHERE comment.moment_id = m.id) commentCount
        FROM moment m
        LEFT JOIN users u ON m.user_id = u.id
        LIMIT ? OFFSET ?
        `
        const result = connection.execute(statement, [size, offset])
        return result
    }
    async updateMoment(momentid, content) {
        const statement = `
        UPDATE moment SET content = ? WHERE id = ?
        `
        const result = await connection.execute(statement, [content, momentid])
        return result[0]
    }
    async removeMoment(momentid) {
        const statement = `
        DELETE FROM moment WHERE id = ?
        `
        const result = await connection.execute(statement, [momentid])
        return result[0]
    }
}

module.exports = new momentService()