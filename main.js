const app = require('./src/app/index')
const config = require('./src/app/config')

app.listen(config.APP_PORT, () => {
    console.log(`服务${config.APP_PORT}已开启`);
})