import http from "../../http/http"

export const login = (data) => http('user/login', data)

export const register = (data) => http('user/register', data, 'POST')

export const getUsers = (data) => http('user/getUsers', data)

export const deleteUser = (data) => http('user/deleteUser', data, 'POST')

export const modifyPass = (data) => http('user/modifyPass', data, 'POST')
