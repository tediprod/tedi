# Socket.IO Cheatsheet

Une cheatsheet que j'ai copie-collé depuis https://gist.github.com/alexpchin/3f257d0bb813e2c8c476, avec des ajouts au fur et à mesure.

On suppose ceci :

``` typescript
let room = "The Room";

let io = socket(server);
let socket;
let socketId;
io.on('connect', function(client){
    socket = client;

    socketId = client.id;

    client.join(room);

    socket.on('disconnect', function(){
        client.leave(room);
    })
});
```

``` typescript
// emit to sender only
socket.emit('event', "this is a test");

// sending to all clients, include sender
io.emit('message', "this is a test");

// sending to all clients except sender
socket.broadcast.emit('message', "this is a test");

// sending to all clients in the room "The Room" except sender
socket.broadcast.to(room).emit('message', 'nice game');

// sending to all clients in the room "The Room", include sender
io.in(room).emit('message', 'cool game');

// sending to sender client, only if they are in the room "The Room"
socket.to(room).emit('message', 'enjoy the game');

// sending to all clients in namespace 'myNamespace', include sender
io.of('myNamespace').emit('message', 'gg');

// sending to individual socketid (server-side)
socket.broadcast.to(socketid).emit('message', 'for your eyes only');

// join to subscribe the socket to a given channel (server-side):
socket.join(room);

// then simply use to or in (they are the same) when broadcasting or emitting (server-side)
io.to(room).emit('some event'):

// leave to unsubscribe the socket to a given channel (server-side)
socket.leave(room);




// Get all client IDs in a room, needs callback
io.in(room).clients(function(err, clients){
    // clients == all client IDs
});
```