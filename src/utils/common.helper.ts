import moment from "moment"
import { LOCAL_STORAGE_KEYS } from "./constants"
import * as dateFormatter from 'dateformat'

import { createHashHistory } from 'history'
import { IUser } from "../models/user.model"




export function getErrorMessageFromApiError(error: any | unknown): string {
  return error?.response?.data?.error || 'Network Error! Please try again later'
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

export function getUserFromLocalStorage(): IUser | null {
  const localStorageData = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_USER_KEY)
  const sessionStorageData = sessionStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_USER_KEY)

  if(localStorageData) {
    return JSON.parse(localStorageData) as IUser
  } else if(sessionStorageData) {
    return JSON.parse(sessionStorageData) as IUser
  } else {
    return null;
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

export function serializeQueryParamsOnNull( obj: any ) {
  return '?' + Object.keys(obj).reduce(function(a: any, k: any){
    if(obj[k] !== null && obj[k] !== undefined && obj[k] !== "") {
      a.push(k + '=' + encodeURIComponent(obj[k]));
    }
    return a;
  }, []).join('&');
}

export function prettifyDateTime(date: string) {
  if(!date) return 'N/A'
  // return dateFormatter.default(date, 'mm-dd-yyyy')
  // //"fullDate"
  return dateFormatter.default(date, 'mm-dd-yyyy HH:MM')
  //"fullDate"
}

export const history = createHashHistory()


