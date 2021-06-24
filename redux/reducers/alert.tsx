const initialState =  ""

const alert = (state = initialState, action) => {
    switch(action.type){
        case "setAlert" : return action.payloads;
        case "resetAlert" : return initialState;
        default : return state;
    }
}

export default alert;