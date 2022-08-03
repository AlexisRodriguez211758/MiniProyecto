const express = require("express");//importar express
const bodyparser = require("body-parser");//extrae toda la parte del cuerpo de un flujo de solicitud entrante
const app = express();//crear al servidor

let cors = require('cors');
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
    cors: {
        origin: '*'
    }
});

app.get('/', (req, res) => {
    res.send('está funcionando');
})

let userList = new Map();

io.on('connection', (socket) => {
    let userName = socket.handshake.query.userName;
    addUser(userName, socket.id);

    socket.broadcast.emit('user-list', [...userList.keys()]);
    socket.emit('user-list', [...userList.keys()]);

    socket.on('message', (msg) => {
        socket.broadcast.emit('message-broadcast', {message: msg, userName: userName});
    })

    socket.on('disconnect', (reason) => {
        removeUser(userName, socket.id);
    })
});

function addUser(userName, id) {
    if (!userList.has(userName)) {
        userList.set(userName, new Set(id));
    } else {
        userList.get(userName).add(id);
    }
}

function removeUser(userName, id) {
    if (userList.has(userName)) {
        let userIds = userList.get(userName);
        if (userIds.size == 0) {
            userList.delete(userName);
        }
    }
}

const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.use(require('./routes/correoRoutes'));

app.listen(port, () => {
    console.log(`hola servidor ejecucion en http://localhost:${port}`);
   });