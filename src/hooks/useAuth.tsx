import { useEffect } from "react"
import { ERole, IUser } from "../models/user.model"
import { getAccessTokenFromLocalStorage, getUserFromLocalStorage, userHasAnyRole } from "../utils/common.helper"
import { ROUTES } from "../utils/constants"

// type Props = {
//   roles?: Array<ERole>
// }

const useAuth = (
  roles = []
) => {

  useEffect(() => {
     const token = getAccessTokenFromLocalStorage() as string
     const user = getUserFromLocalStorage() as IUser

    if(!token || !user) {
      // return <Navigate to={ROUTES.LOGIN} />
      window.location.href = ROUTES.LOGIN
    } else {
      if((roles && roles.length > 0 && !userHasAnyRole(user?.role, roles))) {
        window.location.href = ROUTES.LOGIN
      }
    }
  })

  return null
}

export default useAuth