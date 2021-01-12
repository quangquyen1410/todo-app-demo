export const openDialog = () => {
    return {
        type: 'OPEN_DIALOG',
        payload: true
    }
}
export const closeDialog = () => {
    return {
        type: 'OPEN_DIALOG',
        payload: false
    }
}