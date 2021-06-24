import cart from './cart';
import alert from './alert';

import { combineReducers } from "redux";

const rootReducer = combineReducers({
    cart,alert
})

export default rootReducer;