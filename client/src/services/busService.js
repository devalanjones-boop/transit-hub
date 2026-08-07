import api from "./api"


export const getAllBuses = async () => {

    return await api.get("/buses")
};

export const getBusById = async (id) => {

    return await api.get(`/buses/${id}`)
};

export const createBus = async (busData) => {

    return await api.post("/buses", busData)
};

export const updateBus = async (id,busData) => {

    return await api.put(`/buses/${id}`, busData)
};

export const deleteBus = async (id) => {

    return await api.delete(`/buses/${id}`)
}