
'use strict';

var http = require( 'http' );
var socketio = require( 'socket.io' );
var fs = require( 'fs' );
var port = '3000';
if (typeof(process) !== 'undefined' && process.env.PORT) {
	port = process.env.PORT;
}

var server = http.createServer( function( req, res ) {
    res.writeHead(200, { 'Content-Type' : 'text/html' });
    res.write(port);
    res.end( fs.readFileSync('./chat.html', 'utf-8') );
}).listen(port);

var io = socketio.listen( server );

io.sockets.on( 'connection', function( socket ) {

    socket.on( 'c2s_message', function( data ) {
        io.sockets.emit( 's2c_message', { value : data.value } );
    });
    
    socket.on( 'c2s_broadcast', function( data ) {
        socket.broadcast.emit( 's2c_message', { value : data.value } );
    });
});
