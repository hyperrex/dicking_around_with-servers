const net = require('net')
const PORT = 6969
const HOST = '127.0.0.1'

const server = net.createServer()

server.listen(PORT, HOST, () => {
    console.log(`Listening on ${HOST}:${PORT}`)
})

server.on('connection', (socket) => {
    console.log('connection created')
    socket.on('data', (data) => {
        console.log(`${socket.remoteAddress}:BLARG ${data}`)
    })
    socket.write('no dicks yet')
}) 