const initialState =  null

const user = (state = initialState, action) => {
    switch(action.type){
        case "setUser" : return action.payloads;
        case "resetUser" : return initialState;
        default : return state;
    }
}

export default user;