const connection = require('../app/database')

class premissionService {
    async premissionMoment(id, momentid) {
        const statement = `
            SELECT * FROM moment WHERE moment.user_id = ? AND moment.id = ?
        `
        const result = await connection.execute(statement, [id, momentid])
        return result[0].length == 0 ? false : true
    }
}



module.exports = new premissionService()