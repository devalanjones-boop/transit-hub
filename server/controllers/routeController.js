let Route = require("../models/routeModel")

let createRoute = async (req,res) => {
try {
    const { error, value } = routeValidationSchema.validate(req.body, {
  abortEarly: false,
  stripUnknown: true,
});

if (error) {
  return res.status(400).json({
    success: false,
    errors: error.details.map((err) => err.message),
  });
}

let route = await Route.create(value)
return res.status(201).json({
    success: true,
    message: "Route created successfully"
})    
} catch (error) {
    res.status(500).json({
        success:false,
        message:error.message
    })
}
}

let getAllRoutes = async (req,res) => {
    try {
        let routes = await routeService.getAllRoutes()
        res.json(routes)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
} 

let getRouteById = async (req, res) => {
  try {
    let route = await routeService.getRouteById(req.params.id)

    if (!route) {
      return res.status(404).json({ message: "Route not found" })
    }

    res.json(route)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

let updateRoute = aync (req, res) => {
  try {
    
  } catch (error) {
    
  }
}