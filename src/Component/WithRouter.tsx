import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const withRouter = (Component: React.ComponentType<any>) => {
  const WithRouter = (props: any) => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
  return (
    <Component 
    {...props}
    navigate={navigate}
    location={location}
    params={params}
    />
  )
}
return WithRouter
}
export default withRouter;