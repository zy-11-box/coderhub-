//负责查询数据
const connection = require('../app/database')//得到的是promise
class UserService {
    async create(user) {
        const { username, password } = user
        //操作数据库
        const statement = `INSERT INTO users (username,password) VALUES(?,?)`
        const result = await connection.execute(statement, [username, password])
        return result[0]
    }
    async getUser(username) {
        const statement = `SELECT * FROM users WHERE username = ?`
        const result = await connection.execute(statement, [username])
        return result[0]
    }
    async getUserInfoService(id) {
        const statement = `SELECT
            u.id id,u.username username,u.createAt createAt,u.updateAt updateAt,u.avater_url avater_url,
            JSON_ARRAYAGG(CONCAT(u.avater_url,'/',a.filename)) oldAvater_url
            FROM users u
            LEFT JOIN avater a ON u.id = a.user_id
            WHERE u.id = ? AND a.old_new = 'old'
            GROUP BY u.id`
        const result = await connection.execute(statement, [id])
        return result[0]
    }
    async getUserAvaterService(userId) {
        const statement = `SELECT * FROM avater WHERE user_id = ? AND old_new = 'new'`
        const result = await connection.execute(statement, [userId])
        return result[0]
    }
}

module.exports = new UserService()