import cart from './cart';
import wishlist from './wishlist';
import alert from './alert';
import user from './user';

import { combineReducers } from "redux";

const rootReducer = combineReducers({
    cart,wishlist,alert,user
})

export default rootReducer;