const connection = require('../app/database')

class premissionService {
    async premissionTableName(tableName, id, tableNameId) {
        // console.log(tableName, id, tableNameId);
        const statement = `
            SELECT * FROM ${tableName} WHERE user_id = ? AND id = ?
        `
        const result = await connection.execute(statement, [id, tableNameId])
        return result[0].length == 0 ? false : true
    }
}



module.exports = new premissionService()