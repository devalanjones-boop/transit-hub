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

app.use("/buses", busRouter)

const port = process.env.port

app.listen(port, () => {
console.log("Server connected");

})