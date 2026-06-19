// 存储带过期时间的数据
function setWithExpiry(key, value, ttl) {
    const now = new Date();
    const item = {
        value: value,
        expiry: now.getTime() + ttl
    };
    localStorage.setItem(key, JSON.stringify(item));
}

// 获取数据并检查是否过期
function getWithExpiry(key) {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;

    const item = JSON.parse(itemStr);
    const now = new Date();

    if (now.getTime() > item.expiry) {
        localStorage.removeItem(key);
        return null;
    }
    return item.value;
}

export {
    setWithExpiry,getWithExpiry
}