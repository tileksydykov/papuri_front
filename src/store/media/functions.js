export const getExt = (name) => {
    const pathParts = name.split('.')
    if (pathParts.length < 2) {
        return '';
    }
    return pathParts.slice(-1).join('')
}
