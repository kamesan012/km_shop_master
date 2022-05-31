import http from "../../http/http"

export const getRoutesByIdentity = (data) => http('route/getRoutesByIdentity', data)

export const getRoutes = (data) => http('route/getRoutes', data)

export const deleteRoute = (data) => http('route/deleteRoute', data, 'POST')

export const modifyRoute = (data) => http('route/modifyRoute', data, 'POST')

export const addRoute = (data) => http('route/addRoute', data, 'POST')