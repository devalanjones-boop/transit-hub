let dns = require("dns")
dns.setServers(['1.1.1.1','1.0.0.1'])
let express = require("express")
let cors = require("cors")


let app = express()
app.use(express.json())
app.use(cors())

let mongodbConnect =require("./config/dbconfig")
mongodbConnect()

let busRouter = require("./routes/busRoutes")
let routeRouter = require("./routes/routeRoutes")
let stopRouter = require("./routes/stopRoute")
let scheduleRouter = require("./routes/scheduleRoute")

app.use("/buses", busRouter)
app.use("/routes", routeRouter)
app.use("/stops", stopRouter)
app.use("/shedules", scheduleRouter)

const port = process.env.PORT

app.listen(port, () => {
console.log("Server connected");

})