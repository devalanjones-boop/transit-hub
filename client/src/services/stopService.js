import api from "./api";


export const getAllStops = async () => {

    return await api.get("/stops")
};

export const getStopById = async (id) => {

    return await api.get(`/stops/${id}`)
};

export const createStop = async (stopData) => {

    return await api.post("/stops", stopData)
};

export const updateStop = async (id, stopData) => {

    return await api.put(`/stops/${id}`, stopData)
};

export const deleteStop = async (id) => {

    return await api.delete(`/stops/${id}`)
};