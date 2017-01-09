var gameSetup = ( socket ) => {

    this.ID = "";

    socket.on('onconnected', function( data ) {
        
        this.ID = data['id'];

        for(var id in data.clients) {

            if(id !== data['id']) {

                d3.select('#selectPlayers')
                .append('div')
                .attr('id', 'u' + data.clients[id]['id'])
                .html(data.clients[id]['id']);
           

            }

        }

    })

    socket.on('newConnection', function( data ) {

            d3.select('#selectPlayers')
            .append('div')
            .attr("id", "u" + data['id'])
            .html(data['id']);

    })

    socket.on('disconnectedClient', function( data ) {

        d3.select('#' + "u" + String(data['id'])).remove();

    })  

    return this;
}

module.exports = gameSetup;