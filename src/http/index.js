
import axios from 'axios';
import { message } from 'antd';

let is_in_development = process.env.NODE_ENV === 'development',

    CancelToken = axios.CancelToken,
    source = CancelToken.source();
// php 接口
window.base_url = is_in_development
    ? 'https://dataapi.71baomu.com'
    : '//' + window.location.host;
//java 接口
const url_host = window.location.host
window.java_url = url_host === 'dataapi.53kf.com'
    ? 'https://talk.53kf.com'
    : 'https://talk.71baomu.com';


const options = {
    baseURL: window.base_url,

    headers: {
        'Accept': '*/*',
    },
    withCredentials: true,
};

// !is_in_development
//     &&
//     (options.headers = { ...options.headers, 'X-Requested-With': 'XMLHttpRequest' })
window.$http = axios.create(options);
// 配置发送请求拦截器
window.$http.interceptors.request.use(config => {
    config = {
        ...config,
        cancelToken: source.token,
    }
    return config;
})
//返回拦截器
window.$http.interceptors.response.use(
    response => { 
        if (response.data.code && response.data.code === 302) {
            window.location.href =
                is_in_development ? 'http://kf.71baomu.com/login/guide?url=' + window.base_url + 'developer/index&from=dataapi'
                    :
                    'http://www.53kf.com/login/guide?url=' + window.base_url + 'developer/index&from=dataapi'
            return;
        }
        if (response.data.code && response.data.code === 10000) {
            response.data.msg && message.success(response.data.msg || '操作成功')
            return response;
        }
        if (response.data.code && response.data.code !== 10000) {
            message.error(response.data.msg || '连接出错'); 
            return Promise.reject(response.data);
        }
        return response;
    },
    err => {
        if (err.message === '路由跳转') return new Promise(() => { });
        if (err.message === 'Network Error') message.error('请检查网络连接');
        return Promise.reject(err);
    }
)


