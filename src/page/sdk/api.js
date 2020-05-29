import Qs from 'qs'
export const sdkUpload = data => window.$http.post('/developer/sdkUpload', data)     //证书和密码配置
export const sdkSubmit = data => window.$http({
    url: `${window.java_url}/sendsdk.jsp?arg=${window.arg}`,
    method: 'post',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    withCredentials: false,
    data:Qs.stringify(data)

})   //保存

export const getProductList = data => window.$http({
    method: 'post',
    url: `${window.java_url}/sendsdk.jsp?arg=${window.arg}`,
    withCredentials: false,
    data:Qs.stringify(data)
})     //获取产品列表

export const delProductList = data => window.$http({
    method: 'post',
    url: `${window.java_url}/sendsdk.jsp?arg=${window.arg}`,
    withCredentials: false,
    data: Qs.stringify(data)
})     //删除产品