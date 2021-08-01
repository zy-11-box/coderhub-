const connection = require('../app/database')

class LableService {
    async lableCreate(name) {
        console.log(name);
        const statement = `
            INSERT INTO lable(name) VALUES(?)
        `
        const result = await connection.execute(statement, [name])
        // console.log(result[0]);
        return result[0]
    }
    async getLableName(name) {
        const statement = `
            SELECT * FROM lable WHERE name = ?
        `
        const result = await connection.execute(statement, [name])
        // console.log(result[0]);
        return result[0]
    }
    async listLable(offset, size) {
        const statement = `
            SELECT * FROM lable Limit ? offset ?
        `
        const result = await connection.execute(statement, [size, offset])
        // console.log(result[0]);
        return result[0]
    }
}

module.exports = new LableService()