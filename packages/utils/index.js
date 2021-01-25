/**
 * @description 深拷贝数组或者对象
 * @param {IDictionary<any>} target
 * @returns
 */
export const useDeepCopy = (target) => {
    const copyed_objs = []; //此数组解决了循环引用和相同引用的问题，它存放已经递归到的目标对象
    function _deepCopy(target) {
        if (typeof target !== "object" || !target) {
            return target;
        }
        for (let i = 0; i < copyed_objs.length; i++) {
            if (copyed_objs[i].target === target) {
                return copyed_objs[i].copyTarget;
            }
        }
        let deepCloneObj = {};
        if (Array.isArray(target)) {
            deepCloneObj = []; //处理target是数组的情况
        }
        copyed_objs.push({ target, copyTarget: deepCloneObj });
        Object.keys(target).forEach((key) => {
            if (deepCloneObj[key]) {
                return;
            }
            deepCloneObj[key] = _deepCopy(target[key]);
        });
        return deepCloneObj;
    }
    return _deepCopy(target);
}

/**
 * @description 按特定长度切割数组
 * @param {Array} array 需要分组的数组
 * @param {number} subGroupLength 切割长度
 * @returns {Array} 切割后的数组
 */
export const groupSplitArray = (array, subGroupLength) => {
    let index = 0;
    const newArray = [];
    while (index < array.length) {
        newArray.push(array.slice(index, (index += subGroupLength)));
    }
    return newArray;
}