import React, {useState} from 'react'
import { renderRoutes } from 'react-router-config'
import Menu from './Menu'

const Layout = (props) => {
  const {route} = props;
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));

  if(!accessToken){
    return <div>Need to login</div>
  }

  return (
    <>
      <Menu>{renderRoutes(route.routes)}</Menu>
    </>
  )
}

export default Layout
