import axios from 'axios';
// 超时时间
const TIMEOUT = 15000;

/**
 * @description axiso 配置
 * @param {String} url
 */
export const axiosConfig = url => {
    // 设置axios 接口
    axios.defaults.baseURL = url;
    axios.defaults.timeout = TIMEOUT;
    axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
}

