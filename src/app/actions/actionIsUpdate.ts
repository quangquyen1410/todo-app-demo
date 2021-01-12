export const openUpdate = () => {
    return {
        type: 'IS_UPDATE',
        payload: true
    }
}
export const closeUpdate = () => {
    return {
        type: 'IS_UPDATE',
        payload: false
    }
}