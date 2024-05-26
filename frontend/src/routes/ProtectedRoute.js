
import {Navigate} from "react-router-dom"

export const PrivateRoutes = ({children}) => {
    const getTokenFromLocalStorage = localStorage.getItem('user-token')
    return getTokenFromLocalStorage?.token !== undefined ? children : (<Navigate to='/login' replace={true}/>)
}