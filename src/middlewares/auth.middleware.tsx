import React from 'react';
import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { ROUTES } from '../utils/constants';
import { ERole } from '../models/user.model';

type Props = {
  children: React.ReactNode
  roles?: ERole[]
}

const AuthMiddleware: React.FC<Props> = (props: any) => {

  if(!window.localStorage.getItem("AUTH-TOKEN")) {
    return <Navigate to={ROUTES.LOGIN} />
  } else if(props.roles) {
    if(!window.localStorage.getItem('AUTH-USER')) {
      return <Navigate to={ROUTES.LOGIN} />
    }
    const user = JSON.parse(window.localStorage.getItem("AUTH-USER") as string)
    if(props.roles.includes(user?.role)) {
      return <>{props.children}</>
    } else {
      return <Navigate to="/not-authorized" />
    }
  } else {
    return <>{props.children}</>
  }
}

AuthMiddleware.propTypes = {
  roles: PropTypes.array
}
export default AuthMiddleware;