var gameSetup = function(socket) {

    var that = this;
    
    socket.on('onConnected', function( data ) {
        that.ID = data;
    })

    socket.on('newConnection', function( data ) {

        var selectPlayers = d3.select('#selectPlayers');
        selectPlayers.html("");

            for(var id in data) {
                    d3.select('#selectPlayers')
                    .append('div')
                    .attr('id', 'u' + data[id]['id'])
                    .html(data[id]['id']);
            }

    })

    socket.on('disconnectedClient', function( data ) {
    
        var selectPlayers = d3.select('#selectPlayers');
        selectPlayers.html("");

            for(var id in data) {
                    d3.select('#selectPlayers')
                    .append('div')
                    .attr('id', 'u' + data[id]['id'])
                    .html(data[id]['id']);
            }
    })  

    return this;
}

module.exports = gameSetup;