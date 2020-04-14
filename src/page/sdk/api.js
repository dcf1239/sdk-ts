export const sdkUpload = (data) => window.$http.post('/developer/sdkUpload', data)     //证书和密码配置
export const sdkSubmit = (data) => window.$http.post('/developer/sdk', data)     //保存