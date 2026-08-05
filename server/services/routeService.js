const Route = require("../models/routeModel")

const createRoute = async (data) => {
    return await Route.create(data)
}

const getAllRoute = async () => {
    return await Route.find().sort({ createAt: -1 })
}

const getRouteBysId = async (id) => {
    return await Route.findById(id)
}

const updateRoute = async (id, data) => {
    return await Route.findByIdAndUpdate(id, data, {
          returnDocument: "after",
    runValidators: true,
    })
}

const deleteRoute = async (id) => {
    return await Route.findByIdAndDelete(id)
}

module.exports = {
    createRoute,
    getAllRoute,
    getRouteBysId,
    updateRoute,
    deleteRoute
}