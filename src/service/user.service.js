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


}

module.exports = new UserService()