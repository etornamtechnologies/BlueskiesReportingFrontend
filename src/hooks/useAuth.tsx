import { useEffect } from "react"
import { ERole, IUser } from "../models/user.model"
import { getAccessTokenFromLocalStorage, getUserFromLocalStorage } from "../utils/common.helper"
import { Navigate } from "react-router-dom"
import { ROUTES } from "../utils/constants"

type Props = {
  roles?: Array<ERole>
}

const useAuth: React.FC<Props> = ({
  roles = []
}) => {

  useEffect(() => {
     const token = getAccessTokenFromLocalStorage() as string
     const user = getUserFromLocalStorage() as IUser

    if(!token || !user) {
      // return <Navigate to={ROUTES.LOGIN} />
      window.location.href = ROUTES.LOGIN
    } else {
      if((roles && roles.length > 0)) {
        
      } else {
        
      }
    }
  })

  return null
}