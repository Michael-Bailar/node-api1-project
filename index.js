const express = require('express')

const server = express()

const users = [
    {
        id: 1,
        name: "Michael",
        bio: "Doing the things at Lambda"
    }
]

//middleware
server.use(express.json()) 

//endpoints
server.get('/', (req, res) => {
    res.json({api: 'running...'})
})

server.get("/api/users/", (req, res) => {
    res.json(users)
})

server.get("/api/users/:id", (req, res) => {
    const id = req.params.id

    const user = users.find((user) => user.id == id)

    if(user) {
        res.status(200).json(user)
    } else {
        res.status(404).json({ message: 'User not found'})
    }
})

server.post("/api/users", (req, res) => {
    const userInfo = req.body

    if (!userInfo.name && !userInfo.bio ) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else {
        users.push(userInfo)
        res.status(201).json(users)
    }

    
})


const port = 5000
server.listen(port, () => console.log(`/n/n== api on port ${port} ==/n`))