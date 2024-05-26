import { combineReducers } from 'redux';
import authReducer, { userCreateReducer } from './authReducer';
// import cartReducer from './cartReducer';
// Import other reducers as needed

const rootReducer = combineReducers({
     auth: authReducer,
     userCreate: userCreateReducer
});

export default rootReducer;
