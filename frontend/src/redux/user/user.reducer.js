const InitialState = {
    currentUser:null
}

const userReducer = (state=InitialState, action) => {
    switch(action.type){
        case "":
            return{
                ...state
            }
        default:
            return state
    }
}

export default userReducer;