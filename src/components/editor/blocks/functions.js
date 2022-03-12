let timeout;
export const debounce = (callback, wait) => {
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(function () { callback.apply(this, args); }, wait);
    };
}
