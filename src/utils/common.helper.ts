import moment from "moment"
import { LOCAL_STORAGE_KEYS } from "./constants"





export function getErrorMessageFromApiError(error: any | unknown): string {
  return error?.response?.data?.message || 'Network Error! Please try again later'
}





export function getAccessTokenFromLocalStorage(): string {
  const localStorageData = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_ACCESS_TOKEN)
  const sessionStorageData = sessionStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_ACCESS_TOKEN)

  if(localStorageData) {
    return localStorageData as string
  } else if(sessionStorageData) {
    return sessionStorageData as string
  } else {
    return '';
  }
}

export function userHasAnyRole(userRole: string, requiredRoles: string[]) {
  const result = requiredRoles.filter(role => role === userRole)
  return result
}

export function formatDateTime(dateTime: string, showTime: boolean = true) {
  return moment(dateTime).format('DD-MM-YYYY' + (showTime ? ' HH:MI' : ''))
}

export function getAvatarFromFullname(fullname: string) {
  let arr = fullname?.toUpperCase()?.split(' ') || []
  return `${arr[0]?.substring(0,1)}${arr[1]?.substring(0,1)}`
}

