const express = require("express")

const userRouter = require("./user/user-router")

const server = express()

const port = process.env.PORT || 9090;
server.use(express.json())
server.use("/api/users", userRouter)

server.use((req, res, next) => {
    res.status(404).json({error: "No route found"})
})

server.use((err, req, res, next) => {
    res.status(500).json({error: "Something went wrong"})
})

//if this file include in anyother file then don't use the below code
if(!module.parent) {
   server.listen(port, () => {`Server running at ${port}`})
}

module.exports = server