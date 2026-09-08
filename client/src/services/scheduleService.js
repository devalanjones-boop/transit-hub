import api from "./api";


export const getAllSchedules = async () => {

    return await api.get("/schedules")
};

export const getScheduleById = async (id) => {

    return await api.get(`/schedules/${id}`)
};

export const createSchedule = async (scheduleData) => {

    return await api.post("/schedules", scheduleData)
};

export const updateSchedule = async (id, scheduleData) => {

    return await api.put(`/schedules/${id}`, scheduleData)
};

export const deleteSchedule = async (id) => {

    return await api.delete(`/schedules/${id}`)
};

export const getUpcomingSchedulesByBus = async (busId) => {

    return await api.get(`/schedules/${busId}/upcoming-schedules`)
};