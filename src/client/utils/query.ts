export const getQueryString = (obj) => (
    Object.keys(obj).reduce((result, key) => {
        // @ts-ignore
        return [...result, `${ encodeURIComponent(key) }=${ encodeURIComponent(obj[key]) }`]
    }, []).join('&'));
