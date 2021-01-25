import axios from 'axios';

/**
 * @description axiso 配置
 * @param {number[]} lpXis 轨迹X
 * @param {number[]} lpYis 轨迹Y
 * @param {number[]} lpCis 轨迹标志位
 * @param {string} lib 中英文
 */
export const getWordFromHandWrite = async (lpXis, lpYis, lpCis, lib) => await axios.post("", { lib, lpXis, lpYis, lpCis })
