const { APP_PORT, APP_HOST } = require('../app/config')
const { saveAvaterInfoService, isExistsAvaterService, setAvaterIsOldService, updateUserInfo, savePictureInfoService } = require('../service/file.service')

class FileController {
    async saveAvaterInfo(ctx, next) {
        try {
            //1.将头像信息保存在头像表中
            const { filename, size, mimetype } = ctx.req.file
            const { id } = ctx.user
            //判断用户是否有头像，如果有，将就头像设置为old，新头像设为new
            const isExistsAvater = await isExistsAvaterService(id)
            if (isExistsAvater) {
                await setAvaterIsOldService(id)

            }
            const result = await saveAvaterInfoService(id, filename, size, mimetype)
            //2.将头像url保存在user表中
            const avaterUrl = `${APP_HOST}:${APP_PORT}/user/${id}/avater`
            const userInfo = await updateUserInfo(avaterUrl, id)
            ctx.body = "上传头像成功"
        } catch (err) {
            console.log(err);
        }
    }
    async savePictureInfo(ctx, next) {
        try {
            for (let file of ctx.req.files) {
                const { momentId } = ctx.query
                const { id } = ctx.user
                const { filename, mimetype, size } = file
                const result = await savePictureInfoService(id, momentId, filename, mimetype, size)
                ctx.body = result
            }
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = new FileController()