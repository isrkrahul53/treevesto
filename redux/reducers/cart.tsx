const initialState =  5

const cart = (state = initialState, action) => {
    switch(action.type){
        case "INSERT" : return state + 1;
        case "DELETE" : return state - 1;
        default : return state;
    }
}

export default cart;