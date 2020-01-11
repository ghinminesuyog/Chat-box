var express = require('express');
var socket = require('socket.io');

//App setup

var app = express();

var server = app.listen(4200, function(){
    console.log('Listening to requests on 4200 port')
})


//static files
app.use(express.static('public'))

//Socket setup
var io = socket(server);

io.on('connection',function(socket){
    console.log('Made socket connection with:',socket.id)
    
    socket.on('chat',function(data){
        io.sockets.emit('chat',data);
    });

    socket.on('typing',function(data){
        socket.broadcast.emit('typing',data)
    });
})
