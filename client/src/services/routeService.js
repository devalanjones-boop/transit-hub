import api from "./api";


export const getAllRoutes = async () => {

    return await api.get("/routes")
};

export const getRouteById = async (id) => {

    return await api.get(`/routes/${id}`)
};

export const createRoute = async (routeData) => {

    return await api.post("/routes", routeData)
};

export const updateRoute = async (id, routeData) => {

    return await api.put(`/routes/${id}`, routeData)
};

export const deleteRoute = async (id) => {

    return await api.delete(`/routes/${id}`)
};