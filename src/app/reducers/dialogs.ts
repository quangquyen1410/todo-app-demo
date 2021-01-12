

const dialogReduces = (state: boolean = false, action: any) => {
    if (action.type === 'OPEN_DIALOG') {
        return action.payload
    }
    return state;
}
export default dialogReduces;