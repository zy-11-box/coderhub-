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
        JSON_OBJECT('user_id',u.id,'username',u.username) author,
        IF(count(l.id),JSON_ARRAYAGG(JSON_OBJECT('id',l.id,'name',l.name)),NULL) lables,
        (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8000/moment/images/',file.filename)) FROM file WHERE
        m.id = file.moment_id) pictures
        FROM moment m
        LEFT JOIN users u ON m.user_id = u.id
        LEFT JOIN moment_lable ml ON m.id = ml.moment_id
        LEFT JOIN lable l ON ml.lable_id = l.id
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
            (SELECT COUNT(*) FROM comment WHERE comment.moment_id = m.id) commentCount,
            (SELECT COUNT(*) FROM moment_lable ml WHERE ml.moment_id = m.id) lableCount,
            (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8000/moment/images/',file.filename)) FROM file WHERE
            m.id = file.moment_id) pictures
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
    async addLablesMoment(lableId, momentId) {
        const statement = `
       INSERT INTO moment_lable (moment_id,lable_id) VALUES(?,?)
        `
        const result = await connection.execute(statement, [momentId, lableId])
        return result[0]
    }
    async isExistsLanble(lableId, momentId) {
        const statement = `
        SELECT * FROM moment_lable WHERE moment_id = ? AND lable_id = ?
        `
        const result = await connection.execute(statement, [momentId, lableId])
        return result[0].length == 0 ? false : true
    }
    async getFileInfo(filename) {
        const statement = `
       SELECT * FROM file WHERE filename = ?
        `
        const result = await connection.execute(statement, [filename])
        return result[0]
    }
}

module.exports = new momentService()