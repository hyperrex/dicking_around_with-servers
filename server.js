const net = require('net')
const PORT = 6969
const HOST = '127.0.0.1'

const server = net.createServer()

const UserPageComponent = () => 'GET / HTTP/1.1\n\n<html><body><h1>Hello User</h1></body></html>'

server.listen(PORT, HOST, () => {
    console.log(`Listening on ${HOST}:${PORT}`)
})

server.on('connection', (socket) => {
    console.log('connection created')
    socket.on('data', (data) => {
        console.log(`${data}`)
        socket.write(UserPageComponent())
    })
}) 

