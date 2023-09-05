import { useLocation, useNavigate, useParams } from "react-router-dom"

const WithRouter = (Component) => {
    const WithRouterContainer = (props) => {
        const params = useParams()
        const navigate = useNavigate()
        const location = useLocation()
        
        return(
            
            <Component {...props} params={params} navigate={navigate} location={location}/>
        )
    }

    return WithRouterContainer
}

export default WithRouter