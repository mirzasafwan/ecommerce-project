

import {useNavigate} from "react-router-dom"

export const OpenRoutes = ({children}) => {
    const navigate = useNavigate()
    const getTokenFromLocalStorage = localStorage.getItem('user-token')
    return getTokenFromLocalStorage?.token === undefined ? children : (<navigate to='/' replace={true}/>)
}