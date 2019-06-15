// trims strings in objects
export default (obj) => {
    const copyObj = obj;
    Object.keys(obj).forEach(k => {
        obj[k] = typeof obj[k] === 'string' ? obj[k].trim() : obj[k];
    })
    return copyObj;
}