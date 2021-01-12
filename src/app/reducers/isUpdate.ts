const isUpdateReduces = (state: boolean = false, action: any) => {
    if (action.type === 'IS_UPDATE') {
        return action.payload
    }
    // switch (action.type) {
    //     case 'IS_UPDATE': {
    //         return action.payload
    //     }
    //     case 'IS_ADD': {
    //         return action.payload
    //     }
    //     default: return state;
    // }
    return state;
}
export default isUpdateReduces;