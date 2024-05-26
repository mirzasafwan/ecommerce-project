import { CREATE_USER_FAIL, CREATE_USER_REQUEST, CREATE_USER_SUCCESS } from "../actions/authAction";
import { LOGIN_REQUEST, LOGIN_SUCCESS } from "../constants/authConstant";


const initialState = {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
    // Add other relevant fields here
};

export const userCreateReducer = (state = { loading: false, error: null, user: null }, action) => {
    switch (action.type) {
      case CREATE_USER_REQUEST:
        return { ...state, loading: true,isAuthenticated:false };
      case CREATE_USER_SUCCESS:
        return { ...state, loading: false, user: action.payload,error: null,isAuthenticated:true };
      case CREATE_USER_FAIL:
        return { ...state, loading: false, error: action.payload,isAuthenticated:false };
      default:
        return state;
    }
  };
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true, // Set loading state to true when login request starts
                isAuthenticated: false,
            };
            case LOGIN_SUCCESS:
                return {
                    ...state,
                    loading: false, // Set loading state to false when login is successful
                    isAuthenticated: true,
                    user: action.payload, // Set user data from the payload
            };
      default:
        return state;
    }
};
export default authReducer;

