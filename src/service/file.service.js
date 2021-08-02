const connection = require('../app/database')

class FileServie {
    async saveAvaterInfoService(id, filename, size, mimetype) {
        const statement = `
        INSERT INTO avater(user_id, filename, size, mimetype) VALUES(?,?,?,?)
        `
        const result = await connection.execute(statement, [id, filename, size, mimetype])
        return result[0]
    }
    async updateUserInfo(avaterUrl, id) {
        const statement = `
        UPDATE users SET avater_url = ? WHERE id = ?
        `
        const result = await connection.execute(statement, [avaterUrl, id])
        return result[0]
    }
    async isExistsAvaterService(user_id) {
        const statement = `
        SELECT * FROM avater WHERE user_id = ?
        `
        const result = await connection.execute(statement, [user_id])
        return result[0].length == 0 ? false : true
    }
    async setAvaterIsOldService(user_id) {
        const statement = `
        UPDATE avater SET old_new = 'old' WHERE user_id = ?
        `
        const result = await connection.execute(statement, [user_id])
        return result[0]
    }
    async savePictureInfoService(userId, momentId, filename, mimetype, size) {
        try {
            const statement = `
        INSERT INTO file(user_id, moment_id, filename, mimetype, size) VALUES(?,?,?,?,?)
        `
            const result = await connection.execute(statement, [userId, momentId, filename, mimetype, size])
            return result[0]
        } catch (err) {
            return "没有此动态,请创建动态后再插入图片"
        }
    }
}

module.exports = new FileServie()