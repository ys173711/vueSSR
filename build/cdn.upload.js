const qiniu = require('qiniu')
const { AK, SK, bucket } = require('../app.config').cdn
const fs = require('fs')
const path = require('path')

// [文档]https://developer.qiniu.com/kodo/sdk/1289/nodejs
const mac = new qiniu.auth.digest.Mac(AK, SK)
const config = new qiniu.conf.Config()
// 空间对应的机房
config.zone = qiniu.zone.Zone_z2

const doUpload = (key, file) => {
  const options = {
    scope: bucket + ':' + key
  }
  const formUploader = new qiniu.form_up.FormUploader(config)
  const putExtra = new qiniu.form_up.PutExtra()
  const putPolicy = new qiniu.rs.PutPolicy(options)
  const uploadToken = putPolicy.uploadToken(mac)
  return new Promise((resolve, reject) => {
    formUploader.putFile(uploadToken, key, file, putExtra, function (respErr,
      respBody, respInfo) {
      if (respErr) {
        throw respErr
      }
      if (respInfo.statusCode === 200) {
        resolve(respBody)
      } else {
        reject(respBody)
      }
    })
  })
}

const publicPath = path.join(__dirname, '../public')
const uploadAll = (dir, prefix) => {
  const files = fs.readFileSync(dir)
  files.forEach(file => {
    const filePath = path.join(dir, file)
    const key = prefix ? `${prefix}/${file}` : file
    if (fs.lstatSync(filePath).isDirectory()) {
      return uploadAll(filePath, key)
    }
    doUpload(key, filePath)
      .then(resp => console.log(resp))
      .catch(err => console.log(err))
  })
}

uploadAll(publicPath)
