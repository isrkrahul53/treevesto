import cart from './cart';
import alert from './alert';
import user from './user';

import { combineReducers } from "redux";

const rootReducer = combineReducers({
    cart,alert,user
})

export default rootReducer;